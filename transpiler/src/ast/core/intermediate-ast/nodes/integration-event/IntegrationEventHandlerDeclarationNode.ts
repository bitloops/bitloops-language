import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationEventHandlerDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.IntegrationEventHandler;
  private static classNodeName = 'integrationEventHandler';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: IntegrationEventHandlerDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TIntegrationEventHandler,
      metadata,
      classNodeName: IntegrationEventHandlerDeclarationNode.classNodeName,
    });
  }
}
