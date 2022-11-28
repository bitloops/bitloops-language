import { TBoundedContexts } from '../../../types.js';
import { BitloopsIntermediateASTParserError } from '../types.js';

const isBitloopsIntermediateASTParserError = (
  value: TBoundedContexts | BitloopsIntermediateASTParserError,
): value is BitloopsIntermediateASTParserError => {
  if (value instanceof BitloopsIntermediateASTParserError) {
    return true;
  }
  return false;
};
export { isBitloopsIntermediateASTParserError };
