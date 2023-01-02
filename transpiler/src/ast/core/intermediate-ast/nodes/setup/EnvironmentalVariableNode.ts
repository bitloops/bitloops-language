import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class EnvironmentalVariableNode extends IntermediateASTNode {
  private static classNodeName = 'restServerDeclarationVisitor';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TEnvironmentVariableExpression,
      metadata,
      EnvironmentalVariableNode.classNodeName,
    );
  }
}
