import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
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

  getPrivateMethods(): PrivateMethodDeclarationNode[] {
    const privateMethodsList = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
    if (!privateMethodsList) return [];
    const privateMethods = privateMethodsList.getPrivateMethodNodes();
    return privateMethods;
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

  public getPropsIdentifier(): string {
    const domainCreateNode = this.getDomainCreateMethod();
    const parameterNode = domainCreateNode.getParameterNode();
    const parameterType = parameterNode.getType();
    const bitloopsIdentifierNode = parameterType.getBitloopsIdentifierTypeNode();
    const propsIdentifier = bitloopsIdentifierNode.getIdentifierName();
    return propsIdentifier;
  }
}
