import { IntermediateASTValidationError } from '../../types.js';

import { ErrorIdentifierNode } from '../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';

export const errorIdentifierError = (
  node: ErrorIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(
      new IntermediateASTValidationError(
        `Error ${node.getIdentifierName()} not found: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
  return errors;
};
