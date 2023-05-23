import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { ConstDeclarationNode } from './statements/ConstDeclarationNode.js';

export class ConstDeclarationListNode extends IntermediateASTNode {
  private static classNodeName = 'constants';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TConstDeclarationList,
      metadata,
      ConstDeclarationListNode.classNodeName,
    );
  }

  get constants(): ConstDeclarationNode[] {
    return this.getChildrenNodesByType<ConstDeclarationNode>(BitloopsTypesMapping.TPublicMethod);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    this.constants.forEach((constant) => {
      constant.addToSymbolTable(symbolTableManager);
    });
  }
}
