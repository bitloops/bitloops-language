import { ValidationError } from '../../ast/core/types.js';

import { ErrorIdentifierNode } from '../../ast/core/intermediate-ast/nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { identifierValidationError } from './index.js';

export const errorIdentifierError = (
  node: ErrorIdentifierNode,
  thisSymbolTable: Set<string>,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
