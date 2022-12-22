import { TBoundedContexts } from '../../../types.js';
import {
  IntermediateASTParserError,
  IntermediateASTValidationError,
  IntermediateAST,
  IntermediateASTError,
} from '../types.js';

const isIntermediateASTError = (
  value: IntermediateAST | IntermediateASTError,
): value is IntermediateASTError => {
  if (isIntermediateASTParserError(value) || isIntermediateASTValidationErrors(value)) {
    return true;
  }
  return false;
};

const isIntermediateASTParserError = (
  value:
    | IntermediateAST
    | TBoundedContexts
    | IntermediateASTValidationError[]
    | IntermediateASTParserError[],
): value is IntermediateASTParserError[] => {
  if (value instanceof IntermediateASTParserError) {
    return true;
  }
  return false;
};

const isIntermediateASTValidationErrors = (
  value: IntermediateAST | void | IntermediateASTValidationError[],
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

export { isIntermediateASTParserError, isIntermediateASTValidationErrors, isIntermediateASTError };
