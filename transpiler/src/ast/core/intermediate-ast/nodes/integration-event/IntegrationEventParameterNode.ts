import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntegrationEventParameterSymbolEntry } from '../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterIdentifierNode } from '../ParameterList/ParameterIdentifierNode.js';
import { BoundedContextModuleNode } from '../setup/BoundedContextModuleNode.js';
import { IntegrationEventHandlerDeclarationNode } from './IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventIdentifierNode } from './IntegrationEventIdentifierNode.js';

export class IntegrationEventParameterNode extends IntermediateASTNode {
  private static classNodeName = 'integrationEventParameter';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventParameter,
      metadata,
      IntegrationEventParameterNode.classNodeName,
    );
  }

  getIdentifier(): string {
    const paramIdentifierNode = this.getChildNodeByType<ParameterIdentifierNode>(
      BitloopsTypesMapping.TParameterDependencyIdentifier,
    );
    return paramIdentifierNode.getIdentifier();
  }

  getType(): IntegrationEventIdentifierNode {
    return this.getChildNodeByType<IntegrationEventIdentifierNode>(
      BitloopsTypesMapping.TIntegrationEventIdentifier,
    );
  }

  getIntegrationEventIdentifier(): string {
    return this.getType().getValue().integrationEventIdentifier;
  }

  getBoundedContextModule(): BoundedContextModuleNode {
    return this.getChildNodeByType<BoundedContextModuleNode>(
      BitloopsTypesMapping.TBoundedContextModule,
    );
  }

  getEventVersionValue(): string {
    const integrationEventHandlerDeclarationNode =
      this.getFirstParentNodeByType<IntegrationEventHandlerDeclarationNode>(
        BitloopsTypesMapping.TIntegrationEventHandler,
      );
    return integrationEventHandlerDeclarationNode.getEventVersionValue();
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const paramName = this.getIdentifier();
    const boundedContextModuleNode = this.getBoundedContextModule();
    const eventVersion = this.getEventVersionValue();
    symbolTable.insert(
      paramName,
      new IntegrationEventParameterSymbolEntry(this.getIntegrationEventIdentifier(), {
        boundedContext: boundedContextModuleNode.getBoundedContext().getName(),
        module: boundedContextModuleNode.getModule().getName(),
        eventVersion,
      }),
    );
  }
}
