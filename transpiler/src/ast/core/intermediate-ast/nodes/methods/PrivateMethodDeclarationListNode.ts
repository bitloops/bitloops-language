import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { PrivateMethodDeclarationNode } from './PrivateMethodDeclarationNode.js';

export class PrivateMethodDeclarationListNode extends IntermediateASTNode {
  private static classNodeName = 'privateMethods';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPrivateMethods,
      metadata,
      PrivateMethodDeclarationListNode.classNodeName,
    );
  }

  public getPrivateMethodNodes(): PrivateMethodDeclarationNode[] {
    return this.getChildrenNodesByType<PrivateMethodDeclarationNode>(
      BitloopsTypesMapping.TPrivateMethod,
    );
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    this.getPrivateMethodNodes().forEach((method) => {
      method.addToSymbolTable(symbolTableManager);
    });
  }
}
