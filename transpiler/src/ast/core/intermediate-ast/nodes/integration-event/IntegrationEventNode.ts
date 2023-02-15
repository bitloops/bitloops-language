import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { IntegrationEventIdentifierNode } from './IntegrationEventIdentifierNode.js';

export class IntegrationEventNode extends ClassTypeNode {
  private static classType = ClassTypes.IntegrationEvent;
  private static classNodeName = 'IntegrationEvent';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: IntegrationEventNode.classType,
      nodeType: BitloopsTypesMapping.TIntegrationEvent,
      metadata,
      classNodeName: IntegrationEventNode.classNodeName,
    });
  }

  public getInputDomainEventIdentifier(): string | null {
    const parameterInput = this.getChildNodeByType<ParameterNode>(BitloopsTypesMapping.TParameter);
    if (!parameterInput) {
      throw new Error('Integration Event parameter input not found');
    }
    const type = parameterInput.getType().getChildren()[0] as BitloopsPrimaryTypeNode;

    if (type.isBitloopsIdentifierType()) {
      if (type.isDomainEventIdentifier()) {
        return type.getIdentifierName();
      }
    }
    return null;
  }

  public getIntegrationEventIdentifier(): string {
    const integrationEventIdentifier = this.getChildNodeByType<IntegrationEventIdentifierNode>(
      BitloopsTypesMapping.TIntegrationEventIdentifier,
    );
    if (!integrationEventIdentifier) {
      throw new Error('Integration Event Identifier not found');
    }

    return integrationEventIdentifier.getIdentifierName();
  }
}
