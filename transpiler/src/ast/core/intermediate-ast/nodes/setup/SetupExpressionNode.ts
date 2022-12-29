import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class SetupExpressionNode extends IntermediateASTNode {
  private static classNodeName = 'setupExpression';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TSetupExpression, metadata, SetupExpressionNode.classNodeName);
  }
}
