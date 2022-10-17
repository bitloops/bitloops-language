import { TBoundedContexts } from '../../types.js';

// TODO This is a temporary solution.
export type BitloopsLanguageASTContext = any;
export type TParserCoreInputData = any;

/**
 * Parser
 * bl code to AST
 */

export interface IBitloopsParser {
  parse: (inputData: TParserCoreInputData) => BitloopsLanguageASTContext | BitloopsParserError;
}

export class BitloopsParserError extends Error {}
export class BitloopsParser implements IBitloopsParser {
  parse(_inputData: TParserCoreInputData): BitloopsLanguageASTContext | BitloopsParserError {
    return 'TODO' as any;
  }
}

/**
 * AST To Intermediate Model
 */

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTParserError;
}

export class BitloopsIntermediateASTParserError extends Error {}

export class BitloopsIntermediateASTParser implements IBitloopsIntermediateASTParser {
  parse(_ast: BitloopsLanguageASTContext): TBoundedContexts | BitloopsIntermediateASTParserError {
    throw new Error('Not implemented');
  }
}
