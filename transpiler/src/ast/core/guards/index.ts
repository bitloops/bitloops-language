import { isParserErrors } from '../../../parser/core/guards/index.js';
import { ParserSyntacticErrors } from '../../../parser/index.js';
import { TranspilerErrors, TTranspileOutput } from '../../../transpilerTypes.js';
import { ValidationError, IntermediateAST, ValidationErrors } from '../types.js';

const isOriginalParserOrIntermediateASTError = (
  value: ParserSyntacticErrors | ValidationErrors | IntermediateAST,
): value is ParserSyntacticErrors | ValidationErrors => {
  if (isParserErrors(value) || isIntermediateASTValidationErrors(value)) {
    return true;
  }
  return false;
};

const isIntermediateASTValidationErrors = (
  value: IntermediateAST | TTranspileOutput | TranspilerErrors | void | ValidationError[],
): value is ValidationError[] => {
  if (Array.isArray(value)) {
    for (const err of value) {
      if (!(err instanceof ValidationError)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export { isOriginalParserOrIntermediateASTError, isIntermediateASTValidationErrors };
