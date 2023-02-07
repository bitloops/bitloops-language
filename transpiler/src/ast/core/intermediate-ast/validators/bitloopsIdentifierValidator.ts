import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';

export const bitloopsIdentifierError = (
  node: IntermediateASTNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getValue().bitloopsIdentifierType))
    errors.push(
      new IntermediateASTValidationError(
        `Type ${node.getValue().bitloopsIdentifierType} not found: from ${
          node.getMetadata().start.line
        }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
          node.getMetadata().end.column
        } of file ${node.getMetadata().fileId}`,
        node.getMetadata(),
      ),
    );
  return errors;
};
