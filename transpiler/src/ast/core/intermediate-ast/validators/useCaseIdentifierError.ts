import { IntermediateASTValidationError } from '../../types.js';
import { BoundedContextModuleNode } from '../nodes/setup/BoundedContextModuleNode.js';
import { UseCaseExpressionNode } from '../nodes/setup/UseCaseExpressionNode.js';
import { UseCaseIdentifierNode } from '../nodes/UseCase/UseCaseIdentifierNode.js';
import { boundedContextError } from './index.js';

export const useCaseIdentifierCoreError = (
  node: UseCaseIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(
      new IntermediateASTValidationError(
        `Use Case ${node.getIdentifierName()} not found: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
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
    errors.push(boundedContextError(boundedContextNode));
    return errors;
  }
  if (!thisSymbolTableCore[boundedContext].has(node.getIdentifierName())) {
    errors.push(
      new IntermediateASTValidationError(
        `Use Case ${node.getIdentifierName()} not found in bounded context ${boundedContext}: from ${
          node.getMetadata().start.line
        }:${node.getMetadata().start.column} to ${node.getMetadata().end.line}:${
          node.getMetadata().end.column
        } of file ${node.getMetadata().fileId}`,
        node.getMetadata(),
      ),
    );
  }
  return errors;
};
