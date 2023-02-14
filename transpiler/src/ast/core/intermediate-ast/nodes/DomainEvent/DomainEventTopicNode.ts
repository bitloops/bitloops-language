import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainEventTopicNode extends IntermediateASTNode {
  private static NAME = 'topic';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.DomainEventTopic, metadata, DomainEventTopicNode.NAME);
  }
}
