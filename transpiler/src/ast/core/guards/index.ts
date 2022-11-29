import { TBoundedContexts } from '../../../types.js';
import {
  IntermediateASTParserError,
  IntermediateASTValidationError,
  BitloopsIntermediateASTError,
} from '../types.js';

const isBitloopsIntermediateASTError = (
  value: TBoundedContexts | BitloopsIntermediateASTError,
): value is BitloopsIntermediateASTError => {
  if (isIntermediateASTParserError(value) || isIntermediateASTValidationErrors(value)) {
    return true;
  }
  return false;
};

const isIntermediateASTParserError = (
  value: TBoundedContexts | IntermediateASTValidationError[] | IntermediateASTParserError,
): value is IntermediateASTParserError => {
  if (value instanceof IntermediateASTParserError) {
    return true;
  }
  return false;
};

const isIntermediateASTValidationErrors = (
  value: TBoundedContexts | void | IntermediateASTValidationError[],
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

export {
  isIntermediateASTParserError,
  isIntermediateASTValidationErrors,
  isBitloopsIntermediateASTError,
};
