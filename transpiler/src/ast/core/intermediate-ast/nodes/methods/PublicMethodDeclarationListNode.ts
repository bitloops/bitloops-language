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

  public getPublicMethodNodes(): PublicMethodDeclarationNode[] {
    return this.getChildren() as PublicMethodDeclarationNode[];
  }
}
