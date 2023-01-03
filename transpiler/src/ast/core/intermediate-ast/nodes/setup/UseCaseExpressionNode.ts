import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseExpressionNode extends IntermediateASTNode {
  private static classNodeName = 'useCaseExpression';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCaseExpression, metadata, UseCaseExpressionNode.classNodeName);
  }
}
