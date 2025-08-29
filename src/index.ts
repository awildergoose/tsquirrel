import { watch } from "fs";
import {
	BinaryExpression,
	ClassDeclaration,
	Expression,
	ExpressionStatement,
	ForStatement,
	FunctionDeclaration,
	Node,
	ParameterDeclaration,
	Project,
	ReturnStatement,
	SourceFile,
	ts,
	VariableDeclarationList,
	VariableStatement,
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

let output = "";

function emit(...rest: any) {
	output += rest.join("\n") + "\n";
}

function emitInline(...rest: any) {
	output += rest.join("");
}

function emitPrev(...rest: any) {
	if (output.endsWith("\n")) {
		output = output.slice(0, -1);
	}
	output += rest.join("") + "\n";
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
) {
	let out = "";

	node.getDeclarations().forEach((declaration) => {
		out += `${keyword}${declaration.getName()} ${setter} ${declaration
			.getInitializer()
			?.getText()}`;
	});

	return out;
}

function handleVariableStatement(node: VariableStatement, inFunction: boolean) {
	let keyword = "";
	let setter = "<-";

	if (node.getDeclarationList().getFlags() & ts.NodeFlags.Const) {
		keyword = "const ";
		setter = "=";
	} else if (inFunction) {
		keyword = "local ";
		setter = "=";
	}

	emit(
		handleVariableDeclarationList(
			node.getDeclarationList(),
			keyword,
			setter
		)
	);
}

function handleExpression(node: Expression) {
	switch (node.getKind()) {
		case ts.SyntaxKind.Identifier:
			return node.getText();
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
		case ts.SyntaxKind.PostfixUnaryExpression:
		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.ArrayLiteralExpression:
		case ts.SyntaxKind.TrueKeyword:
		case ts.SyntaxKind.FalseKeyword:
			return node.getText();
		default:
			return `${node.getText()} /* Unknown expr type ${node.getKindName()} */`;
	}
}

function handleBinaryExpression(node: BinaryExpression): string {
	const left = handleExpression(node.getLeft());
	const right = handleExpression(node.getRight());
	const op = node.getOperatorToken().getText();

	if (op === "=") {
		const isGlobal = left.startsWith("::");
		return assignSlot(left, right, isGlobal);
	}

	return `${left} ${op} ${right}`;
}

function handleExpressionStatement(node: ExpressionStatement) {
	const expr = node.getExpression();

	switch (expr.getKind()) {
		case ts.SyntaxKind.BinaryExpression:
			emit(
				handleBinaryExpression(
					expr.asKindOrThrow(ts.SyntaxKind.BinaryExpression)
				)
			);
			break;
		case ts.SyntaxKind.CallExpression:
			const callExpr = expr.asKindOrThrow(ts.SyntaxKind.CallExpression);
			const name = handleExpression(callExpr.getExpression());
			const args = callExpr.getArguments();

			emitInline(`${name}(`);
			args.forEach((node, index) => {
				emitInline(handleExpression(node as Expression));
				if (index !== args.length - 1) emitInline(", ");
			});
			emit(")");
			break;

		default:
			emit(
				`${expr.getText()} /* Unknown expr statement type ${expr.getKindName()} */`
			);
			break;
	}
}

function handleParameters(node: ParameterDeclaration[]) {
	return node.map((p) => `${p.getName()}`);
}

function handleFunctionDeclaration(node: FunctionDeclaration) {
	const fnName = node.getName();
	const fnBody = node.getBodyOrThrow();
	const fnParams = node.getParameters();
	const params = handleParameters(fnParams);

	withScope(ScopeKind.Function, () => {
		emit(`function ${fnName}(${params}) {`);
		fnBody.forEachChild((node) => compileNode(node, true));
		emit("}");
	});
}

function handleReturnStatement(node: ReturnStatement) {
	emit(`return ${handleExpression(node.getExpressionOrThrow())}`);
}

function handleForStatement(node: ForStatement) {
	const init = node.getInitializerOrThrow();
	const condition = node.getConditionOrThrow();
	const incrementor = node.getIncrementorOrThrow();
	emit(
		`for (${handleVariableDeclarationList(
			init.asKindOrThrow(ts.SyntaxKind.VariableDeclarationList),
			"local ",
			"="
		)}; ${handleExpression(condition)}; ${handleExpression(incrementor)}) {`
	);
	node.getStatement().forEachChild(compileNode);
	emit("}");
}

function handleClassDeclaration(node: ClassDeclaration) {
	emit(`class ${node.getName()} {`);
	withScope(ScopeKind.ClassBody, () => {
		node.getMembers().forEach((member) => {
			switch (member.getKind()) {
				case ts.SyntaxKind.Constructor:
					const ctor = member.asKindOrThrow(
						ts.SyntaxKind.Constructor
					);
					const params = handleParameters(ctor.getParameters());
					withScope(ScopeKind.Constructor, () => {
						emit(`constructor(${params}) {`);
						ctor.getBodyOrThrow().forEachChild((n) =>
							compileNode(n, true)
						);
						emit("}");
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
					emit(`${memberName} = ${init}`);
					break;

				case ts.SyntaxKind.MethodDeclaration:
					const method = member.asKindOrThrow(
						ts.SyntaxKind.MethodDeclaration
					);
					const mName = method.getName();
					const mParams = handleParameters(method.getParameters());
					withScope(ScopeKind.Method, () => {
						emit(`function ${mName}(${mParams}) {`);
						method
							.getBodyOrThrow()
							.forEachChild((n) => compileNode(n, true));
						emit("}");
					});
					break;
			}
		});
	});
	emit("}");
}

function compileNode(node: Node, inFunction = false) {
	switch (node.getKind()) {
		case ts.SyntaxKind.VariableStatement:
			handleVariableStatement(
				node.asKindOrThrow(ts.SyntaxKind.VariableStatement),
				inFunction
			);
			break;

		case ts.SyntaxKind.ExpressionStatement:
			handleExpressionStatement(
				node.asKindOrThrow(ts.SyntaxKind.ExpressionStatement)
			);
			break;

		case ts.SyntaxKind.FunctionDeclaration:
			handleFunctionDeclaration(
				node.asKindOrThrow(ts.SyntaxKind.FunctionDeclaration)
			);
			break;

		case ts.SyntaxKind.ReturnStatement:
			handleReturnStatement(
				node.asKindOrThrow(ts.SyntaxKind.ReturnStatement)
			);
			break;

		case ts.SyntaxKind.ForStatement:
			handleForStatement(node.asKindOrThrow(ts.SyntaxKind.ForStatement));
			break;

		case ts.SyntaxKind.BinaryExpression:
			emit(
				handleBinaryExpression(
					node.asKindOrThrow(ts.SyntaxKind.BinaryExpression)
				)
			);
			break;

		case ts.SyntaxKind.ClassDeclaration:
			handleClassDeclaration(
				node.asKindOrThrow(ts.SyntaxKind.ClassDeclaration)
			);
			break;

		case ts.SyntaxKind.NumericLiteral:
		case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.Identifier:
			emit(node.getText());
			break;

		case ts.SyntaxKind.EndOfFileToken:
			emit("// EOF");
			break;

		default:
			emit(`// Unknown node: ${node.getKindName()}`);
			break;
	}
}

function compileFile(file: SourceFile) {
	file.forEachChild(compileNode);
}

async function compileProject(project: Project) {
	output = "";
	console.time("compilation");
	project.getSourceFiles().forEach(compileFile);
	console.timeEnd("compilation");
	await Bun.write("out.nut", output);
}

async function main() {
	console.time("parsing");
	const project = new Project({
		tsConfigFilePath: "./src/test/tsconfig.json",
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
