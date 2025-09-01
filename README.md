# tsquirrel

This project transpiles TypeScript projects into [VScript](https://developer.valvesoftware.com/wiki/VScript) / [Squirrel](http://squirrel-lang.org/), mainly made for Valve's [Left 4 Dead 2](https://store.steampowered.com/app/550/Left_4_Dead_2/).

## Installation

You can run the compiler by running the `watch` script from the package.json
To run in a standard (non-valve) Squirrel environment, you may use:

-   Please note: This requires you to compile Squirrel yourself,
-   You can do this by downloading and compiling the source code from [here](https://github.com/albertodemichelis/squirrel/releases/tag/v3.2).
-   I managed to compile Squirrel using CMake, Find what works best for you.

```bash
bun watchtest
```

> This project is not affiliated with Valve.<br>
> All trademarks belong to their owners.
