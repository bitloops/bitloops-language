import { IntermediateASTValidationError } from '../../types.js';
import { ConcretedRepoPortNode } from '../nodes/setup/repo/ConcretedRepoPortNode.js';
import { SetupRepoAdapterDefinitionNode } from '../nodes/setup/repo/SetupRepoAdapterDefinitionNode.js';
import { boundedContextValidationError, identifierValidationError } from './index.js';

export const concretedRepoPortError = (
  node: ConcretedRepoPortNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (node.getParent().getParent() as SetupRepoAdapterDefinitionNode)
    .getRepoAdapterExpression()
    .getBoundedContextModule()
    .getBoundedContext();

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
