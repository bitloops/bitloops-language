import { IntermediateASTValidationError } from '../../types.js';
import { GraphQLControllerIdentifierNode } from '../nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { ControllerResolverNode } from '../nodes/setup/ControllerResolverNode.js';
import { boundedContextValidationError, identifierValidationError } from './index.js';

export const graphQLControllerIdentifierError = (
  node: GraphQLControllerIdentifierNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (
    (
      node.getParent() as ControllerResolverNode
    ).getBoundedContextModule() as BoundedContextModuleNode
  ).getBoundedContext();
  const boundedContext = boundedContextNode.getName();
  if (!(boundedContext in thisSymbolTableCore)) {
    errors.push(new boundedContextValidationError(boundedContextNode));
    return errors;
  }
  if (!thisSymbolTableCore[boundedContext].has(node.getIdentifierName())) {
    errors.push(new identifierValidationError(node.getIdentifierName(), node, boundedContext));
  }
  return errors;
};
