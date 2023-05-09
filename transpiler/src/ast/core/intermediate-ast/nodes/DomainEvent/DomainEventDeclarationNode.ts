import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { FieldNode } from '../FieldList/FieldNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { DomainEventIdentifierNode } from './DomainEventIdentifierNode.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../../directors/BitloopsPrimaryTypeNodeBuilderDirector.js';

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

  public getFieldNodes(): FieldNode[] {
    const fieldListNode = this.getChildNodeByType(BitloopsTypesMapping.TVariables) as FieldListNode;
    if (!fieldListNode) {
      return [];
    }
    return fieldListNode.getFieldNodes();
  }

  public getFieldTypes(): Record<string, BitloopsPrimaryTypeNode> {
    const fieldNodes = this.getFieldNodes();
    const fieldTypes: Record<string, BitloopsPrimaryTypeNode> = {
      aggregateId: new BitloopsPrimaryTypeNodeBuilderDirector().buildPrimitivePrimaryType('string'),
    };
    fieldNodes.forEach((fieldNode) => {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeNode();
      fieldTypes[identifier] = type;
    });
    return fieldTypes;
  }
}
