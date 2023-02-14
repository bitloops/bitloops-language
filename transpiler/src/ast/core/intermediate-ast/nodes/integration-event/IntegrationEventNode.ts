import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationEventNode extends ClassTypeNode {
  private static classType = ClassTypes.IntegrationEvent;
  private static classNodeName = 'IntegrationEvent';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: IntegrationEventNode.classType,
      nodeType: BitloopsTypesMapping.TIntegrationEvent,
      metadata,
      classNodeName: IntegrationEventNode.classNodeName,
    });
  }
}
