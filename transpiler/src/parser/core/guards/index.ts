import { TTranspileError, TTranspileOutput } from '../../../transpilerTypes.js';
import {
  ASTContext,
  OriginalParserError,
  OriginalASTCore,
  OriginalASTSetup,
  OriginalAST,
  ASTSetupContext,
} from '../types.js';

const isParserErrors = (
  value: TTranspileOutput | TTranspileError[] | OriginalAST | OriginalParserError[],
): value is OriginalParserError[] => {
  if (!Array.isArray(value)) {
    return false;
  }
  for (const err of value) {
    if (!isParserError(err)) {
      return false;
    }
  }
  return true;
};

const isParserError = (
  value: TTranspileError | ASTContext | ASTSetupContext | OriginalASTSetup | OriginalASTCore,
): value is OriginalParserError => {
  if (value instanceof OriginalParserError) {
    return true;
  }
  return false;
};
export { isParserError, isParserErrors };
