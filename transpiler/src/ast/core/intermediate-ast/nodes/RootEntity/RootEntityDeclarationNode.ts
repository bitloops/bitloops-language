import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { RootEntityKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { EntityIdentifierNode } from '../Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { EntityValuesNode } from '../Entity/EntityValuesNode.js';

export class RootEntityDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.RootEntity;
  private static classNodeName = RootEntityKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RootEntityDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TRootEntity,
      metadata,
      classNodeName: RootEntityDeclarationNode.classNodeName,
    });
  }

  public getDomainCreateNode(): DomainCreateNode {
    const domainCreateValuesNode = this.getChildNodeByType<EntityValuesNode>(
      BitloopsTypesMapping.TEntityValues,
    );
    return domainCreateValuesNode.getDomainCreateMethod();
  }

  public getIdentifier(): EntityIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TEntityIdentifier,
    ) as EntityIdentifierNode;
    return identifier;
  }
}
