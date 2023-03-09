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
  TParserApiInputData,
  OriginalASTApi,
} from './types.js';
import BitloopsLexer from './grammar/BitloopsLexer.js';
import Parser from './grammar/BitloopsParser.js';
import { isParserErrors } from './guards/index.js';
import { VerboseErrorListener } from './VerboseErrorListener.js';

export class BitloopsParser implements IOriginalParser {
  parse(inputData: TParserInputData): OriginalAST | ParserSyntacticError[] {
    const errors: ParserSyntacticError[] = [];
    const parseResult: OriginalAST = {};

    // eslint-disable-next-line no-debugger
    // debugger;
    if (inputData.core) {
      const ASTCore = this.parseCore(inputData.core);
      if (isParserErrors(ASTCore)) {
        errors.push(...ASTCore);
      } else {
        parseResult.core = ASTCore;
      }
    }

    if (inputData.api) {
      const ASTApi = this.parseApi(inputData.api);
      if (isParserErrors(ASTApi)) {
        errors.push(...ASTApi);
      } else {
        parseResult.api = ASTApi;
      }
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
    const errors: ParserSyntacticError[] = [];
    for (const data of inputData) {
      const { boundedContext, module, fileId, fileContents } = data;
      const ASTContextOrError = BitloopsParser.getInitialAST(fileContents, fileId);
      if (isParserErrors(ASTContextOrError)) {
        errors.push(...ASTContextOrError);
      } else {
        const ASTContext = ASTContextOrError as ASTContext;

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
    }
    if (errors.length > 0) {
      return errors;
    }
    return boundedContexts;
  }

  public parseSetup(setupData: TParserSetupInputData): OriginalASTSetup | ParserSyntacticError[] {
    const setupContext: OriginalASTSetup = {};
    const errors: ParserSyntacticError[] = [];
    for (const data of setupData) {
      const { fileContents, fileId } = data;
      const ASTContextOrError = BitloopsParser.getInitialAST(fileContents, fileId);

      if (isParserErrors(ASTContextOrError)) {
        errors.push(...ASTContextOrError);
      } else {
        const ASTContext = ASTContextOrError as ASTContext;
        setupContext[fileId] = { ASTContext };
      }
    }
    if (errors.length > 0) {
      return errors;
    }
    return setupContext;
  }

  private parseApi(inputData: TParserApiInputData): OriginalASTApi | ParserSyntacticError[] {
    const apis: OriginalASTApi = {};
    const errors: ParserSyntacticError[] = [];
    for (const data of inputData) {
      const { api, fileId, fileContents } = data;
      const ASTContextOrError = BitloopsParser.getInitialAST(fileContents, fileId);
      if (isParserErrors(ASTContextOrError)) {
        errors.push(...ASTContextOrError);
      } else {
        const ASTContext = ASTContextOrError as ASTContext;

        if (apis[api] === null || apis[api] === undefined) {
          // first time we come across this api
          apis[api] = {
            [fileId]: { ASTContext },
          };
        } else {
          apis[api][fileId] = { ASTContext };
        }
      }
    }
    if (errors.length > 0) {
      return errors;
    }
    return apis;
  }

  /**
   * Initial AST.
   * @param blCode string
   * @returns Parser.ProgramContext
   */
  private static getInitialAST(
    blCode: string,
    fileId: string,
  ): ASTContext | ParserSyntacticError[] {
    const chars = new (antlr4 as any).InputStream(blCode);
    const lexer = new BitloopsLexer(chars);
    const tokens = new (antlr4 as any).CommonTokenStream(lexer as any);
    const parser = new Parser(tokens) as any;
    parser.removeErrorListeners();
    const errorListener = new VerboseErrorListener(fileId);
    parser.addErrorListener(errorListener);

    const tree = parser.program() as ASTContext;
    if (errorListener.hasErrors()) {
      return errorListener.getErrors();
    }
    return tree;
  }
}
