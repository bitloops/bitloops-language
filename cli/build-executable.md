## How to build executable
### Steps
```bash
# Inside the cli project root folder
yarn esbuild-single-cjs

cd pkg-dist

yarn package

# Run executable
./executables/<exec-name> --help
```

## Further explanation
### Active issue regarding ESM issues of pkg
https://github.com/vercel/pkg/issues/1291  
Probably solution using esbuild, to convert the project into a single cjs file.

Initially we try the simplest command
```bash
yarn esbuild ./src/index.ts --bundle --platform=node --outfile=pkg-dist/index.cjs
```
But the font files that figlet requires are not imported and cause issues.

Based on the [esbuild documentation](https://esbuild.github.io/content-types/#external-file), it seems that the file loader would be the appropriate loader to use in this case. Here is an updated esbuild command that should work:

```bash
$ yarn esbuild ./src/index.ts --bundle --platform=node --outfile=pkg-dist/index.cjs --external:figlet --external:path --loader:.flf=file --loader:.tlf=file

# Or
yarn esbuild-single-cjs
```

In this command, we're specifying the file loader for both the .flf and .tlf file extensions that Figlet uses for its fonts. The --loader flag takes a colon-separated pair of extensions and loader names, and we're passing this flag twice to handle both file types.

This creates a `dist/index.cjs` file that can be run with `node dist/index.cjs`.   

Pkg has no option --asset, so we are forced to create a package.json and a pkg config, as it's the only place where assets to be included can be declared.



## Improvements

It's important to note that downloading and running scripts from the internet can be a security risk, as users are executing unknown code with elevated privileges. It's recommended to provide detailed instructions for users to review the contents of the script and verify that it's safe to run before executing it. Additionally, we may want to consider providing a checksum for the script to ensure that it has not been tampered with during transit.