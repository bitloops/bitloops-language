import { IntermediateASTValidationError } from '../../types.js';

import { ErrorIdentifierNode } from '../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { identifierValidationError } from './index.js';

export const errorIdentifierError = (
  node: ErrorIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
