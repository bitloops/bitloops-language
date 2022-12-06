import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class PublicMethodDeclarationNode extends IntermediateASTNode {
  private static classNodeName = 'publicMethod';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDomainPublicMethod,
      metadata,
      PublicMethodDeclarationNode.classNodeName,
    );
  }
}
