import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class EnviromentalVariableNode extends IntermediateASTNode {
  private static classNodeName = 'enviromentalVariable';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TEnvironmentVariableExpression,
      metadata,
      EnviromentalVariableNode.classNodeName,
    );
  }
}
