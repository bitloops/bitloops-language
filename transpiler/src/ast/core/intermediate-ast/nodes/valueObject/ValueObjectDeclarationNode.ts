import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { TPropsIdentifier } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ValueObjectIdentifierNode } from './ValueObjectIdentifierNode.js';

export class ValueObjectDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.ValueObject;
  private static classNodeName = 'ValueObject';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ValueObjectDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TValueObject,
      metadata,
      classNodeName: ValueObjectDeclarationNode.classNodeName,
    });
  }

  public getIdentifierValue(): string {
    const identifierNode = this.getChildNodeByType<ValueObjectIdentifierNode>(
      BitloopsTypesMapping.TValueObjectIdentifier,
    );
    if (!identifierNode) {
      throw new Error('Value object identifier not found');
    }
    return identifierNode.getIdentifierName();
  }

  public getCreateNode(): DomainCreateNode {
    const createNode = this.getChildNodeByType<DomainCreateNode>(
      BitloopsTypesMapping.TDomainCreateMethod,
    );
    if (!createNode) {
      throw new Error('Domain create not found');
    }
    return createNode;
  }

  public getPropsIdentifier(): TPropsIdentifier {
    const createNode = this.getCreateNode();
    const parameterNode = createNode.getParameterNode();
    const typeNode = parameterNode.getType();
    const identifierTypeNode = typeNode.getBitloopsIdentifierTypeNode();

    return identifierTypeNode.getIdentifierName();
  }
}
