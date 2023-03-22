import { IntermediateASTValidationError } from '../../types.js';
import { RESTControllerIdentifierNode } from '../nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { RouterControllerNode } from '../nodes/setup/RouterControllerNode.js';
import { boundedContextValidationError, identifierValidationError } from './index.js';

export const restControllerIdentifierError = (
  node: RESTControllerIdentifierNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (
    (node.getParent() as RouterControllerNode).getBoundedContextModule() as BoundedContextModuleNode
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
