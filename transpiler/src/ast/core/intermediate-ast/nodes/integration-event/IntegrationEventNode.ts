import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { StructIdentifierNode } from '../struct/StructIdentifierNode.js';
import { IntegrationEventIdentifierNode } from './IntegrationEventIdentifierNode.js';
import { IntegrationVersionMapperListNode } from './IntegrationVersionMapperListNode.js';
import { IntegrationVersionMapperNode } from './IntegrationVersionMapperNode.js';

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

  public getParameter(): ParameterNode {
    return this.getChildNodeByType<ParameterNode>(BitloopsTypesMapping.TParameter);
  }

  public getIntegrationEventMapperNodes(): IntegrationVersionMapperNode[] {
    const integrationVersionMapperList = this.getChildNodeByType<IntegrationVersionMapperListNode>(
      BitloopsTypesMapping.TIntegrationVersionMappers,
    );

    return integrationVersionMapperList.getIntegrationVersionMapperNodes();
  }

  public getIntegrationEventMapperListNode(): IntegrationVersionMapperListNode {
    return this.getChildNodeByType<IntegrationVersionMapperListNode>(
      BitloopsTypesMapping.TIntegrationVersionMappers,
    );
  }

  public getIntegrationEventMapperSchemas(): Record<string, StructIdentifierNode> {
    const integrationEventMapperNodes = this.getIntegrationEventMapperNodes();
    const integrationEventMapperSchemas: Record<string, StructIdentifierNode> = {};
    integrationEventMapperNodes.forEach((integrationEventMapperNode) => {
      const version = integrationEventMapperNode.getVersionName();
      const schema = integrationEventMapperNode.getSchemaType();
      integrationEventMapperSchemas[version] = schema;
    });
    return integrationEventMapperSchemas;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const parameter = this.getParameter();
    parameter.addToSymbolTable(symbolTableManager);

    const integrationEventMapperListNode = this.getIntegrationEventMapperListNode();
    integrationEventMapperListNode.addToSymbolTable(symbolTableManager);
  }
}
