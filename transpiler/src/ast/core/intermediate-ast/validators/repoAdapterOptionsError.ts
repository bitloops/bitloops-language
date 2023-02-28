import { IntermediateASTValidationError } from '../../types.js';
import { IdentifierExpressionNode } from '../nodes/Expression/IdentifierExpression.js';
import { RepoAdapterOptionsNode } from '../nodes/setup/repo/RepoAdapterOptionsNode.js';
import { identifierValidationError } from './validationErrors.js';

export const repoAdapterOptionsError = (
  node: RepoAdapterOptionsNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (node.getEvaluationFieldList().findFieldWithName('connection')) {
    const expressionNode = node
      .getEvaluationFieldList()
      .findFieldWithName('connection')
      .getExpression()
      .getFirstChild() as IdentifierExpressionNode;

    if (!thisSymbolTable.has(expressionNode.getIdentifierName())) {
      errors.push(
        new identifierValidationError(expressionNode.getIdentifierName(), expressionNode),
      );
    }
  }
  return errors;
};
