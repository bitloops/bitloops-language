# Bitloops Language CLI

- [Bitloops Language CLI](#bitloops-language-cli)
  - [Installation](#installation)
    - [yarn](#yarn)
    - [npm](#npm)
  - [Usage](#usage)
  - [Development](#development)
    - [Testing the system](#testing-the-system)
    - [Changing the grammar](#changing-the-grammar)

## Installation

### yarn

`yarn global add @bitloops/bitloops-language-cli`

### npm

`npm install -g @bitloops/bitloops-language-cli`

## Usage

To use the CLI run `bitloops-language transpile` or `bl transpile` and follow the instructions

## Development

### Testing the system

`yarn test` Runs all the tests without coverage
`yarn test:coverage` Runs all the tests and generates the coverage report

### Changing the grammar

If the g4 lexer or grammar files are changed `yarn ant` should be run. This
command generates the JavaScript antlr4 files and also triggers the generation
of the d.ts files required to run the antlr4 files in TypeScript and finally
runs rettier on the d.ts files generated to fix breaking formatting issues during
`yarn build`.
