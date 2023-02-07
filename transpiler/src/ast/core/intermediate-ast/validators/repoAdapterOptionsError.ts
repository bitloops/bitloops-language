import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { RepoAdapterOptionsNode } from '../nodes/setup/repo/RepoAdapterOptionsNode.js';

export const repoAdapterOptionsError = (
  node: IntermediateASTNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if ((node as RepoAdapterOptionsNode).getEvaluationFieldList().findFieldWithName('connection')) {
    const expressionNode = (node as RepoAdapterOptionsNode)
      .getEvaluationFieldList()
      .findFieldWithName('connection')
      .getExpression()
      .getFirstChild();

    if (!thisSymbolTable.has(expressionNode.getValue().identifier)) {
      errors.push(
        new IntermediateASTValidationError(
          `Connection ${expressionNode.getValue().identifier} not found: from ${
            expressionNode.getMetadata().start.line
          }:${expressionNode.getMetadata().start.column} to ${
            expressionNode.getMetadata().end.line
          }:${expressionNode.getMetadata().end.column} of file ${
            expressionNode.getMetadata().fileId
          }`,
          expressionNode.getMetadata(),
        ),
      );
    }
  }
  return errors;
};
