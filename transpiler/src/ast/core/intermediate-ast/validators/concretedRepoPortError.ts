import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { SetupRepoAdapterDefinitionNode } from '../nodes/setup/repo/SetupRepoAdapterDefinitionNode.js';
import { boundedContextError } from './index.js';

export const concretedRepoPortError = (
  node: IntermediateASTNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (node.getParent().getParent() as SetupRepoAdapterDefinitionNode)
    .getRepoAdapterExpression()
    .getBoundedContextModule()
    .getBoundedContext();

  const boundedContext = boundedContextNode.getName();
  if (!(boundedContext in thisSymbolTableCore)) {
    errors.push(boundedContextError(boundedContextNode));
    return errors;
  }
  if (!thisSymbolTableCore[boundedContext].has(node.getValue().concretedRepoPort)) {
    errors.push(
      new IntermediateASTValidationError(
        `Repo port ${
          node.getValue().concretedRepoPort
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
