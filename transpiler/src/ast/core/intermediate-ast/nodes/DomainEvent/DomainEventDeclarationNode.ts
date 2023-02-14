import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainEventDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainEvent;
  private static classNodeName = 'domainEvent';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainEventDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TDomainEvent,
      metadata,
      classNodeName: DomainEventDeclarationNode.classNodeName,
    });
  }
}
