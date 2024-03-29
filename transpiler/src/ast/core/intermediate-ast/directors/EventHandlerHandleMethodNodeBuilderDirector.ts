import { ErrorIdentifiersNodeBuilder } from '../builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { EventHandlerHandleMethodNodeBuilder } from '../builders/HandleMethodNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterNodeBuilder } from '../builders/ParameterList/ParameterNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { StatementListNodeBuilder } from '../builders/statements/StatementListNodeBuilder.js';
import { EventHandleNode } from '../nodes/EventHandleNode.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from './BitloopsPrimaryTypeNodeBuilderDirector.js';
import { ConstDeclarationNodeBuilderDirector } from './ConstDeclarationNodeBuilderDirector.js';
import { ExpressionBuilderDirector } from './expressionNodeBuilderDirector.js';

export class EventHandlerHandleMethodNodeBuilderDirector {
  private builder: EventHandlerHandleMethodNodeBuilder;
  constructor() {
    this.builder = new EventHandlerHandleMethodNodeBuilder();
  }

  public buildDomainToIntegrationEventHandleNode({
    domainEventIdentifier,
    integrationEventIdentifier,
    integrationEventEvaluationInputName,
    constIdentifierName,
    eventBusMethodCallName,
    eventBusMemberDotName,
  }: {
    domainEventIdentifier: string;
    integrationEventIdentifier: string;
    integrationEventEvaluationInputName: string;
    constIdentifierName: string;
    eventBusMethodCallName: string;
    eventBusMemberDotName: string;
  }): EventHandleNode {
    const parameterIdentifierName = integrationEventEvaluationInputName;
    const parameterIdentifierNode = new ParameterIdentifierNodeBuilder()
      .withIdentifier(parameterIdentifierName)
      .build();
    const typeNode = new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType(
      domainEventIdentifier,
    );
    const parameterNode = new ParameterNodeBuilder()
      .withType(typeNode)
      .withIdentifier(parameterIdentifierNode)
      .build();

    const constDeclarationNode =
      new ConstDeclarationNodeBuilderDirector().buildConstDeclarationIntegrationEventEvaluation({
        constIdentifierName,
        parameterIdentifierName,
        integrationEventIdentifierName: integrationEventIdentifier,
      });
    const methodCallExprNode =
      new ExpressionBuilderDirector().buildThisMethodCallWithMemberDotExpression({
        argumentIdentifierName: constIdentifierName,
        methodCallName: eventBusMethodCallName,
        memberDotName: eventBusMemberDotName,
      });
    const statementListNode = new StatementListNodeBuilder()
      .withStatements([constDeclarationNode, methodCallExprNode])
      .build();

    const returnOkTypeNode = new ReturnOkErrorTypeNodeBuilder()
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeNodeBuilderDirector().buildPrimitivePrimaryType('void'))
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();

    return this.builder
      .withParameter(parameterNode)
      .withStatementList(statementListNode)
      .withReturnType(returnOkTypeNode)
      .build();
  }
}
