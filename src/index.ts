import { Cli, Command, Option } from "clipanion";
import { watch } from "fs";
import { Project } from "ts-morph";
import { compileProject } from "./compiler";
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

		await compileProject(project);

		if (this.watchMode) {
			log.info("Watching files for changes...");

			files.forEach((file) => {
				watch(file.getFilePath(), async (eventType) => {
					if (eventType === "change") {
						log.debug(`Detected change in ${file.getBaseName()}`);
						file.refreshFromFileSystemSync();
						await compileProject(project);
					}
				});
			});
		}

		return 0;
	}
}

const [node, app, ...args] = process.argv;
const cli = new Cli({ enableColors: true });
cli.register(CompileCommand);
cli.runExit(args);
