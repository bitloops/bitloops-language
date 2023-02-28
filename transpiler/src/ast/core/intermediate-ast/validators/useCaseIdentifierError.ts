import { IntermediateASTValidationError } from '../../types.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { UseCaseExpressionNode } from '../nodes/setup/UseCaseExpressionNode.js';
import { UseCaseIdentifierNode } from '../nodes/UseCase/UseCaseIdentifierNode.js';
import { boundedContextValidationError, identifierValidationError } from './index.js';

export const useCaseIdentifierCoreError = (
  node: UseCaseIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(new identifierValidationError(node.getIdentifierName(), node));
  return errors;
};

export const useCaseIdentifierSetupError = (
  node: UseCaseIdentifierNode,
  thisSymbolTableCore: Record<string, Set<string>>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const boundedContextNode = (
    (
      node.getParent() as UseCaseExpressionNode
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
