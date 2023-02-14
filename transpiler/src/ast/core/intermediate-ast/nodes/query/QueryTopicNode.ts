import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class QueryTopicNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'queryTopicIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TQueryTopicIdentifier, QueryTopicNode.classNodeName, metadata);
  }

  public static getClassNodeName() {
    return QueryTopicNode.classNodeName;
  }
}
