import { IntermediateASTValidationError } from '../../ast/core/types.js';
import { IdentifierNode } from '../../ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { ServerRouteNode } from '../../ast/core/intermediate-ast/nodes/setup/ServerRouteNode.js';
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
