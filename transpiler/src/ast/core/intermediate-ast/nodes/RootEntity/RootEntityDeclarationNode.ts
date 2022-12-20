import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { RootEntityKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { EntityIdentifierNode } from '../Entity/EntityIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

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
    return this.getChildNodeByType<DomainCreateNode>(BitloopsTypesMapping.TDomainCreateMethod);
  }

  public getIdentifier(): EntityIdentifierNode {
    const [resultNode] = this.getChildren().filter((node: IntermediateASTNode) => {
      node.getClassNodeName() === EntityIdentifierNode.getClassNodeName();
    });

    const identifierNode = resultNode as EntityIdentifierNode;
    return identifierNode;
  }
}
