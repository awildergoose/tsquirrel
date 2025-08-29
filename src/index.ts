import { watch } from "fs";
import {
	ArrowFunction,
	BinaryExpression,
	CallExpression,
	ClassDeclaration,
	Expression,
	ExpressionStatement,
	ForInStatement,
	ForStatement,
	FunctionDeclaration,
	IfStatement,
	Node,
	ObjectLiteralExpression,
	ParameterDeclaration,
	Project,
	ReturnStatement,
	SourceFile,
	TemplateExpression,
	ts,
	VariableDeclarationList,
	VariableStatement,
	WhileStatement,
} from "ts-morph";

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

	const key = isGlobal ? "::" + name : name;

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

	node.getDeclarations().forEach((declaration) => {
		const value = declaration.getInitializer();
		let finalValue = value !== undefined ? handleExpression(value) : "null";
		out += `${keyword}${declaration.getName()} ${setter} ${finalValue}`;
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
			case ts.SyntaxKind.PropertyAssignment:
				const propertyTyped = property.asKindOrThrow(
					ts.SyntaxKind.PropertyAssignment
				);
				out += `${propertyTyped.getName()} = ${handleExpression(
					propertyTyped.getInitializerOrThrow()
				)}`;
				break;

			case ts.SyntaxKind.MethodDeclaration:
				const methodTyped = property.asKindOrThrow(
					ts.SyntaxKind.MethodDeclaration
				);
				out += `${methodTyped.getName()} = function(${handleParameters(
					methodTyped.getParameters()
				)}) {\n`;
				methodTyped.getBodyOrThrow().forEachChild((node) => {
					out += compileNode(node, true);
				});
				out += "}";
				break;

			default:
				const filePath = property.getSourceFile().getFilePath();
				const line = property.getStartLineNumber();
				console.warn(
					`[WARN] Unknown object literal expression type: ${property.getKindName()} in ${filePath}:${line}`
				);
				out += `${property.getText()} /* Unknown object literal expression type ${property.getKindName()} */`;
				break;
		}

		if (!isLast) out += ",\n";
	});

	out += "\n}\n";

	return out;
}

function handleBlockOrStatement(node: Node) {
	let out = "";

	if (node.getKind() === ts.SyntaxKind.Block)
		node.forEachChild((node2) => {
			out += compileNode(node2, true);
		});
	else out += `return ${handleExpression(node as any)}`;

	return out;
}

function handleArrowFunction(node: ArrowFunction) {
	let out = "";
	out += `function(${handleParameters(node.getParameters())}) {\n`;
	out += handleBlockOrStatement(node.getBody());
	out += "}\n";

	return out;
}

function handleExpression(node: Expression): string {
	switch (node.getKind()) {
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
		case ts.SyntaxKind.PropertyAccessExpression:
			const nodeTyped = node.asKindOrThrow(
				ts.SyntaxKind.PropertyAccessExpression
			);
			let left = nodeTyped.getExpression().getText();
			let right = nodeTyped.getName();
			let dot = ".";
			if (left == "global") {
				dot = "";
				left = "::";
			}
			return `${left}${dot}${right}`;
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
			return `new ${handleExpression(
				nodeTyped.getExpression()
			)}(${nodeTyped
				.getArguments()
				.map((x) => handleExpression(x as Expression))})`;
		}
		case ts.SyntaxKind.ElementAccessExpression:
		case ts.SyntaxKind.PostfixUnaryExpression:
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.ArrayLiteralExpression:
		case ts.SyntaxKind.TrueKeyword:
		case ts.SyntaxKind.FalseKeyword:
		case ts.SyntaxKind.NullKeyword:
			return node.getText();
		case ts.SyntaxKind.UndefinedKeyword:
			return "null";
		case ts.SyntaxKind.AsExpression:
			return handleExpression(
				node.asKindOrThrow(ts.SyntaxKind.AsExpression).getExpression()
			);
		default:
			const filePath = node.getSourceFile().getFilePath();
			const line = node.getStartLineNumber();
			console.warn(
				`[WARN] Unknown expression type: ${node.getKindName()} in ${filePath}:${line}`
			);
			return `${node.getText()} /* Unknown expr type ${node.getKindName()} */`;
	}
}

function handleBinaryExpression(node: BinaryExpression): string {
	const left = handleExpression(node.getLeft());
	const right = handleExpression(node.getRight());
	const op = node.getOperatorToken().getText();

	if (op === "=" && ts.isIdentifier(node.getLeft().compilerNode)) {
		const isGlobal = left.startsWith("::");
		return assignSlot(left, right, isGlobal);
	}

	if (op === "=") {
		return `${left} = ${right}`;
	}

	return `${left} ${op} ${right}`;
}

function handleCallExpression(callExpr: CallExpression) {
	const name = handleExpression(callExpr.getExpression());
	const args = callExpr
		.getArguments()
		.map((node) => handleExpression(node as Expression));

	let expectedParamCount = args.length;
	const exprNode = callExpr.getExpression();

	if (exprNode.getKind() === ts.SyntaxKind.Identifier) {
		const decl = exprNode
			.asKindOrThrow(ts.SyntaxKind.Identifier)
			.getDefinitionNodes()[0];
		if (decl && ts.isFunctionDeclaration(decl.compilerNode)) {
			expectedParamCount = decl
				.asKindOrThrow(ts.SyntaxKind.FunctionDeclaration)
				.getParameters().length;
		}
	}

	while (args.length < expectedParamCount) {
		args.push("null");
	}

	return `${name}(${args.join(", ")})`;
}

function handleExpressionStatement(node: ExpressionStatement) {
	const expr = node.getExpression();

	switch (expr.getKind()) {
		case ts.SyntaxKind.BinaryExpression:
			return (
				handleBinaryExpression(
					expr.asKindOrThrow(ts.SyntaxKind.BinaryExpression)
				) + "\n"
			);
		case ts.SyntaxKind.CallExpression:
			return (
				handleCallExpression(
					expr.asKindOrThrow(ts.SyntaxKind.CallExpression)
				) + "\n"
			);
		default:
			const filePath = expr.getSourceFile().getFilePath();
			const line = expr.getStartLineNumber();
			console.warn(
				`[WARN] Unknown expression statement type: ${expr.getKindName()} in ${filePath}:${line}`
			);

			return `${expr.getText()} /* Unknown expr statement type ${expr.getKindName()} */\n`;
	}
}

function handleTemplateExpression(node: TemplateExpression) {
	let out = "";

	const head = node.getHead().getText();
	out += `"${head.slice(1, -2)}"`;

	node.getTemplateSpans().forEach((span) => {
		const expr = handleExpression(span.getExpression());
		const literal = span.getLiteral().getText().slice(1, -1); // remove quotes

		out += " + " + expr;
		if (literal.length > 0) out += ` + "${literal}"`;
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
		if (init) {
			defaults.push(
				`if (${p.getName()} == null) ${p.getName()} = ${handleExpression(
					init
				)};`
			);
		}
	});

	let out = "";

	withScope(ScopeKind.Function, () => {
		out += `function ${fnName}(${params}) {\n`;
		defaults.forEach((line) => (out += line + "\n"));
		fnBody.forEachChild((node) => {
			out += compileNode(node, true);
		});
		out += "}\n";
	});

	return out;
}

function handleReturnStatement(node: ReturnStatement) {
	return `return ${handleExpression(node.getExpressionOrThrow())}\n`;
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
	node.getStatement().forEachChild((node) => {
		out += compileNode(node);
	});
	out += "}\n";
	return out;
}

function handleClassDeclaration(node: ClassDeclaration) {
	let out = "";

	out += `class ${node.getName()} {\n`;
	withScope(ScopeKind.ClassBody, () => {
		node.getMembers().forEach((member) => {
			switch (member.getKind()) {
				case ts.SyntaxKind.Constructor:
					const ctor = member.asKindOrThrow(
						ts.SyntaxKind.Constructor
					);
					const params = handleParameters(ctor.getParameters());
					withScope(ScopeKind.Constructor, () => {
						out += `constructor(${params}) {\n`;
						ctor.getBodyOrThrow().forEachChild((n) => {
							out += compileNode(n, true);
						});
						out += "}\n";
					});
					break;

				case ts.SyntaxKind.PropertyDeclaration:
					const memberTyped = member.asKindOrThrow(
						ts.SyntaxKind.PropertyDeclaration
					);
					const memberName = memberTyped.getName();
					const memberInit = memberTyped.getInitializer();
					const init = memberInit
						? handleExpression(memberInit)
						: "null";
					const prefix = memberTyped.isStatic() ? "static " : "";
					out += `${prefix}${memberName} = ${init}\n`;
					break;

				case ts.SyntaxKind.MethodDeclaration:
					const method = member.asKindOrThrow(
						ts.SyntaxKind.MethodDeclaration
					);
					const mName = method.getName();
					const mParams = handleParameters(method.getParameters());
					withScope(ScopeKind.Method, () => {
						out += `function ${mName}(${mParams}) {\n`;
						method
							.getBodyOrThrow()
							.forEachChild((n) => (out += compileNode(n, true)));
						out += "}\n";
					});
					break;
			}
		});
	});
	out += "}\n";
	return out;
}

function handleIfStatement(node: IfStatement) {
	let out = "";

	const expression = node.getExpression();
	out += `if (${handleExpression(expression)}) {\n`;
	node.getThenStatement().forEachChild((node) => {
		out += compileNode(node, false);
	});
	const elseStatement = node.getElseStatement();
	if (elseStatement !== undefined) {
		out += `} else {\n`;
		elseStatement.forEachChild((node) => {
			out += compileNode(node, false);
		});
	}

	out += "}\n";
	return out;
}

function handleWhileStatement(node: WhileStatement) {
	let out = "";

	const expression = node.getExpression();
	out += `while (${handleExpression(expression)}) {\n`;
	out += handleBlockOrStatement(node.getStatement());
	out += "}\n";
	return out;
}

function handleForInStatement(node: ForInStatement) {
	const init = node.getInitializer();
	let out = "";

	out += `foreach (${init
		.asKindOrThrow(ts.SyntaxKind.VariableDeclarationList)
		.getDeclarations()
		.map((node) => node.getName())
		.join(", ")} in ${handleExpression(node.getExpression())}) {\n`;
	out += handleBlockOrStatement(node.getStatement());
	out += "}\n";
	return out;
}

function compileNode(node: Node, inFunction = false): string {
	switch (node.getKind()) {
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

		case ts.SyntaxKind.ForInStatement:
			return handleForInStatement(
				node.asKindOrThrow(ts.SyntaxKind.ForInStatement)
			);

		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.Identifier:
			return node.getText() + "\n";

		case ts.SyntaxKind.EndOfFileToken:
			return "// EOF\n";

		default:
			const filePath = node.getSourceFile().getFilePath();
			const line = node.getStartLineNumber();
			console.warn(
				`[WARN] Unknown node type: ${node.getKindName()} in ${filePath}:${line}`
			);
			return `${node.getText()} /* Unknown node: ${node.getKindName()} */\n`;
	}
}

async function compileFile(file: SourceFile): Promise<string> {
	const std = await Bun.file("std.nut").text();
	let out = `${std}\n`;

	file.forEachChild((node) => {
		out += compileNode(node);
	});

	return out;
}

async function compileProject(project: Project) {
	console.time("compilation");

	const files = project
		.getSourceFiles()
		.filter((f) => !f.getFilePath().endsWith(".d.ts"));

	const outputs = await Promise.all(files.map((file) => compileFile(file)));
	const output = outputs.join("\n");

	console.timeEnd("compilation");
	await Bun.write("out.nut", output);
}

async function main() {
	console.time("parsing");
	const project = new Project({
		tsConfigFilePath: "./src/test/tsconfig.json",
		skipFileDependencyResolution: true,
		skipAddingFilesFromTsConfig: false,
	});
	console.timeEnd("parsing");

	await compileProject(project);

	project.getSourceFiles().forEach((file) => {
		const filePath = file.getFilePath();
		watch(filePath, async (eventType) => {
			if (eventType === "change") {
				file.refreshFromFileSystemSync();
				await compileProject(project);
			}
		});
	});
}

main();
