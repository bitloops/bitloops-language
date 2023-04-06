import { IntermediateASTValidationError } from '../../ast/core/types.js';
import { DomainServiceEvaluationNode } from '../../ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { IdentifierNode } from '../../ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';

export const domainServiceEvaluationError = (
  node: DomainServiceEvaluationNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const identifier: IdentifierNode = node.getIdentifier();
  if (!thisSymbolTable.has(identifier.getIdentifierName()))
    errors.push(new identifierValidationError(identifier.getIdentifierName(), identifier));
  return errors;
};
