import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
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

  public getPublicMethodTypes(): Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> {
    const entityValues = this.getEntityValues();
    const publicMethods = entityValues.getPublicMethods();
    let publicMethodTypes: Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> = {};
    for (const publicMethod of publicMethods) {
      const publicMethodType = publicMethod.getReturnType();
      publicMethodTypes = {
        ...publicMethodTypes,
        [publicMethod.getMethodName()]: publicMethodType,
      };
    }
    return publicMethodTypes;
  }
}
