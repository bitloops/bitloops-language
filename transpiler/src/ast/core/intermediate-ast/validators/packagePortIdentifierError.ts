import { IntermediateASTValidationError } from '../../types.js';
import { PackageConcretionNode } from '../nodes/package/PackageConcretionNode.js';
import { PackagePortIdentifierNode } from '../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { boundedContextValidationError, identifierValidationError } from './index.js';

export const packagePortIdentifierError = (
  node: PackagePortIdentifierNode,
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
    errors.push(new boundedContextValidationError(boundedContextNode));
    return errors;
  }
  if (!thisSymbolTableCore[boundedContext].has(node.getIdentifierName())) {
    errors.push(new identifierValidationError(node.getIdentifierName(), node, boundedContext));
  }
  return errors;
};
