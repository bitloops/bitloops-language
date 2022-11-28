import { BitloopsLanguageASTContext } from '../../parser/index.js';
import { TBoundedContexts } from '../../types.js';

export interface IBitloopsIntermediateASTParser {
  parse: (ast: BitloopsLanguageASTContext) => TBoundedContexts | BitloopsIntermediateASTParserError;
}

export class BitloopsIntermediateASTParserError extends Error {}
