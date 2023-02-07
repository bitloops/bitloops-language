import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { RouterControllerNode } from '../nodes/setup/RouterControllerNode.js';
import { boundedContextError } from './index.js';

export const restControllerIdentifierError = (
  node: IntermediateASTNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (
    (node.getParent() as RouterControllerNode).getBoundedContextModule() as BoundedContextModuleNode
  ).getBoundedContext();
  const boundedContext = boundedContextNode.getName();
  if (!(boundedContext in thisSymbolTableCore)) {
    errors.push(boundedContextError(boundedContextNode));
    return errors;
  }
  if (!thisSymbolTableCore[boundedContext].has(node.getValue().RESTControllerIdentifier)) {
    errors.push(
      new IntermediateASTValidationError(
        `Controller ${
          node.getValue().RESTControllerIdentifier
        } not found in bounded context ${boundedContext}: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
  }
  return errors;
};
