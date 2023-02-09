import { IntermediateASTValidationError } from '../../types.js';
import { BitloopsIdentifierTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';

export const bitloopsIdentifierError = (
  node: BitloopsIdentifierTypeNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(
      new IntermediateASTValidationError(
        `Type ${node.getIdentifierName()} not found: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
  return errors;
};
