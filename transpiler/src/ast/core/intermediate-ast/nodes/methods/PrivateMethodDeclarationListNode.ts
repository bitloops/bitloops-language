import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class PrivateMethodDeclarationListNode extends IntermediateASTNode {
  private static classNodeName = 'privateMethods';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPrivateMethods,
      metadata,
      PrivateMethodDeclarationListNode.classNodeName,
    );
  }
}
