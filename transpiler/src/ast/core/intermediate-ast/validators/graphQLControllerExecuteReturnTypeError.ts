import { IntermediateASTValidationError } from '../../types.js';
import { GraphQLControllerExecuteReturnTypeNode } from '../nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';

export const graphQLControllerExecuteReturnTypeError = (
  node: GraphQLControllerExecuteReturnTypeNode,
  thisSymbolTable: Set<string>,
): IntermediateASTValidationError[] => {
  const errors = [];
  if (!thisSymbolTable.has(node.getType()))
    errors.push(
      new IntermediateASTValidationError(
        `Type ${node.getType()} not found: from ${node.getMetadata().start.line}:${
          node.getMetadata().start.column
        } to ${node.getMetadata().end.line}:${node.getMetadata().end.column} of file ${
          node.getMetadata().fileId
        }`,
        node.getMetadata(),
      ),
    );
  return errors;
};
