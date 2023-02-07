import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { PackageConcretionNode } from '../nodes/package/PackageConcretionNode.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { boundedContextError } from './index.js';

export const packagePortIdentifierError = (
  node: IntermediateASTNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (
    (
      node.getParent() as PackageConcretionNode
    ).getBoundedContextModule() as BoundedContextModuleNode
  ).getBoundedContext();
  const boundedContext = boundedContextNode.getName();
  if (!(boundedContext in thisSymbolTableCore)) {
    errors.push(boundedContextError(boundedContextNode));
    return errors;
  }
  if (!thisSymbolTableCore[boundedContext].has(node.getValue().PackagePortIdentifier)) {
    errors.push(
      new IntermediateASTValidationError(
        `Package port ${
          node.getValue().PackagePortIdentifier
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
