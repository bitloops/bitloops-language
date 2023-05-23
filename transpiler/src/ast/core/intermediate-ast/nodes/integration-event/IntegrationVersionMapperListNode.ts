import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { IntegrationVersionMapperNode } from './IntegrationVersionMapperNode.js';

export class IntegrationVersionMapperListNode extends IntermediateASTNode {
  private static classNodeName = 'integrationVersionMappers';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationVersionMappers,
      metadata,
      IntegrationVersionMapperListNode.classNodeName,
    );
  }

  public getIntegrationVersionMapperNodes(): IntegrationVersionMapperNode[] {
    return this.getChildrenNodesByType<IntegrationVersionMapperNode>(
      BitloopsTypesMapping.TIntegrationVersionMapper,
    );
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    this.getIntegrationVersionMapperNodes().forEach((mapperNode) => {
      mapperNode.addToSymbolTable(symbolTableManager);
    });
  }
}
