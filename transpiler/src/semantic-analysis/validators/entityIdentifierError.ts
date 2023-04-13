import { ValidationError } from '../../ast/core/types.js';
import { EntityIdentifierNode } from '../../ast/core/intermediate-ast/nodes/Entity/EntityIdentifierNode.js';
import { identifierValidationError } from './index.js';
import { SymbolTable } from '../type-inference/SymbolTable.js';

export const entityIdentifierError = (
  node: EntityIdentifierNode,
  thisSymbolTable: SymbolTable,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.hasChildScope(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
