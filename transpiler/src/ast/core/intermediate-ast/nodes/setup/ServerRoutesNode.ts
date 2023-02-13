import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerRoutesNode extends IntermediateASTNode {
  private static classNodeName = 'serverRoutes';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRestServerInstanceRouters,
      metadata,
      ServerRoutesNode.classNodeName,
    );
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier;
  }
}
