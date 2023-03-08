import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class PrivateMethodDeclarationNode extends IntermediateASTNode {
  private static classNodeName = 'privateMethod';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPrivateMethod,
      metadata,
      PrivateMethodDeclarationNode.classNodeName,
    );
  }
}
