import { BitloopsLanguageAST } from '../../parser/core/types.js';
import { ISetupData } from '../../types.js';

export interface IBitloopsIntermediateSetupASTParser {
  parse: (ast: BitloopsLanguageAST) => ISetupData | BitloopsIntermediateSetupASTParserError;
}

export class BitloopsIntermediateSetupASTParserError extends Error {}
