import { IntermediateASTValidationError } from '../../ast/core/types.js';
import { ReadModelIdentifierNode } from '../../ast/core/intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';

export const readModelIdentifierError = (
  node: ReadModelIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
