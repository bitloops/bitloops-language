import { IntermediateASTValidationError } from '../../ast/core/types.js';
import { GraphQLControllerExecuteReturnTypeNode } from '../../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { identifierValidationError } from './validationErrors.js';

export const graphQLControllerExecuteReturnTypeError = (
  node: GraphQLControllerExecuteReturnTypeNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getType()))
    errors.push(new identifierValidationError(node.getType(), node));
  return errors;
};
