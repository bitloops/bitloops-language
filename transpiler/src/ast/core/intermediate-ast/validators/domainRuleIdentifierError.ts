import { IntermediateASTValidationError } from '../../types.js';
import { DomainRuleIdentifierNode } from '../nodes/DomainRule/DomainRuleIdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';

export const domainRuleIdentifierError = (
  node: DomainRuleIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};
