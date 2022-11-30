[![npm version][npmimg]][npm]
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbitloops%2Fbitloops-language.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbitloops%2Fbitloops-language?ref=badge_shield)

# Bitloops Language Transpiler

## What is a transpiler?
 A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language.

## Structure
Transpiler is composed by the following building blocks: 
- Code in the original language
- [Parser](https://en.wikipedia.org/wiki/Parsing#Parser)
- AST ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree))
- Intermediate model
- AST target language
- Code in target language

The transpilation follows the flow mentioned below:

![Architecture of a transpiler]([transpiling_process.png](https://raw.githubusercontent.com/bitloops/bitloops-language/main/transpiler/transpiling_process.png) "Architecture of a transpiler")

1) The code in the original (bitloops) language is parsed by a language parser which is [ANTLR](https://www.antlr.org/) in our case, in order to create an **AST**. Specifically in ANTLR's implementation in order for ANTLR to be able to parse the original language, two files are needed, to specify the language grammar in order for ANTLR to create the AST (we specifically use ANTLR's visitor functionality):
   - The Lexer file (e.g. BitloopsLexer.g4)
   - The Parser file (e.g. BitloopsParser.g4)

2) After the AST is created there is a step to create an **intermediate model**. The intermediate model is a data tree structure model which will be used to generate the AST target language tree. In this step validation logic for this tree could be added.
   
3) Then the intermediate tree can be used as base to generate the **AST target language tree** which will have the characteristics needed to create the actual code for the target language. <<*This step has not been implemented yet in our case*.>>
   
4) The final step is to create the actual code in the target language.

## Transpiler Folder structure
The transpiler folder structure can be found at *transpiler/src*. More specifically:

- Folder *transpiler/src/parser* contains all the logic concerning the ANTLR parsing from the original bitloops language to AST of original language. Here the ANTLR grammar is defined via the lexer and parser g4 files. Currently we have two different grammars for the setup and for all the other elements which can be found at *transpiler/src/parser/setup* and *transpiler/src/parser/core* respectively.

- Folder *transpiler/src/ast* contains the implementation for the part AST -> Intermediate Model. The setup functionality may be found at the *transpiler/src/ast/setup*. All the others elements of the language, which can be found in the *transpiler/src/ast/core* 
- Folder *transpiler/src/target* contains the implementation from the intermediate model to the target language. Currently only implementation for typescript as a target language exists.

[npmimg]: https://img.shields.io/npm/v/@bitloops/bl-transpiler.svg
[npm]: https://www.npmjs.com/package/@bitloops/bl-transpiler
