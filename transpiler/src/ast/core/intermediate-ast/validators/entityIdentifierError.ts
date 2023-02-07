import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';

export const entityIdentifierError = (
  node: IntermediateASTNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getValue().entityIdentifier))
    errors.push(
      new IntermediateASTValidationError(
        `Entity ${node.getValue().entityIdentifier} not found: from ${
          node.getMetadata().start.line
        }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
          node.getMetadata().end.column
        } of file ${node.getMetadata().fileId}`,
        node.getMetadata(),
      ),
    );
  return errors;
};
