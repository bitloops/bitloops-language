import { ValidationError } from '../../ast/core/types.js';
import { ReadModelIdentifierNode } from '../../ast/core/intermediate-ast/nodes/readModel/ReadModelIdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';
import { SymbolTable } from '../type-inference/SymbolTable.js';

export const readModelIdentifierError = (
  node: ReadModelIdentifierNode,
  // thisSymbolTable: Set<string>,
  thisSymbolTable: SymbolTable,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.hasChildScope(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
