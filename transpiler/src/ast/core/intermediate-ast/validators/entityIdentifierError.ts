import { IntermediateASTValidationError } from '../../types.js';
import { EntityIdentifierNode } from '../nodes/Entity/EntityIdentifierNode.js';
import { identifierValidationError } from './index.js';

export const entityIdentifierError = (
  node: EntityIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
