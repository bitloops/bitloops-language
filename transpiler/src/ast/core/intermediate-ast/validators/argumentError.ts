import { IntermediateASTValidationError } from '../../types.js';
import { ArgumentNode } from '../nodes/ArgumentList/ArgumentNode.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';

export const argumentError = (
  node: ArgumentNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const expressionNode = node.getExpression();
  const identifierNode = expressionNode.getFirstChild();
  if (!thisSymbolTable.has((identifierNode as IdentifierNode).getIdentifierName())) {
    errors.push(
      new IntermediateASTValidationError(
        `Argument ${(identifierNode as IdentifierNode).getIdentifierName()} not found: from ${
          identifierNode.getMetadata().start.line
        }:${identifierNode.getMetadata().start.column} to ${
          identifierNode.getMetadata().end.line
        }:${identifierNode.getMetadata().end.column} of file ${
          identifierNode.getMetadata().fileId
        }`,
        identifierNode.getMetadata(),
      ),
    );
  }
  return errors;
};
