import { IntermediateASTValidationError } from '../../types.js';
import { ReadModelIdentifierNode } from '../nodes/readModel/ReadModelIdentifierNode.js';

export const readModelIdentifierError = (
  node: ReadModelIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(
      new IntermediateASTValidationError(
        `Read Model ${node.getIdentifierName()} not found: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
  return errors;
};
