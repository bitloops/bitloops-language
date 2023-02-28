import { IntermediateASTValidationError } from '../../types.js';
import { BitloopsIdentifierTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { identifierValidationError } from './index.js';

export const bitloopsIdentifierError = (
  node: BitloopsIdentifierTypeNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
