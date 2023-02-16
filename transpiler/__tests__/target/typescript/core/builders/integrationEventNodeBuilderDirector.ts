import { IntegrationEventIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventIdentifierNodeBuilder.js';
import { IntegrationEventNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventNodeBuilder.js';
import { IntegrationVersionMapperListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationVersionMapperListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntegrationEventNode } from '../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventNode.js';
import { IntegrationVersionMapperNode } from '../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationVersionMapperNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { TBitloopsIdentifier } from '../../../../../src/types.js';
import { ParameterBuilderDirector } from './parameterDirector.js';

export class IntegrationEventNodeBuilderDirector {
  private builder: IntegrationEventNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new IntegrationEventNodeBuilder(tree);
  }

  buildIntegrationEventWithOneVersionMapper({
    integrationEventIdentifier,
    parameterName,
    parameterType,
    versionMapper,
  }: {
    integrationEventIdentifier: string;
    parameterName: string;
    parameterType: TBitloopsIdentifier;
    versionMapper: IntegrationVersionMapperNode;
  }): IntegrationEventNode {
    const identifierNode = new IntegrationEventIdentifierNodeBuilder()
      .withName(integrationEventIdentifier)
      .build();

    const parameterNode = new ParameterBuilderDirector().buildIdentifierParameter(
      parameterName,
      parameterType,
    );

    const versionMappers = new IntegrationVersionMapperListNodeBuilder()
      .withVersionMappers([versionMapper])
      .build();
    return this.builder
      .withIdentifier(identifierNode)
      .withInput(parameterNode)
      .withVersionMappers(versionMappers)
      .build();
  }

  buildIntegrationEventWithTwoVersionMappers({
    integrationEventIdentifier,
    parameterName,
    parameterType,
    versionMapper1,
    versionMapper2,
  }: {
    integrationEventIdentifier: string;
    parameterName: string;
    parameterType: TBitloopsIdentifier;
    versionMapper1: IntegrationVersionMapperNode;
    versionMapper2: IntegrationVersionMapperNode;
  }): IntegrationEventNode {
    const identifierNode = new IntegrationEventIdentifierNodeBuilder()
      .withName(integrationEventIdentifier)
      .build();

    const parameterNode = new ParameterBuilderDirector().buildIdentifierParameter(
      parameterName,
      parameterType,
    );

    const versionMappers = new IntegrationVersionMapperListNodeBuilder()
      .withVersionMappers([versionMapper1, versionMapper2])
      .build();
    return this.builder
      .withIdentifier(identifierNode)
      .withInput(parameterNode)
      .withVersionMappers(versionMappers)
      .build();
  }
}
