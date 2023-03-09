import { EventHandlerBusDependenciesNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DomainEventHandler/EventHandlerBusDependenciesNodeBuilder.js';
import { IntegrationEventHandlerDeclarationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventHandlerDeclarationNodeBuilder.js';
import { IntegrationEventHandlerHandleMethodNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventHandlerHandleMethodNodeBuilder.js';
import { IntegrationEventHandlerIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventHandlerIdentifierNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { StatementListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntegrationEventHandlerDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventParameterNode.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { StatementNode } from '../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { IntegrationEventHandlerOptions } from '../../../../../src/types.js';
import { EvaluationFieldBuilderDirector } from './evaluationFIeld.js';

export class IntegrationEventHandlerBuilderDirector {
  buildIntegrationEventHandler({
    identifier,
    parameters,
    executeParameter,
    statements,
    versionName,
  }: {
    identifier: string;
    parameters: ParameterNode[];
    executeParameter?: IntegrationEventParameterNode;
    statements: StatementNode[];
    versionName: string;
  }): IntegrationEventHandlerDeclarationNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const handleNode = new IntegrationEventHandlerHandleMethodNodeBuilder()
      .withParameter(executeParameter)
      .withStatementList(new StatementListNodeBuilder(null).withStatements(statements).build())
      .build();

    const defaultEventBusDependencies = new EventHandlerBusDependenciesNodeBuilder()
      .withCommandBus()
      .build();

    const eventVersion = new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
      IntegrationEventHandlerOptions.eventVersion,
      versionName,
    );

    return new IntegrationEventHandlerDeclarationNodeBuilder(tree)
      .withIdentifier(
        new IntegrationEventHandlerIdentifierNodeBuilder(null).withName(identifier).build(),
      )
      .withParameterList(new ParameterListNodeBuilder(null).withParameters(parameters).build())
      .withHandleMethod(handleNode)
      .withEventBusDependencies(defaultEventBusDependencies)
      .withEventVersion(eventVersion)
      .build();
  }
}
