import antlr4 from 'antlr4';
import {
  TParserInputData,
  TParserCoreInputData,
  TParserSetupInputData,
  ASTContext,
  ParserSyntacticError,
  OriginalAST,
  OriginalASTSetup,
  OriginalASTCore,
  IOriginalParser,
} from './types.js';
import BitloopsLexer from './grammar/BitloopsLexer.js';
import Parser from './grammar/BitloopsParser.js';
import { isParserErrors } from './guards/index.js';
import { VerboseErrorListener } from './VerboseErrorListener.js';

export class BitloopsParser implements IOriginalParser {
  parse(inputData: TParserInputData): OriginalAST | ParserSyntacticError[] {
    const errors: ParserSyntacticError[] = [];
    const parseResult: OriginalAST = { core: {} };

    const ASTCore = this.parseCore(inputData.core);
    if (isParserErrors(ASTCore)) {
      errors.push(...ASTCore);
    } else {
      parseResult.core = ASTCore;
    }

    if (inputData.setup) {
      const ASTSetup = this.parseSetup(inputData.setup);
      if (isParserErrors(ASTSetup)) {
        errors.push(...ASTSetup);
      } else {
        parseResult.setup = ASTSetup;
      }
    }

    if (errors.length > 0) {
      return errors;
    }
    return parseResult;
  }

  private parseCore(inputData: TParserCoreInputData): OriginalASTCore | ParserSyntacticError[] {
    /**
     * For each file, we need to create its tree.
     */
    const boundedContexts: OriginalASTCore = {};
    for (const data of inputData) {
      const { boundedContext, module, fileId, fileContents } = data;
      const ASTContextOrError = BitloopsParser.getInitialAST(fileContents);
      if (isParserErrors(ASTContextOrError)) {
        return ASTContextOrError;
      }
      const ASTContext = ASTContextOrError;

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

  public parseSetup(setupData: TParserSetupInputData): OriginalASTSetup | ParserSyntacticError[] {
    const setupContext: OriginalASTSetup = {};
    for (const data of setupData) {
      const { fileContents, fileId } = data;
      const ASTContext = BitloopsParser.getInitialAST(fileContents);

      if (isParserErrors(ASTContext)) {
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
  private static getInitialAST(blCode: string): ASTContext | ParserSyntacticError[] {
    const chars = new (antlr4 as any).InputStream(blCode);
    const lexer = new BitloopsLexer(chars);
    const tokens = new (antlr4 as any).CommonTokenStream(lexer as any);
    const parser = new Parser(tokens) as any;
    parser.removeErrorListeners();
    const errorListener = new VerboseErrorListener();
    parser.addErrorListener(errorListener);

    const tree = parser.program() as ASTContext;
    if (errorListener.hasErrors()) {
      return errorListener.getErrors();
    }
    return tree;
  }
}
