import { IntermediateASTValidationError } from '../../types.js';
import { IntermediateASTNodeValidationError } from '../nodes/IntermediateASTNode.js';
import { BoundedContextNameNode } from '../nodes/setup/BoundedContextNameNode.js';

export const boundedContextError = (
  boundedContextNode: BoundedContextNameNode,
): IntermediateASTNodeValidationError => {
  return new IntermediateASTValidationError(
    `Bounded Context ${boundedContextNode.getName()} not found: from ${
      boundedContextNode.getMetadata().start.line
    }:${boundedContextNode.getMetadata().start.column} to ${
      boundedContextNode.getMetadata().end.line
    }:${boundedContextNode.getMetadata().end.column} of file ${
      boundedContextNode.getMetadata().fileId
    }`,
    boundedContextNode.getMetadata(),
  );
};
