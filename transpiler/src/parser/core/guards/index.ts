import {
  ASTContext,
  OriginalParserError,
  OriginalASTCore,
  OriginalASTSetup,
  OriginalAST,
} from '../types.js';

const isParserErrors = (
  value: OriginalAST | OriginalParserError[],
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
  value: OriginalParserError | ASTContext | OriginalASTSetup | OriginalASTCore,
): value is OriginalParserError => {
  if (value instanceof OriginalParserError) {
    return true;
  }
  return false;
};
export { isParserError, isParserErrors };
