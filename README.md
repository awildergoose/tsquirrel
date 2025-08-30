# tsquirrel

This project compiles TypeScript projects to Squirrel, mainly made for Left 4 Dead 2.

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
