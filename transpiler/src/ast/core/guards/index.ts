import { isParserErrors } from '../../../parser/core/guards/index.js';
import { OriginalParserError } from '../../../parser/index.js';
import { TTranspileError, TTranspileOutput } from '../../../transpilerTypes.js';
import { IntermediateASTValidationError, IntermediateAST, IntermediateASTError } from '../types.js';

const isOriginalParserOrIntermediateASTError = (
  value: OriginalParserError | IntermediateASTError | IntermediateAST,
): value is OriginalParserError | IntermediateASTError => {
  if (isParserErrors(value) || isIntermediateASTValidationErrors(value)) {
    return true;
  }
  return false;
};

const isIntermediateASTValidationErrors = (
  value:
    | IntermediateAST
    | TTranspileOutput
    | TTranspileError[]
    | void
    | IntermediateASTValidationError[],
): value is IntermediateASTValidationError[] => {
  if (Array.isArray(value)) {
    for (const err of value) {
      if (!(err instanceof IntermediateASTValidationError)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export { isOriginalParserOrIntermediateASTError, isIntermediateASTValidationErrors };
