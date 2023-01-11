import antlr4 from 'antlr4';
import {
  TParserInputData,
  TParserCoreInputData,
  TParserSetupInputData,
  ASTContext,
  OriginalParserError,
  OriginalAST,
  OriginalASTSetup,
  OriginalASTCore,
  IOriginalParser,
} from './types.js';
import BitloopsLexer from './grammar/BitloopsLexer.js';
import Parser from './grammar/BitloopsParser.js';
import { isParserError } from './guards/index.js';

export class BitloopsParser implements IOriginalParser {
  parse(inputData: TParserInputData): OriginalAST | OriginalParserError[] {
    const errors = [];
    const parseResult: OriginalAST = { core: {} };

    const ASTCore = this.parseCore(inputData.core);
    if (isParserError(ASTCore)) {
      errors.push(ASTCore);
    } else {
      parseResult.core = ASTCore;
    }

    if (inputData.setup) {
      const ASTSetup = this.parseSetup(inputData.setup);
      if (isParserError(ASTSetup)) {
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

  private parseCore(inputData: TParserCoreInputData): OriginalASTCore | OriginalParserError {
    /**
     * For each file, we need to create its tree.
     */
    const boundedContexts: OriginalASTCore = {};
    for (const data of inputData) {
      const { boundedContext, module, fileId, fileContents } = data;
      const ASTContext = BitloopsParser.getInitialAST(fileContents);
      if (isParserError(ASTContext)) {
        return ASTContext;
      }

      if (
        boundedContexts[boundedContext] === null ||
        boundedContexts[boundedContext] === undefined
      ) {
        // first time we come across this boundedContext
        boundedContexts[boundedContext] = {
          [module]: {
            [fileId]: { ASTContext },
          },
        };
      } else if (boundedContexts[boundedContext][module] === undefined) {
        // first time we come across this module
        boundedContexts[boundedContext][module] = {
          [fileId]: { ASTContext },
        };
      } else {
        boundedContexts[boundedContext][module][fileId] = { ASTContext };
      }
    }
    return boundedContexts;
  }

  public parseSetup(setupData: TParserSetupInputData): OriginalASTSetup | OriginalParserError {
    const setupContext: OriginalASTSetup = {};
    for (const data of setupData) {
      const { fileContents, fileId } = data;
      const ASTContext = BitloopsParser.getInitialAST(fileContents);

      if (isParserError(ASTContext)) {
        return ASTContext;
      }
      setupContext[fileId] = { ASTContext };
    }
    return setupContext;
  }

  /**
   * Initial AST.
   * @param blCode string
   * @returns Parser.ProgramContext
   */
  private static getInitialAST(blCode: string): ASTContext | OriginalParserError {
    const chars = new antlr4.InputStream(blCode);
    const lexer = new BitloopsLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer as any);
    try {
      const parser = new Parser(tokens);
      const tree = parser.program() as ASTContext;
      return tree;
    } catch (error: any) {
      return new OriginalParserError(JSON.stringify(error));
    }
  }
}
