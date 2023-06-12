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
    const publicMethodTypes: Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> = {};
    for (const publicMethod of publicMethods) {
      const publicMethodType = publicMethod.getReturnType();
      const methodName = publicMethod.getMethodName();
      publicMethodTypes[methodName] = publicMethodType;
    }
    return publicMethodTypes;
  }

  public getPrivateMethodTypes(): Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> {
    const privateMethods = this.getPrivateMethods();
    const privateMethodTypes: Record<string, BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode> = {};
    for (const privateMethod of privateMethods) {
      const privateMethodType = privateMethod.getReturnType();
      const methodName = privateMethod.getMethodName();
      privateMethodTypes[methodName] = privateMethodType;
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

    this.registerMethods(symbolTableManager);

    const privateMethodList = this.getPrivateMethodList();
    if (privateMethodList) {
      privateMethodList.addToSymbolTable(symbolTableManager);
    }

    const publicMethodList = this.getPublicMethodList();
    if (publicMethodList) {
      publicMethodList.addToSymbolTable(symbolTableManager);
    }
  }

  private registerMethods(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();

    const privateMethodList = this.getPrivateMethodList();
    if (privateMethodList) {
      for (const privateMethod of privateMethodList.getPrivateMethodNodes()) {
        const methodName = privateMethod.getIdentifier();
        console.log('private method name', methodName);
        symbolTableManager.createSymbolTableChildScope(methodName, privateMethod);
        symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
      }
    }

    const publicMethodList = this.getPublicMethodList();
    if (publicMethodList) {
      for (const publicMethod of publicMethodList.publicMethods) {
        const methodName = publicMethod.getMethodName();
        console.log('public method name', methodName);
        symbolTableManager.createSymbolTableChildScope(methodName, publicMethod);
        symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
      }
    }
  }
}
