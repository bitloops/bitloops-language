import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ReturnOkErrorTypeNodeDirector } from '../../builders/returnOkErrorType/ReturnOkTypeNodeBuilderDirector.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { EntityIdentifierNode } from '../Entity/EntityIdentifierNode.js';
import { ExtendsRepoPortsNode } from '../extendsRepoPortNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../method-definitions/MethodDefinitionListNode.js';
import { MethodDefinitionNode } from '../method-definitions/MethodDefinitionNode.js';
import { ReadModelIdentifierNode } from '../readModel/ReadModelIdentifierNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { RepoPortIdentifierNode } from './RepoPortIdentifierNode.js';

export class RepoPortNode extends ClassTypeNode {
  private static classType = ClassTypes.RepoPort;
  private static classNodeName = 'RepoPort';
  private static CRUD_WRITE_REPO_PORT_NAME = 'CRUDWriteRepoPort';
  private static CRUD_READ_REPO_PORT_NAME = 'CRUDReadRepoPort';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RepoPortNode.classType,
      nodeType: BitloopsTypesMapping.TRepoPort,
      metadata,
      classNodeName: RepoPortNode.classNodeName,
    });
  }

  public getIdentifier(): IdentifierNode {
    return this.getChildNodeByType<RepoPortIdentifierNode>(
      BitloopsTypesMapping.TRepoPortIdentifier,
    );
  }

  public getReturnOkErrorTypeNodes(): ReturnOkErrorTypeNode[] {
    const returnOkErrorTypeNodes: ReturnOkErrorTypeNode[] = [];
    const methodDefinitionNodes = this.getMethodDefinitionNodes();
    for (const methodDefinitionNode of methodDefinitionNodes) {
      const returnOkErrorTypeNode = methodDefinitionNode.getReturnOkErrorTypeNode();
      if (!returnOkErrorTypeNode) {
        continue;
      }
      returnOkErrorTypeNodes.push(returnOkErrorTypeNode);
    }
    return returnOkErrorTypeNodes;
  }

  public getEntityIdentifier(): EntityIdentifierNode | null {
    const entityIdentifierNode = this.getChildNodeByType<EntityIdentifierNode>(
      BitloopsTypesMapping.TEntityIdentifier,
    );
    return entityIdentifierNode ?? null;
  }

  public getWriteMethodTypes(): Record<string, ReturnOkErrorTypeNode> {
    const aggregateIdentifier = this.getEntityIdentifier().getIdentifierName();
    return {
      save: new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithVoidOkAndUnexpectedError(),
      update: new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithVoidOkAndUnexpectedError(),
      delete: new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithVoidOkAndUnexpectedError(),
      getById:
        new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithIdentifierOkAndUnexpectedError(
          aggregateIdentifier,
        ),
    };
  }

  public getReadMethodTypes(): Record<string, ReturnOkErrorTypeNode> {
    const readModelIdentifier = this.getReadModelIdentifier().getIdentifierName();
    return {
      getAll:
        new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithArrayIdentifierOkAndUnexpectedError(
          readModelIdentifier,
        ),
      getById:
        new ReturnOkErrorTypeNodeDirector().buildReturnOkErrorWithIdentifierOkAndUnexpectedError(
          readModelIdentifier,
        ),
    };
  }

  public getReadModelIdentifier(): ReadModelIdentifierNode | null {
    const readModelIdentifierNode = this.getChildNodeByType<ReadModelIdentifierNode>(
      BitloopsTypesMapping.TReadModelIdentifier,
    );
    return readModelIdentifierNode ?? null;
  }

  public isReadRepoPort(): boolean {
    if (this.getReadModelIdentifier()) {
      return true;
    }
    return false;
  }

  public isWriteRepoPort(): boolean {
    if (this.getEntityIdentifier()) {
      return true;
    }
    return false;
  }

  public extendsCRUDReadRepoPort(): boolean {
    const identifierNodes = this.getExtendsRepoPortIdentifierNodes();
    for (const identifierNode of identifierNodes) {
      if (identifierNode.getIdentifierName() === RepoPortNode.CRUD_READ_REPO_PORT_NAME) {
        return true;
      }
    }
    return false;
  }

  public extendsCRUDWriteRepoPort(): boolean {
    const identifierNodes = this.getExtendsRepoPortIdentifierNodes();
    for (const identifierNode of identifierNodes) {
      if (identifierNode.getIdentifierName() === RepoPortNode.CRUD_WRITE_REPO_PORT_NAME) {
        return true;
      }
    }
    return false;
  }

  public getExtendsRepoPortIdentifierNodes(): IdentifierNode[] {
    const extendsRepoPortsNode = this.getChildNodeByType<ExtendsRepoPortsNode>(
      BitloopsTypesMapping.TExtendsRepoPorts,
    );
    if (!extendsRepoPortsNode) {
      return [];
    }
    return extendsRepoPortsNode.getIdentifiers();
  }

  public getExtendsRepoPortIdentifiersExcludingCRUDOnes(): string[] {
    const identifierNodes = this.getExtendsRepoPortIdentifierNodes();
    const identifiers: string[] = [];
    for (const identifierNode of identifierNodes) {
      if (
        identifierNode.getIdentifierName() === RepoPortNode.CRUD_WRITE_REPO_PORT_NAME ||
        identifierNode.getIdentifierName() === RepoPortNode.CRUD_READ_REPO_PORT_NAME
      ) {
        continue;
      }
      identifiers.push(identifierNode.getIdentifierName());
    }
    return identifiers;
  }

  public getMethodDefinitionNodes(): MethodDefinitionNode[] {
    const methodDefinitionListNode = this.getChildNodeByType<MethodDefinitionListNode>(
      BitloopsTypesMapping.TDefinitionMethods,
    );
    if (!methodDefinitionListNode) {
      return [];
    }
    return methodDefinitionListNode.getMethodDefinitionNodes();
  }
}
