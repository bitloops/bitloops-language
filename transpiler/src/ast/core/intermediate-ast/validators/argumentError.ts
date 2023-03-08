import { IntermediateASTValidationError } from '../../types.js';
import { ArgumentNode } from '../nodes/ArgumentList/ArgumentNode.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { identifierValidationError } from './validationErrors.js';

export const argumentError = (
  node: ArgumentNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  const expressionNode = node.getExpression();
  const identifierNode = expressionNode.getFirstChild() as IdentifierNode;
  if (!thisSymbolTable.has(identifierNode.getIdentifierName())) {
    errors.push(new identifierValidationError(identifierNode.getIdentifierName(), identifierNode));
  }
  return errors;
};
