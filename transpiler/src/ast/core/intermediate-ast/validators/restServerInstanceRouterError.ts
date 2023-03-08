import { IntermediateASTValidationError } from '../../types.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { ServerRouteNode } from '../nodes/setup/ServerRouteNode.js';
import { identifierValidationError } from './validationErrors.js';

export const restServerInstanceRouterError = (
  node: ServerRouteNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const identifierNode = node.getIdentifier() as IdentifierNode;
  if (!thisSymbolTable.has(identifierNode.getIdentifierName())) {
    errors.push(new identifierValidationError(identifierNode.getIdentifierName(), identifierNode));
  }
  return errors;
};
