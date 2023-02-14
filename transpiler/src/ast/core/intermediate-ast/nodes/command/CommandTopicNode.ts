import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class CommandTopicNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'commandTopic';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TCommandTopicIdentifier, CommandTopicNode.classNodeName, metadata);
  }

  public static getClassNodeName() {
    return CommandTopicNode.classNodeName;
  }
}
