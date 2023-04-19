import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { DomainCreateNode } from '../Domain/DomainCreateNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../methods/PrivateMethodDeclarationListNode.js';
import { PrivateMethodDeclarationNode } from '../methods/PrivateMethodDeclarationNode.js';
import { PublicMethodDeclarationListNode } from '../methods/PublicMethodDeclarationListNode.js';
import { PublicMethodDeclarationNode } from '../methods/PublicMethodDeclarationNode.js';

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
    const publicMethods = publicMethodsList.publicMethods;
    return publicMethods;
  }

  getPrivateMethods(): PrivateMethodDeclarationNode[] {
    const privateMethodsList = this.getChildNodeByType<PrivateMethodDeclarationListNode>(
      BitloopsTypesMapping.TPrivateMethods,
    );
    const privateMethods = privateMethodsList.getPrivateMethodNodes();
    return privateMethods;
  }
}
