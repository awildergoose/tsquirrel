#!/usr/bin/env bun
import { Cli, Command, Option } from "clipanion";
import { watch } from "fs";
import { Project } from "ts-morph";
import { compileProject } from "./compiler";
import log from "./logger";

class CompileCommand extends Command {
	static override paths = [];

	projectPath = Option.String("--path", "tsconfig.json");
	watchMode = Option.Boolean("--watch", false);

	// This will recreate the TypeScript project each time a file changes.
	// This slows down speeds significantly, but it's the solution to
	// detecting changes in imports
	watchRecreatesProject = Option.Boolean("--watch-recreates-project", true);

	static override usage = Command.Usage({
		description: "TypeScript to Squirrel compiler",
	});

	private project!: Project;

	async execute() {
		if (!this.watchRecreatesProject) this.project = this.createProject();
		await this.compileAndCheck();

		if (this.watchMode) {
			log.info("Watching files for changes...");
			this.watchAllFiles();
		}

		return 0;
	}

	private createProject(): Project {
		return new Project({
			tsConfigFilePath: this.projectPath,
			skipFileDependencyResolution: true,
			skipAddingFilesFromTsConfig: false,
		});
	}

	private async compileAndCheck(): Promise<void> {
		if (this.watchRecreatesProject) this.project = this.createProject();
		await compileProject(this.project);
	}

	private watchAllFiles() {
		const allFiles = this.project
			.getSourceFiles()
			.filter((f) => !f.getFilePath().endsWith(".d.ts"));
		for (const file of allFiles) this.watchFile(file.getFilePath());
	}

	private watchFile(filePath: string) {
		watch(filePath, async (eventType) => {
			if (eventType === "change") {
				log.debug(`Detected change in ${filePath}`);
				await this.compileAndCheck();
			}
		});
	}
}

const [node, app, ...args] = process.argv;
const cli = new Cli({ enableColors: true });
cli.register(CompileCommand);
cli.runExit(args);
