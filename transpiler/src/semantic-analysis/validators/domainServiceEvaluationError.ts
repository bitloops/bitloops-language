import { ValidationError } from '../../ast/core/types.js';
import { DomainServiceEvaluationNode } from '../../ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { IdentifierNode } from '../../ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';

// TODO: check why is this not matching with bitloopsIdentifierValidator
export const domainServiceEvaluationError = (
  node: DomainServiceEvaluationNode,
  thisSymbolTable: Set<string>,
): ValidationError[] => {
  const errors = [];
  const identifier: IdentifierNode = node.getIdentifierNode();
  if (!thisSymbolTable.has(identifier.getIdentifierName()))
    errors.push(new identifierValidationError(identifier.getIdentifierName(), identifier));
  return errors;
};
