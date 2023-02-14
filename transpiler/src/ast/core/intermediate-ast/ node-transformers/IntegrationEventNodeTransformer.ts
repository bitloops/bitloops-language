import { ArgumentListNodeBuilder } from '../builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentNodeBuilder } from '../builders/ArgumentList/ArgumentNodeBuilder.js';
import { DomainEventHandlerDeclarationNodeBuilder } from '../builders/DomainEventHandler/DomainEventHandlerDeclarationNodeBuilder.js';
import { DomainEventHandlerIdentifierNodeBuilder } from '../builders/DomainEventHandler/DomainEventHandlerIdentifierNodeBuilder.js';
import { EventHandlerBusDependenciesNodeBuilder } from '../builders/DomainEventHandler/EventHandlerBusDependenciesNodeBuilder.js';
import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../builders/expressions/IdentifierExpressionBuilder.js';
import { MethodCallExpressionNodeBuilder } from '../builders/expressions/methodCallExprBuilder.js';
import { ThisExpressionNodeBuilder } from '../builders/expressions/thisExpressionBuilder.js';
import { EventHandlerHandleMethodNodeBuilder } from '../builders/HandleMethodNodeBuilder.js';
import { IdentifierNodeBuilder } from '../builders/identifier/IdentifierBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterNodeBuilder } from '../builders/ParameterList/ParameterNodeBuilder.js';
import { ConstDeclarationNodeBuilder } from '../builders/statements/constDeclaration.js';
import { StatementListNodeBuilder } from '../builders/statements/StatementListNodeBuilder.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { DomainEventHandlerIdentifierNode } from '../nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { EventHandleNode } from '../nodes/EventHandleNode.js';
import { IntegrationEventNode } from '../nodes/integration-event/IntegrationEventNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class IntegrationEventNodeTransformer extends NodeModelToTargetASTTransformer<IntegrationEventNode> {
  run(): void {
    this.addBuiltinBusDependencies();
  }

  private addBuiltinBusDependencies(): void {
    if (this.node.hasInputDomainEventIdentifier()) {
      const domainEventIdentifier = this.node.getInputIdentifier();
      const domainToIntegrationEventIdentifierNode =
        this.buildDomainToIntegrationEventIdentifier(domainEventIdentifier);

      const eventBusDependenciesNode = new EventHandlerBusDependenciesNodeBuilder()
        .withIntegrationEventBus()
        .build();

      const eventHandleNode = this.buildEventHandleNode(domainEventIdentifier);

      const domainEventHandler = new DomainEventHandlerDeclarationNodeBuilder(this.tree)
        .withIdentifier(domainToIntegrationEventIdentifierNode)
        .withHandleMethod(eventHandleNode)
        .withEventBusDependencies(eventBusDependenciesNode)
        .build();
    }
  }

  private buildDomainToIntegrationEventIdentifier(
    domainEventIdentifier: string,
  ): DomainEventHandlerIdentifierNode {
    const domainToIntegrationEventIdentifier = `${domainEventIdentifier}ToIntegrationEventHandler`;
    const domainToIntegrationEventIdentifierNode = new DomainEventHandlerIdentifierNodeBuilder()
      .withName(domainToIntegrationEventIdentifier)
      .build();
    return domainToIntegrationEventIdentifierNode;
  }

  private buildEventHandleNode(domainEventIdentifier: string): EventHandleNode {
    const parameterIdentifierNode = new ParameterIdentifierNodeBuilder()
      .withIdentifier('event')
      .build();
    const typeNode = new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType(
      domainEventIdentifier,
    );
    const parameterNode = new ParameterNodeBuilder()
      .withType(typeNode)
      .withIdentifier(parameterIdentifierNode)
      .build();
    const constIdentifierName = 'events';
    const constIdentifierNode = new IdentifierNodeBuilder().withName(constIdentifierName).build();
    // const integrationEventEvaluation = new IntegrationEventEvaluationNodeBuilder().build();
    const constDeclarationNode = new ConstDeclarationNodeBuilder()
      .withIdentifier(constIdentifierNode)
      .withExpression(null) // TODO add integrationEventEvaluation when it's ready
      .build();
    const thisExprNode = new ExpressionBuilder()
      .withExpression(new ThisExpressionNodeBuilder().build())
      .build();

    const argumentIdentifierExpression = new ExpressionBuilder()
      .withExpression(new IdentifierExpressionBuilder().withValue(constIdentifierName).build())
      .build();
    const argumentNode = new ArgumentNodeBuilder()
      .withExpression(argumentIdentifierExpression)
      .build();
    const argumentListNode = new ArgumentListNodeBuilder().withArguments([argumentNode]).build();
    const methodCallExprNode = new ExpressionBuilder()
      .withExpression(
        new MethodCallExpressionNodeBuilder()
          .withExpression(thisExprNode)
          .withArgumentsList(argumentListNode)
          .build(),
      )
      .build();

    const statementListNode = new StatementListNodeBuilder()
      .withStatements([constDeclarationNode, methodCallExprNode])
      .build();

    return new EventHandlerHandleMethodNodeBuilder()
      .withParameter(parameterNode)
      .withStatementList(statementListNode)
      .build();
  }
}
