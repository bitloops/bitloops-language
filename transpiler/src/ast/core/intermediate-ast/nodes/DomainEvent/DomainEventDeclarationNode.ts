import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { DomainEventIdentifierNode } from './DomainEventIdentifierNode.js';

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

  public getIdentifier(): DomainEventIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TDomainEventIdentifier,
    ) as DomainEventIdentifierNode;
    return identifier;
  }
}
