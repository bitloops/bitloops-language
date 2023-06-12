import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { PrivateMethodDeclarationListNode } from '../methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../methods/PublicMethodDeclarationListNode.js';
import { StatementNode } from '../statements/Statement.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { PublicMethodDeclarationNode } from '../methods/PublicMethodDeclarationNode.js';
import { PrivateMethodDeclarationNode } from '../methods/PrivateMethodDeclarationNode.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';

export class DomainServiceNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainService;
  private static classNodeName = 'domainService';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainServiceNode.classType,
      nodeType: BitloopsTypesMapping.TDomainService,
      metadata,
      classNodeName: DomainServiceNode.classNodeName,
    });
  }
  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier) as IdentifierNode;
    return identifier;
  }

  public getStatements(): StatementNode[] {
    const publicMethodListNode = this.getChildNodeByType<PublicMethodDeclarationListNode>(
      BitloopsTypesMapping.TPublicMethods,
    );
    const privateMethodListNode = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
    const statements = [];
    if (publicMethodListNode !== null) {
      publicMethodListNode.publicMethods.forEach((method) => {
        statements.push(...method.getStatements());
      });
    }

    if (privateMethodListNode !== null) {
      privateMethodListNode.getPrivateMethodNodes().forEach((method) => {
        statements.push(...method.getStatements());
      });
    }
    return statements;
  }

  public getAllDependenciesIdentifiers(): string[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getIdentifiers();
  }

  public getReturnOkErrorTypeNodes(): ReturnOkErrorTypeNode[] {
    const publicMethodListNode = this.getChildNodeByType(
      BitloopsTypesMapping.TPublicMethods,
    ) as PublicMethodDeclarationListNode;
    const privateMethodListNode = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );

    const returnOkErrorNodes: ReturnOkErrorTypeNode[] = [];
    if (publicMethodListNode) {
      publicMethodListNode.publicMethods.forEach((method) => {
        const returnOkErrorType = method.getReturnOkErrorType();
        if (returnOkErrorType) returnOkErrorNodes.push(returnOkErrorType);
      });
    }
    if (privateMethodListNode) {
      privateMethodListNode.getPrivateMethodNodes().forEach((method) => {
        returnOkErrorNodes.push(method.getReturnOkErrorType());
      });
    }
    return returnOkErrorNodes;
  }

  public getParameters(): ParameterNode[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );

    return parameterList.getParameters();
  }

  public getParameterList(): ParameterListNode {
    return this.getChildNodeByType<ParameterListNode>(BitloopsTypesMapping.TParameterList);
  }

  public getPublicMethods(): PublicMethodDeclarationNode[] {
    const publicMethodList = this.getChildNodeByType<PublicMethodDeclarationListNode>(
      BitloopsTypesMapping.TPublicMethods,
    );

    const publicMethods = publicMethodList.publicMethods;
    return publicMethods;
  }

  public getPublicMethodList(): PublicMethodDeclarationListNode {
    return this.getChildNodeByType<PublicMethodDeclarationListNode>(
      BitloopsTypesMapping.TPublicMethods,
    );
  }

  public getPrivateMethods(): PrivateMethodDeclarationNode[] {
    const privateMethodList = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );

    const privateMethods = privateMethodList.getPrivateMethodNodes();
    return privateMethods;
  }

  public getPrivateMethodList(): PrivateMethodDeclarationListNode {
    return this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    symbolTableManager.addClassTypeThis(this.getIdentifier().getIdentifierName());
    const parameterList = this.getParameterList();
    parameterList.addClassTypeParametersToSymbolTable(symbolTableManager);

    this.registerMethods(symbolTableManager);

    const publicMethodList = this.getPublicMethodList();
    publicMethodList.addToSymbolTable(symbolTableManager);

    const privateMethodList = this.getPrivateMethodList();
    privateMethodList.addToSymbolTable(symbolTableManager);
  }

  private registerMethods(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();

    const privateMethodList = this.getPrivateMethodList();
    if (privateMethodList) {
      for (const privateMethod of privateMethodList.getPrivateMethodNodes()) {
        const methodName = privateMethod.getIdentifier();
        symbolTableManager.createSymbolTableChildScope(methodName, privateMethod);
        symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
      }
    }

    const publicMethodList = this.getPublicMethodList();
    if (publicMethodList) {
      for (const publicMethod of publicMethodList.publicMethods) {
        const methodName = publicMethod.getMethodName();
        symbolTableManager.createSymbolTableChildScope(methodName, publicMethod);
        symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
      }
    }
  }
}
