import ts from 'typescript';
import path from 'path';

// Create a Program instance from a tsconfig.json file
const program = ts.createProgram({
  options: {},
  rootNames: ['/Users/giorgos/Projects/bitloops-language/transpiler/src/semantic-analysis/b.ts'],
});

const filename = '/Users/giorgos/Projects/bitloops-language/transpiler/src/semantic-analysis/b.ts';
const absolutePath = path.resolve(filename);

// Get the source file for a TypeScript module
const sourceFile = program.getSourceFile(absolutePath);
// console.log(sourceFile);

// Get the symbol table for the source file
const symbol = program.getTypeChecker().getSymbolAtLocation(sourceFile);

// Print the symbol table
console.log(symbol.members);

// function printSymbolTable(symbolTable: ts.Symbol, indent = '') {
//   for (const name of symbolTable.keys()) {
//     const symbol = symbolTable.get(name);
//     console.log(`${indent}${name}: ${symbol.flags.toString()}`);
//     if (symbol.declarations) {
//       for (const decl of symbol.declarations) {
//         console.log(`${indent}  Declared in ${decl.getSourceFile().fileName}`);
//       }
//     }
//     if (symbol.members) {
//       printSymbolTable(symbol.members, `${indent}  `);
//     }
//   }
// }

// printSymbolTable(symbolTable);
