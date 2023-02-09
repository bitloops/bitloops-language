import { IntermediateASTValidationError } from '../../types.js';
import { DomainRuleIdentifierNode } from '../nodes/DomainRule/DomainRuleIdentifierNode.js';

export const domainRuleIdentifierError = (
  node: DomainRuleIdentifierNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getIdentifierName()))
    errors.push(
      new IntermediateASTValidationError(
        `DomainRule ${node.getIdentifierName()} not found: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
  return errors;
};
