import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { RootEntityKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { EntityIdentifierNode } from '../Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { EntityValuesNode } from '../Entity/EntityValuesNode.js';
import { PublicMethodDeclarationNode } from '../methods/PublicMethodDeclarationNode.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';

//fix this and entity to be extendable from a base class
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

  public findPublicMethodByName(methodName: string): PublicMethodDeclarationNode | null {
    const entityValues = this.getChildNodeByType<EntityValuesNode>(
      BitloopsTypesMapping.TEntityValues,
    );
    return entityValues.findPublicMethodByName(methodName);
  }

  public getEntityValues(): EntityValuesNode {
    const entityValues = this.getChildNodeByType(
      BitloopsTypesMapping.TEntityValues,
    ) as EntityValuesNode;
    return entityValues;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    symbolTableManager.addClassTypeThis(this.getIdentifier().getIdentifierName());
    const entityValues = this.getEntityValues();
    entityValues.addToSymbolTable(symbolTableManager);
  }
}
