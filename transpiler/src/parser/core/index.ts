import antlr4 from 'antlr4';
import {
  IBitloopsParser,
  BitloopsLanguageAST,
  BitloopsParserError,
  BitloopsLanguageASTContext,
  TParserInputData,
  TParserCoreInputData,
  BitloopsLanguageASTCoreContext,
} from './types.js';
import BitloopsLexer from './grammar/BitloopsLexer.js';
import Parser from './grammar/BitloopsParser.js';
import { isBitloopsParserError } from './guards/index.js';

export class BitloopsParser implements IBitloopsParser {
  /**
   * Initial AST.
   * @param blCode string
   * @returns Parser.ProgramContext
   */
  private static getInitialAST(blCode: string): BitloopsLanguageAST | BitloopsParserError {
    const chars = new antlr4.InputStream(blCode);
    const lexer: any = new BitloopsLexer(chars) as any;
    const tokens = new antlr4.CommonTokenStream(lexer);
    try {
      const parser = new Parser(tokens);
      const tree = parser.program() as BitloopsLanguageAST;
      return tree;
    } catch (error: any) {
      return new BitloopsParserError(JSON.stringify(error));
    }
  }

  parse(inputData: TParserInputData): BitloopsLanguageASTContext | BitloopsParserError[] {
    const errors = [];
    let parseResult: BitloopsLanguageASTContext;

    const ASTCore = this.parseCore(inputData.core);
    if (isBitloopsParserError(ASTCore)) {
      errors.push(ASTCore);
    } else {
      parseResult.core = ASTCore;
    }

    if (inputData.setup) {
      const ASTSetup = this.parseSetup(inputData.setup);
      if (isBitloopsParserError(ASTSetup)) {
        errors.push(ASTCore);
      } else {
        parseResult.setup = ASTSetup;
      }
    }

    if (errors.length > 0) {
      return errors;
    }
    return parseResult;
  }

  private parseSetup(blCode: string): BitloopsLanguageAST | BitloopsParserError {
    return BitloopsParser.getInitialAST(blCode);
  }

  private parseCore(
    inputData: TParserCoreInputData,
  ): BitloopsLanguageASTCoreContext | BitloopsParserError {
    /**
     * For each file, we need to create its tree.
     */
    const boundedContexts: BitloopsLanguageASTCoreContext = {};
    for (const data of inputData) {
      const { boundedContext, module, fileId, fileContents } = data;
      const initialAST = BitloopsParser.getInitialAST(fileContents);
      if (isBitloopsParserError(initialAST)) {
        return initialAST;
      }

      if (
        boundedContexts[boundedContext] === null ||
        boundedContexts[boundedContext] === undefined
      ) {
        // first time we come across this boundedContext
        boundedContexts[boundedContext] = {
          [module]: {
            [fileId]: { initialAST },
          },
        };
      } else if (boundedContexts[boundedContext][module] === undefined) {
        // first time we come across this module
        boundedContexts[boundedContext][module] = {
          [fileId]: { initialAST },
        };
      } else {
        boundedContexts[boundedContext][module][fileId] = { initialAST };
      }
    }
    return boundedContexts;
  }
}
