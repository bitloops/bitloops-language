import { ValidationError } from '../../ast/core/types.js';
import { DomainRuleIdentifierNode } from '../../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleIdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';

// TODO: check why is this not matching with bitloopsIdentifierValidator
export const domainRuleIdentifierError = (
  node: DomainRuleIdentifierNode,
  thisSymbolTable: Set<string>,
): ValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
