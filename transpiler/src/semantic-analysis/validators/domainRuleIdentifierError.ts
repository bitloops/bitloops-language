import { ValidationError } from '../../ast/core/types.js';
import { DomainRuleIdentifierNode } from '../../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';
import { SymbolTable } from '../type-inference/SymbolTable.js';

// TODO: check why is this not matching with bitloopsIdentifierValidator
export const domainRuleIdentifierError = (
  node: DomainRuleIdentifierNode,
  thisSymbolTable: SymbolTable,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.hasChildScope(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
