import { isParserErrors } from '../../../parser/core/guards/index.js';
import { OriginalParserError } from '../../../parser/index.js';
import { TTranspileError, TTranspileOutput } from '../../../transpilerTypes.js';
import {
  IntermediateASTParserError,
  IntermediateASTValidationError,
  IntermediateAST,
  IntermediateASTError,
  TBoundedContexts,
} from '../types.js';

const isOriginalParserOrIntermediateASTError = (
  value: OriginalParserError | IntermediateASTError | IntermediateAST,
): value is OriginalParserError | IntermediateASTError => {
  if (isParserErrors(value) || isIntermediateASTError(value)) {
    return true;
  }
  return false;
};

const isIntermediateASTError = (
  value: TTranspileOutput | TTranspileError[] | IntermediateAST | IntermediateASTError,
): value is IntermediateASTError => {
  if (isIntermediateASTParserError(value) || isIntermediateASTValidationErrors(value)) {
    return true;
  }
  return false;
};

const isIntermediateASTParserError = (
  value:
    | IntermediateAST
    | TTranspileOutput
    | TTranspileError[]
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

export {
  isOriginalParserOrIntermediateASTError,
  isIntermediateASTParserError,
  isIntermediateASTValidationErrors,
  isIntermediateASTError,
};
