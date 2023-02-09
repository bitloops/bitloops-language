import { IntermediateASTValidationError } from '../../types.js';
import { IdentifierExpressionNode } from '../nodes/Expression/IdentifierExpression.js';
import { RepoAdapterOptionsNode } from '../nodes/setup/repo/RepoAdapterOptionsNode.js';

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
      .getFirstChild();

    if (!thisSymbolTable.has((expressionNode as IdentifierExpressionNode).getIdentifierName())) {
      errors.push(
        new IntermediateASTValidationError(
          `Connection ${(
            expressionNode as IdentifierExpressionNode
          ).getIdentifierName()} not found: from ${expressionNode.getMetadata().start.line}:${
            expressionNode.getMetadata().start.column
          } to ${expressionNode.getMetadata().end.line}:${
            expressionNode.getMetadata().end.column
          } of file ${expressionNode.getMetadata().fileId}`,
          expressionNode.getMetadata(),
        ),
      );
    }
  }
  return errors;
};
