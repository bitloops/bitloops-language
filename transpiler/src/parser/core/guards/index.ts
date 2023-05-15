import { IntermediateAST } from '../../../ast/core/types.js';
import { TranspilerErrors, TTranspileOutput } from '../../../transpilerTypes.js';
import {
  ASTContext,
  ParserSyntacticError,
  OriginalASTCore,
  OriginalASTSetup,
  OriginalAST,
} from '../types.js';

const isParserErrors = (
  value:
    | TTranspileOutput
    | TranspilerErrors
    | OriginalAST
    | OriginalASTCore
    | ASTContext
    | OriginalASTSetup
    | ParserSyntacticError[]
    | IntermediateAST,
): value is ParserSyntacticError[] => {
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

const isParserError = (value: unknown): value is ParserSyntacticError => {
  if (value instanceof ParserSyntacticError) {
    return true;
  }
  return false;
};
export { isParserError, isParserErrors };
