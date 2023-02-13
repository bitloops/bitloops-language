import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerRouteNode extends IntermediateASTNode {
  private static classNodeName = 'serverRoute';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRestServerInstanceRouter, metadata, ServerRouteNode.classNodeName);
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier;
  }
}
