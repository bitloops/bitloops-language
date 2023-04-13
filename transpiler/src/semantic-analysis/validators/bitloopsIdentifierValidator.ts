import { ValidationError } from '../../ast/core/types.js';
import { BitloopsIdentifierTypeNode } from '../../ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { identifierValidationError } from './index.js';
import { SymbolTable } from '../type-inference/SymbolTable.js';

export const bitloopsIdentifierError = (
  node: BitloopsIdentifierTypeNode,
  thisSymbolTable: SymbolTable,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.hasChildScope(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
