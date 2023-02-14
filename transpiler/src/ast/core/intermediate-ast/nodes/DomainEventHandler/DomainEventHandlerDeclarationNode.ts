import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainEventHandlerDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainEventHandler;
  private static classNodeName = 'domainEventHandler';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainEventHandlerDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TDomainEventHandler,
      metadata,
      classNodeName: DomainEventHandlerDeclarationNode.classNodeName,
    });
  }
}
