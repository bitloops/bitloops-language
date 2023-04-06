import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { PublicMethodDeclarationNode } from './PublicMethodDeclarationNode.js';

export class PublicMethodDeclarationListNode extends IntermediateASTNode {
  private static classNodeName = 'publicMethods';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPublicMethods,
      metadata,
      PublicMethodDeclarationListNode.classNodeName,
    );
  }

  get publicMethods(): PublicMethodDeclarationNode[] {
    return this.getChildrenNodesByType<PublicMethodDeclarationNode>(
      BitloopsTypesMapping.TPublicMethod,
    );
  }

  public findMethodByName(methodName: string): PublicMethodDeclarationNode | null {
    const methods = this.publicMethods;
    const method = methods.find((method) => method.getMethodName() === methodName);
    return method ?? null;
  }
}
