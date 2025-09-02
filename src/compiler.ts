import { writeFile } from "fs/promises";
import {
	ArrayLiteralExpression,
	ArrowFunction,
	BinaryExpression,
	CallExpression,
	ClassDeclaration,
	ConditionalExpression,
	DoStatement,
	EnumDeclaration,
	Expression,
	ExpressionStatement,
	ForInStatement,
	ForOfStatement,
	ForStatement,
	FunctionDeclaration,
	IfStatement,
	JsxElement,
	JsxFragment,
	JsxSelfClosingElement,
	Node,
	ObjectLiteralExpression,
	ParameterDeclaration,
	Project,
	ReturnStatement,
	SourceFile,
	SwitchStatement,
	TemplateExpression,
	TryStatement,
	ts,
	VariableDeclarationList,
	VariableStatement,
	WhileStatement,
} from "ts-morph";
import log from "./logger";

enum ScopeKind {
	Global,
	Function,
	ClassBody,
	Constructor,
	Method,
}

let scope: ScopeKind = ScopeKind.Global;

function withScope<T>(newScope: ScopeKind, fn: () => T): T {
	const prev = scope;
	scope = newScope;
	try {
		return fn();
	} finally {
		scope = prev;
	}
}

const declaredSlots = new Set<string>();

function assignSlot(name: string, rhs: string, isGlobal = false): string {
	if (name.startsWith("::")) {
		name = name.slice(2);
		isGlobal = true;
	}

	const key = isGlobal ? `::${name}` : name;

	const shouldDeclare =
		(scope === ScopeKind.Global || scope === ScopeKind.ClassBody) &&
		!declaredSlots.has(key);

	if (shouldDeclare) {
		declaredSlots.add(key);
		return `${isGlobal ? "::" : ""}${name} <- ${rhs}`;
	} else {
		return `${isGlobal ? "::" : ""}${name} = ${rhs}`;
	}
}

function handleVariableDeclarationList(
	node: VariableDeclarationList,
	keyword: string = "",
	setter: string = "<-"
): string {
	let out = "";

	node.getDeclarations().forEach((declaration, i) => {
		const nameNode = declaration.getNameNode();
		const value = declaration.getInitializer();
		const finalValue = value ? handleExpression(value) : "null";

		if (nameNode.isKind(ts.SyntaxKind.ArrayBindingPattern)) {
			const tmpVar = `__tmp${i}`;
			out += `${keyword}${tmpVar} ${setter} ${finalValue}\n`;
			nameNode.getElements().forEach((el, idx) => {
				const elName = el
					.asKindOrThrow(ts.SyntaxKind.BindingElement)
					.getName();
				out += `${keyword}${elName} ${setter} ${tmpVar}[${idx}]\n`;
			});
		} else {
			out += `${keyword}${declaration.getName()} ${setter} ${finalValue}\n`;
		}
	});

	return out;
}

function handleVariableStatement(
	node: VariableStatement,
	inFunction: boolean
): string {
	let keyword = "";
	let setter = "<-";

	if (inFunction) {
		keyword = "local ";
		setter = "=";
	}

	return (
		handleVariableDeclarationList(
			node.getDeclarationList(),
			keyword,
			setter
		) + "\n"
	);
}

function handleObjectLiteralExpression(node: ObjectLiteralExpression) {
	let out = "{\n";

	const props = node.getProperties();
	props.forEach((property, i) => {
		const isLast = i === props.length - 1;

		switch (property.getKind()) {
			case ts.SyntaxKind.PropertyAssignment: {
				const propertyTyped = property.asKindOrThrow(
					ts.SyntaxKind.PropertyAssignment
				);
				out += `${propertyTyped.getName()} = ${handleExpression(
					propertyTyped.getInitializerOrThrow()
				)}`;
				break;
			}

			case ts.SyntaxKind.MethodDeclaration: {
				const method = property.asKindOrThrow(
					ts.SyntaxKind.MethodDeclaration
				);
				out += `${method.getName()} = function(${handleParameters(
					method.getParameters()
				)}) {\n`;
				out += handleBlockOrStatement(method.getBodyOrThrow());
				out += "}";
				break;
			}

			default: {
				const filePath = property.getSourceFile().getFilePath();
				const line = property.getStartLineNumber();
				log.traceWarn(
					`Unknown object literal expression type: ${property.getKindName()} in ${filePath}:${line}`
				);
				out += `${property.getText()} /* Unknown object literal expression type ${property.getKindName()} */`;
				break;
			}
		}

		if (!isLast) out += ",\n";
	});

	out += "\n}\n";

	return out;
}

function handleBlockOrStatement(node: Node, addBraces = true) {
	let out = "";

	if (node.isKind(ts.SyntaxKind.Block)) {
		if (addBraces) out += "{\n";
		node.forEachChild((node2) => {
			out += compileNode(node2, true);
		});
		if (addBraces) out += "}\n";
	} else out += handleExpression(node as any);

	return out;
}

function handleArrowFunction(node: ArrowFunction) {
	let out = "";
	out += `function(${handleParameters(node.getParameters())})`;

	out += node.getBody().isKind(ts.SyntaxKind.Block)
		? handleBlockOrStatement(node.getBody())
		: `{\nreturn ${handleExpression(node.getBody() as Expression)}\n}`;

	return out;
}

function handleJsxElement(jsx: JsxElement): string {
	const tag = jsx.getOpeningElement().getTagNameNode().getText();

	const props = jsx
		.getOpeningElement()
		.getAttributes()
		.map((attr) => {
			if (attr.isKind(ts.SyntaxKind.JsxAttribute)) {
				const name = attr.getNameNode().getText();
				const init = attr.getInitializer();
				if (!init) return `${name} = true`;

				if (init.isKind(ts.SyntaxKind.StringLiteral)) {
					return `${name} = ${JSON.stringify(init.getLiteralText())}`;
				}

				if (init.isKind(ts.SyntaxKind.JsxExpression)) {
					const expr = init.getExpression();
					return `${name} = ${
						expr ? handleExpression(expr) : "true"
					}`;
				}
			}
			return "";
		});

	const children = jsx
		.getJsxChildren()
		.map((child) => {
			if (child.isKind(ts.SyntaxKind.JsxText)) {
				const txt = child.getText().trim();
				return txt ? JSON.stringify(txt) : null;
			}
			if (child.isKind(ts.SyntaxKind.JsxExpression)) {
				const expr = child.getExpression();
				return expr ? handleExpression(expr) : null;
			}
			if (child.isKind(ts.SyntaxKind.JsxElement)) {
				return handleJsxElement(child);
			}
			if (child.isKind(ts.SyntaxKind.JsxSelfClosingElement)) {
				return handleJsxSelfClosing(child);
			}
			return null;
		})
		.filter(Boolean);

	return `h("${tag}", { ${props
		.filter(Boolean)
		.join(", ")} }, [${children.join(", ")}])`;
}

function handleJsxSelfClosing(node: JsxSelfClosingElement): string {
	const tag = node.getTagNameNode().getText();

	const props = node.getAttributes().map((attr) => {
		if (attr.isKind(ts.SyntaxKind.JsxAttribute)) {
			const name = attr.getNameNode().getText();
			const init = attr.getInitializer();
			if (!init) return `${name} = true`;

			if (init.isKind(ts.SyntaxKind.StringLiteral)) {
				return `${name} = ${JSON.stringify(init.getLiteralText())}`;
			}

			if (init.isKind(ts.SyntaxKind.JsxExpression)) {
				const expr = init.getExpression();
				return `${name} = ${expr ? handleExpression(expr) : "true"}`;
			}
		}
		return "";
	});

	return `h("${tag}", { ${props.filter(Boolean).join(", ")} }, [])`;
}

function handleJsxFragment(frag: JsxFragment): string {
	const children = frag
		.getChildren()
		.map((c) => {
			if (c.isKind(ts.SyntaxKind.JsxText)) {
				const txt = c.getText().trim();
				return txt ? JSON.stringify(txt) : null;
			}
			if (c.isKind(ts.SyntaxKind.JsxExpression)) {
				const expr = c.getExpression();
				return expr ? handleExpression(expr) : null;
			}
			if (c.isKind(ts.SyntaxKind.JsxElement)) {
				return handleJsxElement(c);
			}
			if (c.isKind(ts.SyntaxKind.JsxSelfClosingElement)) {
				return handleJsxSelfClosing(c);
			}
			return null;
		})
		.filter(Boolean);

	return `h(Fragment, null, [${children.join(", ")}])`;
}

function handleExpression(node: Expression): string {
	switch (node.getKind()) {
		case ts.SyntaxKind.JsxElement:
			return handleJsxElement(
				node.asKindOrThrow(ts.SyntaxKind.JsxElement)
			);
		case ts.SyntaxKind.JsxSelfClosingElement:
			return handleJsxSelfClosing(
				node.asKindOrThrow(ts.SyntaxKind.JsxSelfClosingElement)
			);
		case ts.SyntaxKind.JsxFragment:
			return handleJsxFragment(
				node.asKindOrThrow(ts.SyntaxKind.JsxFragment)
			);
		case ts.SyntaxKind.ArrowFunction:
			return handleArrowFunction(
				node.asKindOrThrow(ts.SyntaxKind.ArrowFunction)
			);
		case ts.SyntaxKind.Identifier:
			if (node.getText() === "undefined") return "null";
			return node.getText();
		case ts.SyntaxKind.ObjectLiteralExpression:
			return handleObjectLiteralExpression(
				node.asKindOrThrow(ts.SyntaxKind.ObjectLiteralExpression)
			);
		case ts.SyntaxKind.PropertyAccessExpression: {
			const expr = node.asKindOrThrow(
				ts.SyntaxKind.PropertyAccessExpression
			);
			let left = handleExpression(expr.getExpression());
			const right = expr.getName();
			const dot = left === "global" ? "" : ".";
			if (left == "global") {
				left = "::";
			}
			return `${left}${dot}${right}`;
		}
		case ts.SyntaxKind.BinaryExpression:
			return handleBinaryExpression(
				node.asKindOrThrow(ts.SyntaxKind.BinaryExpression)
			);
		case ts.SyntaxKind.TemplateExpression:
			return handleTemplateExpression(
				node.asKindOrThrow(ts.SyntaxKind.TemplateExpression)
			);
		case ts.SyntaxKind.CallExpression:
			return handleCallExpression(
				node.asKindOrThrow(ts.SyntaxKind.CallExpression)
			);
		case ts.SyntaxKind.NewExpression: {
			const nodeTyped = node.asKindOrThrow(ts.SyntaxKind.NewExpression);
			return `${handleExpression(nodeTyped.getExpression())}(${nodeTyped
				.getArguments()
				.map((x) => handleExpression(x as Expression))})`;
		}
		case ts.SyntaxKind.ElementAccessExpression: {
			const expr = node.asKindOrThrow(
				ts.SyntaxKind.ElementAccessExpression
			);
			return `${handleExpression(
				expr.getExpression()
			)}[${handleExpression(expr.getArgumentExpressionOrThrow())}]`;
		}
		case ts.SyntaxKind.NonNullExpression:
			return handleExpression(
				node
					.asKindOrThrow(ts.SyntaxKind.NonNullExpression)
					.getExpression()
			);
		case ts.SyntaxKind.ArrayLiteralExpression:
			return handleArrayLiteralExpression(
				node.asKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression)
			);
		case ts.SyntaxKind.PrefixUnaryExpression:
		case ts.SyntaxKind.PostfixUnaryExpression:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.TrueKeyword:
		case ts.SyntaxKind.FalseKeyword:
		case ts.SyntaxKind.NullKeyword:
		case ts.SyntaxKind.ThisKeyword:
		case ts.SyntaxKind.BreakStatement:
		case ts.SyntaxKind.ContinueStatement:
			return node.getText();
		case ts.SyntaxKind.NumericLiteral:
			return node
				.asKindOrThrow(ts.SyntaxKind.NumericLiteral)
				.getLiteralValue()
				.toString();
		case ts.SyntaxKind.UndefinedKeyword:
			return "null";
		case ts.SyntaxKind.AsExpression:
			return handleExpression(
				node.asKindOrThrow(ts.SyntaxKind.AsExpression).getExpression()
			);
		case ts.SyntaxKind.TypeOfExpression:
			return `typeof(${handleExpression(
				node
					.asKindOrThrow(ts.SyntaxKind.TypeOfExpression)
					.getExpression()
			)})`;
		case ts.SyntaxKind.IfStatement:
			return handleIfStatement(
				node.asKindOrThrow(ts.SyntaxKind.IfStatement)
			);
		case ts.SyntaxKind.ExpressionStatement:
			return handleExpressionStatement(
				node.asKindOrThrow(ts.SyntaxKind.ExpressionStatement)
			);
		case ts.SyntaxKind.ParenthesizedExpression:
			return `(${handleExpression(
				node
					.asKindOrThrow(ts.SyntaxKind.ParenthesizedExpression)
					.getExpression()
			)})`;
		case ts.SyntaxKind.ReturnStatement:
			return handleReturnStatement(
				node.asKindOrThrow(ts.SyntaxKind.ReturnStatement)
			);
		case ts.SyntaxKind.ConditionalExpression:
			return handleConditionalExpression(
				node.asKindOrThrow(ts.SyntaxKind.ConditionalExpression)
			);
		case ts.SyntaxKind.ForStatement:
			return handleForStatement(
				node.asKindOrThrow(ts.SyntaxKind.ForStatement)
			);
		case ts.SyntaxKind.TryStatement:
			return handleTryStatement(
				node.asKindOrThrow(ts.SyntaxKind.TryStatement)
			);
		case ts.SyntaxKind.ForOfStatement:
			return handleForOfStatement(
				node.asKindOrThrow(ts.SyntaxKind.ForOfStatement)
			);
		default: {
			const filePath = node.getSourceFile().getFilePath();
			const line = node.getStartLineNumber();
			log.traceWarn(
				`Unknown expression type: ${node.getKindName()} in ${filePath}:${line}`
			);
			return `${node.getText()} /* Unknown expression type ${node.getKindName()} */`;
		}
	}
}

function handleBinaryExpression(node: BinaryExpression): string {
	const left = handleExpression(node.getLeft());
	const right = handleExpression(node.getRight());

	let op = node.getOperatorToken().getText();

	if (op === "=" && node.getLeft().isKind(ts.SyntaxKind.Identifier)) {
		const isGlobal = left.startsWith("::");
		return assignSlot(left, right, isGlobal);
	}

	if (op === "===") op = "==";
	if (op === "!==") op = "!=";
	if (op === "??") {
		const filePath = node.getSourceFile().getFilePath();
		const line = node.getStartLineNumber();

		log.traceWarn(
			`The ?? operator is not supported in ${filePath}:${line}!`
		);
		op = "||";
	}
	if (op === "=") {
		if (node.getLeft().isKind(ts.SyntaxKind.ElementAccessExpression)) {
			op = "<-";
		}
	}

	return `${left} ${op} ${right}`;
}

function handleArrayLiteralExpression(node: ArrayLiteralExpression) {
	return `[${node
		.getElements()
		.map((e) => handleExpression(e))
		.join(", ")}]`;
}

function handleCallExpression(callExpr: CallExpression) {
	const exprNode = callExpr.getExpression();

	if (exprNode.isKind(ts.SyntaxKind.PropertyAccessExpression)) {
		const symbol = exprNode.getExpression().getType().getSymbol();

		if (symbol) {
			const typeName = symbol.getName();
			const method = exprNode
				.asKindOrThrow(ts.SyntaxKind.PropertyAccessExpression)
				.getName();
			const target = handleExpression(exprNode.getExpression());
			const args = callExpr
				.getArguments()
				.map((a) => handleExpression(a as Expression));

			// Due to the way TypeScript works, we can't define custom operator overloads
			// So, the solution is to make types for add, sub, mul
			// but replace them in compile-time
			if (
				[
					"Vector",
					"QAngle",
					"Vector2D",
					"Vector4D",
					"Quaternion",
				].includes(typeName)
			) {
				if (method === "add" && args.length === 1) {
					return `${target} + ${args[0]}`;
				}
				if (method === "sub" && args.length === 1) {
					return `${target} - ${args[0]}`;
				}
				if (method === "mul" && args.length === 1) {
					return `${target} * ${args[0]}`;
				}
			}
		}
	}

	if (
		exprNode.isKind(ts.SyntaxKind.Identifier) &&
		(exprNode.getText() === "hook" ||
			exprNode.getText() === "hookGameEvent")
	) {
		const hookPrefix =
			exprNode.getText() === "hookGameEvent" ? "OnGameEvent_" : "";

		const args = callExpr.getArguments();
		if (args.length === 2) {
			const hookNameNode = args[0]!;
			const callbackNode = args[1]!;

			const hookName = hookNameNode.isKind(ts.SyntaxKind.StringLiteral)
				? (hookNameNode as any).getLiteralText()
				: handleExpression(hookNameNode as Expression);

			if (
				callbackNode.isKind(ts.SyntaxKind.ArrowFunction) ||
				callbackNode.isKind(ts.SyntaxKind.FunctionExpression)
			) {
				const fn = callbackNode.asKindOrThrow(
					callbackNode.isKind(ts.SyntaxKind.ArrowFunction)
						? ts.SyntaxKind.ArrowFunction
						: ts.SyntaxKind.FunctionExpression
				);
				const params = fn
					.getParameters()
					.map((p) => p.getName())
					.join(", ");
				let body = "";
				if (fn.getBody().isKind(ts.SyntaxKind.Block)) {
					body += handleBlockOrStatement(fn.getBody(), false);
					body = `{\n${body}}`;
				} else {
					// single expression arrow
					body = `{ return ${handleExpression(
						fn.getBody() as Expression
					)}; }`;
				}

				return `function ${hookPrefix}${hookName}(${params}) ${body}\n`;
			}

			throw new Error(`hook callback is not a valid expression`);
		} else {
			const pos = callExpr.getStartLineNumber();
			throw new Error(
				`hook expects exactly 2 arguments at line ${pos}, got ${args.length}`
			);
		}
	}

	const name = handleExpression(callExpr.getExpression());
	const args = callExpr
		.getArguments()
		.map((node) => handleExpression(node as Expression));

	let expectedParamCount = args.length;

	if (exprNode.isKind(ts.SyntaxKind.Identifier)) {
		const decl = exprNode
			.asKindOrThrow(ts.SyntaxKind.Identifier)
			.getDefinitionNodes()[0];
		if (decl && decl.isKind(ts.SyntaxKind.FunctionDeclaration)) {
			expectedParamCount = decl
				.asKindOrThrow(ts.SyntaxKind.FunctionDeclaration)
				.getParameters().length;
		}
	}

	// TODO: fix null defaults not applying to class methods

	while (args.length < expectedParamCount) {
		args.push("null");
	}

	return `${name}(${args.join(", ")})`;
}

function handleExpressionStatement(node: ExpressionStatement) {
	const expr = node.getExpression();

	switch (expr.getKind()) {
		case ts.SyntaxKind.BinaryExpression:
			return `${handleBinaryExpression(
				expr.asKindOrThrow(ts.SyntaxKind.BinaryExpression)
			)}\n`;
		case ts.SyntaxKind.CallExpression:
			return `${handleCallExpression(
				expr.asKindOrThrow(ts.SyntaxKind.CallExpression)
			)}\n`;

		case ts.SyntaxKind.DeleteExpression:
			return `delete ${handleExpression(
				expr
					.asKindOrThrow(ts.SyntaxKind.DeleteExpression)
					.getExpression()
			)}\n`;

		case ts.SyntaxKind.YieldExpression: {
			const yieldExpr = expr.asKindOrThrow(ts.SyntaxKind.YieldExpression);
			let rest = yieldExpr.getExpression()
				? ` ${handleExpression(yieldExpr.getExpressionOrThrow())}`
				: "";
			return `yield${rest}\n`;
		}

		case ts.SyntaxKind.PostfixUnaryExpression:
			return node.getText();
		default:
			const filePath = expr.getSourceFile().getFilePath();
			const line = expr.getStartLineNumber();
			log.traceWarn(
				`Unknown expression statement type: ${expr.getKindName()} in ${filePath}:${line}`
			);

			return `${expr.getText()} /* Unknown expression statement type ${expr.getKindName()} */\n`;
	}
}

function handleTemplateExpression(node: TemplateExpression): string {
	let out = "";

	const head = node.getHead().getLiteralText();
	out += head.length > 0 ? JSON.stringify(head) : '""';

	node.getTemplateSpans().forEach((span) => {
		const expr = handleExpression(span.getExpression());
		const literal = span.getLiteral().getLiteralText();

		out += ` + (${expr})`;
		if (literal.length > 0) out += ` + ${JSON.stringify(literal)}`;
	});

	return out;
}

function handleParameters(node: ParameterDeclaration[]) {
	return node.map((p) => `${p.getName()}`);
}

function handleFunctionDeclaration(node: FunctionDeclaration) {
	const fnName = node.getName();
	const fnBody = node.getBodyOrThrow();
	const fnParams = node.getParameters();
	const params = fnParams.map((p) => p.getName());
	const defaults: string[] = [];

	fnParams.forEach((p) => {
		const init = p.getInitializer();
		if (init)
			defaults.push(
				`if (${p.getName()} == null) ${p.getName()} = ${handleExpression(
					init
				)};`
			);
	});

	let out = "";
	const isExported = node.hasModifier(ts.SyntaxKind.ExportKeyword);

	withScope(ScopeKind.Function, () => {
		if (isExported) {
			out += `::${fnName} <- function(${params}) {\n`;
		} else {
			out += `function ${fnName}(${params}) {\n`;
		}

		defaults.forEach((line) => (out += `${line}\n`));
		out += handleBlockOrStatement(fnBody, false);
		out += "}\n";
	});

	return out;
}

function handleReturnStatement(node: ReturnStatement) {
	const expr = node.getExpression();
	return `return ${expr === undefined ? "" : handleExpression(expr)}\n`;
}

function handleConditionalExpression(node: ConditionalExpression) {
	return `${handleExpression(node.getCondition())} ? ${handleExpression(
		node.getWhenTrue()
	)} : ${handleExpression(node.getWhenFalse())}`;
}

function handleForStatement(node: ForStatement) {
	const init = node.getInitializerOrThrow();
	const condition = node.getConditionOrThrow();
	const incrementor = node.getIncrementorOrThrow();
	let out = "";
	out += `for (${handleVariableDeclarationList(
		init.asKindOrThrow(ts.SyntaxKind.VariableDeclarationList),
		"local ",
		"="
	)}; ${handleExpression(condition)}; ${handleExpression(incrementor)}) {\n`;
	out += handleBlockOrStatement(node.getStatement());
	out += "}\n";
	return out;
}

function handleClassDeclaration(node: ClassDeclaration) {
	let out = "";

	out += `class ${node.getName()} {\n`;
	withScope(ScopeKind.ClassBody, () => {
		node.getMembers().forEach((member) => {
			switch (member.getKind()) {
				case ts.SyntaxKind.Constructor: {
					const ctor = member.asKindOrThrow(
						ts.SyntaxKind.Constructor
					);
					const params = handleParameters(ctor.getParameters());
					withScope(ScopeKind.Constructor, () => {
						out += `constructor(${params})`;
						out += handleBlockOrStatement(ctor.getBodyOrThrow());
					});
					break;
				}

				case ts.SyntaxKind.PropertyDeclaration: {
					const declaration = member.asKindOrThrow(
						ts.SyntaxKind.PropertyDeclaration
					);
					const memberName = declaration.getName();
					const memberInit = declaration.getInitializer();
					const init = memberInit
						? handleExpression(memberInit)
						: "null";
					const prefix = declaration.isStatic() ? "static " : "";
					out += `${prefix}${memberName} = ${init}\n`;
					break;
				}

				case ts.SyntaxKind.MethodDeclaration: {
					const method = member.asKindOrThrow(
						ts.SyntaxKind.MethodDeclaration
					);
					const mName = method.getName();
					const mParams = handleParameters(method.getParameters());
					withScope(ScopeKind.Method, () => {
						const body = handleBlockOrStatement(
							method.getBodyOrThrow()
						);
						out += `function ${mName}(${mParams}) ${body}\n`;
					});
					break;
				}
			}
		});
	});
	out += "}\n";
	return out;
}

function handleIfStatement(node: IfStatement) {
	let out = "";

	const expression = node.getExpression();
	const thenStatement = node.getThenStatement();
	out += `if (${handleExpression(expression)})`;
	out += handleBlockOrStatement(thenStatement);
	if (!thenStatement.isKind(ts.SyntaxKind.Block)) {
		out += "\n";
	}

	const elseStatement = node.getElseStatement();
	if (elseStatement !== undefined) {
		out += ` else `;
		out += handleBlockOrStatement(elseStatement);
	}

	return out;
}

function handleWhileStatement(node: WhileStatement) {
	let out = "";

	const expression = node.getExpression();
	out += `while (${handleExpression(expression)})`;
	out += handleBlockOrStatement(node.getStatement());

	return out;
}

function handleDoStatement(node: DoStatement) {
	let out = "";
	let whileStatement = "";
	if (!node.getExpressionIfKind(ts.SyntaxKind.Identifier))
		whileStatement += ` while(${handleBlockOrStatement(
			node.getExpression()
		)})`;
	out += `do ${handleBlockOrStatement(node.getStatement())}${whileStatement}`;

	out += "\n";
	return out;
}

function handleForInStatement(node: ForInStatement) {
	const init = node.getInitializer();
	let out = "";
	let inits = init
		.asKindOrThrow(ts.SyntaxKind.VariableDeclarationList)
		.getDeclarations()
		.map((node) => node.getName())
		.join(", ");
	if (inits.startsWith("[")) inits = inits.slice(1);
	if (inits.endsWith("]")) inits = inits.slice(0, -1);

	out += `foreach (${inits} in ${handleExpression(node.getExpression())})`;
	out += handleBlockOrStatement(node.getStatement());

	return out;
}

function handleForOfStatement(node: ForOfStatement) {
	return handleForInStatement(node as unknown as ForInStatement);
}

function handleEnumDeclaration(node: EnumDeclaration) {
	const members = node.getMembers().map((member) => {
		const initializer = member.getInitializer();
		const value = initializer ? handleExpression(initializer) : "";
		return `${member.getName()}${value ? ` = ${value}` : ""}`;
	});

	return `enum ${node.getName()} {\n${members.join(",\n")}\n}\n`;
}

function handleTryStatement(node: TryStatement) {
	const tryBlock = handleBlockOrStatement(node.getTryBlock());
	const catchClause = node.getCatchClause();
	const catchBlock = catchClause
		? handleBlockOrStatement(catchClause.getBlock())
		: "";
	// TODO fix catch not having a var name and defaulting to undefined

	if (catchBlock) {
		const varName = catchClause!.getVariableDeclaration()?.getText();
		return `try ${tryBlock} catch ${
			varName && `(${varName})`
		} ${catchBlock}\n`;
	} else {
		return `try ${tryBlock}\n`;
	}
}

function handleSwitchStatement(node: SwitchStatement) {
	let out = "";
	out += `switch (${handleExpression(node.getExpression())}) {\n`;
	for (const clause of node.getClauses()) {
		const statements = clause
			.getStatements()
			.map((s) => handleBlockOrStatement(s, false))
			.join("");
		if (clause.isKind(ts.SyntaxKind.CaseClause)) {
			out += `case ${handleExpression(
				clause.getExpression()
			)}: {\n${statements}\n}\n`;
		} else {
			out += `default: {\n${statements}\n}\n`;
		}
	}
	out += "}\n";
	return out;
}

function compileNode(node: Node, inFunction = false): string {
	switch (node.getKind()) {
		case ts.SyntaxKind.CallExpression:
			return handleCallExpression(
				node.asKindOrThrow(ts.SyntaxKind.CallExpression)
			);

		case ts.SyntaxKind.VariableStatement:
			return handleVariableStatement(
				node.asKindOrThrow(ts.SyntaxKind.VariableStatement),
				inFunction
			);

		case ts.SyntaxKind.ExpressionStatement:
			return handleExpressionStatement(
				node.asKindOrThrow(ts.SyntaxKind.ExpressionStatement)
			);

		case ts.SyntaxKind.FunctionDeclaration:
			return handleFunctionDeclaration(
				node.asKindOrThrow(ts.SyntaxKind.FunctionDeclaration)
			);

		case ts.SyntaxKind.ReturnStatement:
			return handleReturnStatement(
				node.asKindOrThrow(ts.SyntaxKind.ReturnStatement)
			);

		case ts.SyntaxKind.ForStatement:
			return handleForStatement(
				node.asKindOrThrow(ts.SyntaxKind.ForStatement)
			);

		case ts.SyntaxKind.BinaryExpression:
			return (
				handleBinaryExpression(
					node.asKindOrThrow(ts.SyntaxKind.BinaryExpression)
				) + "\n"
			);

		case ts.SyntaxKind.ClassDeclaration:
			return handleClassDeclaration(
				node.asKindOrThrow(ts.SyntaxKind.ClassDeclaration)
			);

		case ts.SyntaxKind.IfStatement:
			return handleIfStatement(
				node.asKindOrThrow(ts.SyntaxKind.IfStatement)
			);

		case ts.SyntaxKind.WhileStatement:
			return handleWhileStatement(
				node.asKindOrThrow(ts.SyntaxKind.WhileStatement)
			);
		case ts.SyntaxKind.DoStatement:
			return handleDoStatement(
				node.asKindOrThrow(ts.SyntaxKind.DoStatement)
			);

		case ts.SyntaxKind.ForInStatement:
			return handleForInStatement(
				node.asKindOrThrow(ts.SyntaxKind.ForInStatement)
			);
		case ts.SyntaxKind.ForOfStatement:
			return handleForOfStatement(
				node.asKindOrThrow(ts.SyntaxKind.ForOfStatement)
			);
		case ts.SyntaxKind.Block:
			return handleBlockOrStatement(
				node.asKindOrThrow(ts.SyntaxKind.Block)
			);
		case ts.SyntaxKind.EnumDeclaration:
			return handleEnumDeclaration(
				node.asKindOrThrow(ts.SyntaxKind.EnumDeclaration)
			);
		case ts.SyntaxKind.TryStatement:
			return handleTryStatement(
				node.asKindOrThrow(ts.SyntaxKind.TryStatement)
			);
		case ts.SyntaxKind.SwitchStatement:
			return handleSwitchStatement(
				node.asKindOrThrow(ts.SyntaxKind.SwitchStatement)
			);
		// Automagically gets handled!
		case ts.SyntaxKind.ImportDeclaration:
			return "\n";
		// TypeScript types
		case ts.SyntaxKind.TypeAliasDeclaration:
		case ts.SyntaxKind.ExportDeclaration:
			return "\n";
		case ts.SyntaxKind.ThrowStatement:
			return `throw ${handleExpression(
				node.asKindOrThrow(ts.SyntaxKind.ThrowStatement).getExpression()
			)}\n`;
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.ContinueStatement:
		case ts.SyntaxKind.BreakStatement:
		case ts.SyntaxKind.Identifier:
			return `${node.getText()}\n`;

		case ts.SyntaxKind.EndOfFileToken:
			return "// EOF\n";
		default:
			const filePath = node.getSourceFile().getFilePath();
			const line = node.getStartLineNumber();
			log.traceWarn(
				`Unknown node type: ${node.getKindName()} in ${filePath}:${line}`
			);
			return `${node.getText()} /* Unknown node: ${node.getKindName()} */\n`;
	}
}

export async function compileFile(file: SourceFile): Promise<string> {
	let out = "";

	file.forEachChild((node) => {
		out += compileNode(node);
	});

	return out;
}

export function sortFilesByDependencies(files: SourceFile[]): SourceFile[] {
	const dependencies = new Map<SourceFile, SourceFile[]>();

	for (const file of files)
		dependencies.set(
			file,
			file
				.getImportDeclarations()
				.map((module) => module.getModuleSpecifierSourceFile())
				.filter(
					(sourceFile): sourceFile is SourceFile =>
						!!sourceFile && files.includes(sourceFile)
				)
		);

	const result: SourceFile[] = [];
	const visited = new Set<SourceFile>();

	function visit(file: SourceFile) {
		if (visited.has(file)) return;
		visited.add(file);

		for (const dep of dependencies.get(file) ?? []) visit(dep);

		result.push(file);
	}

	for (const f of files) visit(f);

	return result;
}

export async function compileProject(project: Project) {
	console.time("compilation");

	const unsortedFiles = project
		.getSourceFiles()
		.filter((f) => !f.getFilePath().endsWith(".d.ts"));

	const files = sortFilesByDependencies(unsortedFiles);
	const outputs = await Promise.all(files.map((file) => compileFile(file)));

	// Valve uses IncludeScript instead of Squirrel's dofile
	const output = `try {
    IncludeScript("std.nut")
} catch (e) {
    dofile("std.nut")
}\n\n${outputs.join("\n")}`;

	console.timeEnd("compilation");
	await writeFile("out.nut", output);
}
