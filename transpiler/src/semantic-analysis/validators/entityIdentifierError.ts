import { ValidationError } from '../../ast/core/types.js';
import { EntityIdentifierNode } from '../../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { identifierValidationError } from './index.js';

export const entityIdentifierError = (
  node: EntityIdentifierNode,
  thisSymbolTable: Set<string>,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
