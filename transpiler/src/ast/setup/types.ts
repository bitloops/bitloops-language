import { BitloopsLanguageSetupAST } from '../../parser/setup/types.js';
import { ISetupData } from '../../types.js';

export interface IBitloopsIntermediateSetupASTParser {
  parse: (ast: BitloopsLanguageSetupAST) => ISetupData | BitloopsIntermediateSetupASTParserError;
}

export class BitloopsIntermediateSetupASTParserError extends Error {}
