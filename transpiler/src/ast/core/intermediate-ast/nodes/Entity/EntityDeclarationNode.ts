import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { EntityIdentifierNode } from './EntityIdentifierNode.js';
import { EntityValuesNode } from './EntityValuesNode.js';

export class EntityDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.Entity;
  private static classNodeName = 'Entity';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: EntityDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TEntity,
      metadata,
      classNodeName: EntityDeclarationNode.classNodeName,
    });
  }

  public getDomainCreateNode(): DomainCreateNode {
    const domainCreateValuesNode = this.getEntityValues();
    return domainCreateValuesNode.getDomainCreateMethod();
  }

  public getIdentifier(): EntityIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TEntityIdentifier,
    ) as EntityIdentifierNode;
    return identifier;
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
