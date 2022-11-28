import { ISetupData } from '../../../types.js';
import { BitloopsIntermediateSetupASTParserError } from '../types.js';

const isBitloopsIntermediateSetupASTParserError = (
  value: ISetupData | BitloopsIntermediateSetupASTParserError,
): value is BitloopsIntermediateSetupASTParserError => {
  if (value instanceof BitloopsIntermediateSetupASTParserError) {
    return true;
  }
  return false;
};
export { isBitloopsIntermediateSetupASTParserError };
