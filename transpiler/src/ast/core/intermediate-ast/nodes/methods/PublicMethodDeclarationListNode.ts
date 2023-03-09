import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class PublicMethodDeclarationListNode extends IntermediateASTNode {
  private static classNodeName = 'publicMethods';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPublicMethods,
      metadata,
      PublicMethodDeclarationListNode.classNodeName,
    );
  }
}
