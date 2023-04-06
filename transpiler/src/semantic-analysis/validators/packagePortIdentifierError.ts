import { IntermediateASTValidationError } from '../../ast/core/types.js';
import { PackageConcretionNode } from '../../ast/core/intermediate-ast/nodes/package/PackageConcretionNode.js';
import { PackagePortIdentifierNode } from '../../ast/core/intermediate-ast/nodes/package/packagePort/PackagePortIdentifierNode.js';
import { BoundedContextModuleNode } from '../../ast/core/intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
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
