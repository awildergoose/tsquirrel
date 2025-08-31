# tsquirrel

> [!IMPORTANT]
> This project only supports the **Bun** runtime currently. :shipit:

This project transpiles TypeScript projects into [VScript](https://developer.valvesoftware.com/wiki/VScript) / [Squirrel](http://squirrel-lang.org/), mainly made for Valve's [Left 4 Dead 2](https://store.steampowered.com/app/550/Left_4_Dead_2/).

## Installation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun watch
```

To run in a standard (non-valve) Squirrel environment, you may use:

-   Please note: This requires you to compile Squirrel yourself,
-   You can do this by downloading the source code from [here](https://github.com/albertodemichelis/squirrel/releases/tag/v3.2).
-   The working method for me was to use CMake, Find what works best for you.

```bash
bun watchtest
```

---

> This project is not affiliated with Valve.<br>
> All trademarks belong to their owners.
