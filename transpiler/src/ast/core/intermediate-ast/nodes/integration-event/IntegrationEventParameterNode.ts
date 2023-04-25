import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterIdentifierNode } from '../ParameterList/ParameterIdentifierNode.js';
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
}
