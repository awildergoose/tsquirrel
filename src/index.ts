import { Cli, Command, Option } from "clipanion";
import { watch } from "fs";
import { Project, SourceFile } from "ts-morph";
import { compileFile, sortFilesByDependencies } from "./compiler";
import log from "./logger";

class CompileCommand extends Command {
	static override paths = [];

	projectPath = Option.String("--path", "tsconfig.json");
	watchMode = Option.Boolean("--watch", false);

	static override usage = Command.Usage({
		description: "TypeScript to Squirrel compiler",
	});

	async execute() {
		log.info(`Loading project from ${this.projectPath}`);

		const project = new Project({
			tsConfigFilePath: this.projectPath,
			skipFileDependencyResolution: true,
			skipAddingFilesFromTsConfig: false,
		});

		const files = project
			.getSourceFiles()
			.filter((f) => !f.getFilePath().endsWith(".d.ts"));

		await this.compileProject(project, files);

		if (this.watchMode) {
			log.info("Watching files for changes...");

			files.forEach((file) => {
				watch(file.getFilePath(), async (eventType) => {
					if (eventType === "change") {
						log.debug(`Detected change in ${file.getBaseName()}`);
						file.refreshFromFileSystemSync();
						await this.compileProject(project, files);
					}
				});
			});
		}

		return 0;
	}

	async compileProject(_project: Project, files: SourceFile[]) {
		console.time("compilation");
		log.info(`Compiling ${files.length} files...`);

		const sortedFiles = sortFilesByDependencies(files);
		const outputs = await Promise.all(
			sortedFiles.map((file) => compileFile(file))
		);
		const output = outputs.join("\n");

		await Bun.write("out.nut", output);
		log.info("Compilation complete!");
		console.timeEnd("compilation");
	}
}

const [node, app, ...args] = process.argv;
const cli = new Cli({ enableColors: true });
cli.register(CompileCommand);
cli.runExit(args);
