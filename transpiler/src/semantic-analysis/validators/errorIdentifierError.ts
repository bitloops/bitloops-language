import { ValidationError } from '../../ast/core/types.js';

import { ErrorIdentifierNode } from '../../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { identifierValidationError } from './index.js';
import { SymbolTable } from '../type-inference/SymbolTable.js';

export const errorIdentifierError = (
  node: ErrorIdentifierNode,
  thisSymbolTable: SymbolTable,
): ValidationError[] => {
  const errors = [];
  const identifierValueWithoutPrefix = node.getIdentifierName().split('.')[1];
  if (!thisSymbolTable.hasChildScope(identifierValueWithoutPrefix))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
