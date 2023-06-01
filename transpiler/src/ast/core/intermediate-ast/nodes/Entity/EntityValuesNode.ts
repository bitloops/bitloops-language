import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../methods/PrivateMethodDeclarationListNode.js';
import { PrivateMethodDeclarationNode } from '../methods/PrivateMethodDeclarationNode.js';
import { PublicMethodDeclarationListNode } from '../methods/PublicMethodDeclarationListNode.js';
import { PublicMethodDeclarationNode } from '../methods/PublicMethodDeclarationNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';

export class EntityValuesNode extends IntermediateASTNode {
  private static classNodeName = 'entityValues';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEntityValues, metadata, EntityValuesNode.classNodeName);
  }

  public getDomainCreateMethod(): DomainCreateNode {
    return this.getChildNodeByType<DomainCreateNode>(BitloopsTypesMapping.TDomainCreateMethod);
  }

  public findPublicMethodByName(methodName: string): PublicMethodDeclarationNode | null {
    const publicMethods = this.getPublicMethods();
    const method = publicMethods.find((method) => method.getMethodName() === methodName);
    return method ?? null;
  }

  getPublicMethods(): PublicMethodDeclarationNode[] {
    const publicMethodsList = this.getChildNodeByType<PublicMethodDeclarationListNode>(
      BitloopsTypesMapping.TPublicMethods,
    );
    if (!publicMethodsList) return [];
    const publicMethods = publicMethodsList.publicMethods;
    return publicMethods;
  }

  getPublicMethodList(): PublicMethodDeclarationListNode | null {
    return this.getChildNodeByType<PublicMethodDeclarationListNode>(
      BitloopsTypesMapping.TPublicMethods,
    );
  }

  getPrivateMethods(): PrivateMethodDeclarationNode[] {
    const privateMethodsList = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
    if (!privateMethodsList) return [];
    const privateMethods = privateMethodsList.getPrivateMethodNodes();
    return privateMethods;
  }

  getPrivateMethodList(): PrivateMethodDeclarationListNode | null {
    return this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
  }

  public getPublicMethodTypes(): Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> {
    const publicMethods = this.getPublicMethods();
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

  public getPrivateMethodTypes(): Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> {
    const privateMethods = this.getPrivateMethods();
    let privateMethodTypes: Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> = {};
    for (const privateMethod of privateMethods) {
      const privateMethodType = privateMethod.getReturnType();
      privateMethodTypes = {
        ...privateMethodType,
        [privateMethod.getMethodName()]: privateMethodType,
      };
    }
    return privateMethodTypes;
  }

  public getPropsIdentifier(): string {
    const domainCreateNode = this.getDomainCreateMethod();
    const parameterNode = domainCreateNode.getParameterNode();
    const parameterType = parameterNode.getType();
    const bitloopsIdentifierNode = parameterType.getBitloopsIdentifierTypeNode();
    const propsIdentifier = bitloopsIdentifierNode.getIdentifierName();
    return propsIdentifier;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const domainCreate = this.getDomainCreateMethod();
    domainCreate.addToSymbolTable(symbolTableManager);

    const privateMethodList = this.getPrivateMethodList();
    if (privateMethodList) {
      privateMethodList.addToSymbolTable(symbolTableManager);
    }

    const publicMethodList = this.getPublicMethodList();
    if (publicMethodList) {
      publicMethodList.addToSymbolTable(symbolTableManager);
    }
  }
}
