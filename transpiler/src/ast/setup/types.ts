import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { TSetupData } from '../../types.js';

export interface IBitloopsIntermediateSetupASTParser {
  parse: (ast: IntermediateASTParser) => TSetupData | BitloopsIntermediateSetupASTParserError;
}

export class BitloopsIntermediateSetupASTParserError extends Error {}
