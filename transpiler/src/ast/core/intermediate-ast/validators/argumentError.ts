import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';

export const argumentError = (
  node: IntermediateASTNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const identifierNode = node.getFirstChild().getFirstChild();
  if (!thisSymbolTable.has(identifierNode.getValue().identifier)) {
    errors.push(
      new IntermediateASTValidationError(
        `Argument ${identifierNode.getValue().identifier} not found: from ${
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
