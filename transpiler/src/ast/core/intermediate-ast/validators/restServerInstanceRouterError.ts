import { IntermediateASTValidationError } from '../../types.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { ServerRouteNode } from '../nodes/setup/ServerRouteNode.js';

export const restServerInstanceRouterError = (
  node: ServerRouteNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const identifierNode = node.getIdentifier();
  if (!thisSymbolTable.has((identifierNode as IdentifierNode).getIdentifierName())) {
    errors.push(
      new IntermediateASTValidationError(
        `Router ${(identifierNode as IdentifierNode).getIdentifierName()} not found: from ${
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
