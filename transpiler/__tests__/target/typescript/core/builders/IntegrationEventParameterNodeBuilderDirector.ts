import { IntegrationEventIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventIdentifierNodeBuilder.js';
import { IntegrationEventParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventParameterNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { BoundedContextModuleNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/BoundedContextModuleNodeBuilder.js';
import { BoundedContextNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/BoundedContextNameNodeBuilder.js';
import { ModuleNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/ModuleNameNodeBuilder.js';
import { WordsWithSpacesNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/setup/WordsWithSpacesNodeBuilder.js';
import { IntegrationEventParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventParameterNode.js';
import { TIntegrationEventIdentifier } from '../../../../../src/types.js';

export class IntegrationEventParameterNodeBuilderDirector {
  private builder: IntegrationEventParameterNodeBuilder;

  constructor() {
    this.builder = new IntegrationEventParameterNodeBuilder(null);
  }

  buildIntegrationEventParameter({
    parameterName,
    integrationTypeIdentifier,
    boundedContextName,
    moduleName,
  }: {
    parameterName: string;
    integrationTypeIdentifier: TIntegrationEventIdentifier;
    boundedContextName: string;
    moduleName: string;
  }): IntegrationEventParameterNode {
    return this.builder
      .withIdentifier(
        new ParameterIdentifierNodeBuilder(null).withIdentifier(parameterName).build(),
      )
      .withIntegrationTypeIdentifier(
        new IntegrationEventIdentifierNodeBuilder().withName(integrationTypeIdentifier).build(),
      )
      .withBoundedContextModule(
        new BoundedContextModuleNodeBuilder()
          .withBoundedContext(
            new BoundedContextNameNodeBuilder()
              .withName(new WordsWithSpacesNodeBuilder().withName(boundedContextName).build())
              .build(),
          )
          .withModule(
            new ModuleNameNodeBuilder()
              .withName(new WordsWithSpacesNodeBuilder().withName(moduleName).build())
              .build(),
          )
          .build(),
      )
      .build();
  }
}
