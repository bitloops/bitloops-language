import { IntermediateAST } from '../../../ast/core/types.js';
import { TTranspileError, TTranspileOutput } from '../../../transpilerTypes.js';
import {
  ASTContext,
  ParserSyntacticError,
  OriginalASTCore,
  OriginalASTSetup,
  OriginalAST,
  ASTSetupContext,
  OriginalASTApi,
} from '../types.js';

const isParserErrors = (
  value:
    | TTranspileOutput
    | TTranspileError[]
    | OriginalAST
    | OriginalASTCore
    | OriginalASTApi
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

const isParserError = (
  value:
    | TTranspileError
    | ASTContext
    | ASTSetupContext
    | OriginalASTSetup
    | OriginalASTCore
    | ParserSyntacticError,
): value is ParserSyntacticError => {
  if (value instanceof ParserSyntacticError) {
    return true;
  }
  return false;
};
export { isParserError, isParserErrors };
