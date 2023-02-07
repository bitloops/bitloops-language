import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ApiDeclarationNode extends IntermediateASTNode {
  private static classNodeName = 'apiDeclaration';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TApiDeclaration, metadata, ApiDeclarationNode.classNodeName);
  }
}
