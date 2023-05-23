import { DomainEvaluationPropsNodeBuilder } from '../builders/expressions/evaluation/DomainEvaluation/DomainEvaluationPropsNodeBuilder.js';
import { EvaluationBuilder } from '../builders/expressions/evaluation/EvaluationBuilder.js';
import { IntegrationEventEvaluationNodeBuilder } from '../builders/expressions/evaluation/IntegrationEventEvaluationNodeBuilder.js';
import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { IdentifierExpressionBuilder } from '../builders/expressions/IdentifierExpressionBuilder.js';
import { IdentifierNodeBuilder } from '../builders/identifier/IdentifierBuilder.js';
import { IntegrationEventIdentifierNodeBuilder } from '../builders/integration-event/IntegrationEventIdentifierNodeBuilder.js';
import { ConstDeclarationNodeBuilder } from '../builders/statements/constDeclaration.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../nodes/statements/ConstDeclarationNode.js';

export class ConstDeclarationNodeBuilderDirector {
  private builder: ConstDeclarationNodeBuilder;
  constructor() {
    this.builder = new ConstDeclarationNodeBuilder();
  }

  public buildConstDeclarationIntegrationEventEvaluation({
    constIdentifierName,
    parameterIdentifierName,
    integrationEventIdentifierName,
  }: {
    constIdentifierName: string;
    parameterIdentifierName: string;
    integrationEventIdentifierName: string;
  }): ConstDeclarationNode {
    const constIdentifierNode = new IdentifierNodeBuilder().withName(constIdentifierName).build();
    const integrationEventIdentifierNode = new IntegrationEventIdentifierNodeBuilder()
      .withName(integrationEventIdentifierName)
      .build();

    const propsIdentifierExpression = new ExpressionBuilder()
      .withExpression(new IdentifierExpressionBuilder().withValue(parameterIdentifierName).build())
      .build();
    const props = new DomainEvaluationPropsNodeBuilder()
      .withExpression(propsIdentifierExpression)
      .build();
    const integrationEventEvaluation = new IntegrationEventEvaluationNodeBuilder()
      .withIdentifier(integrationEventIdentifierNode)
      .withPropsInput(props)
      .build();
    const evaluationNode = new EvaluationBuilder()
      .withEvaluation(integrationEventEvaluation)
      .build();
    const constDeclarationExpression = new ExpressionBuilder()
      .withExpression(evaluationNode)
      .build();
    return this.builder
      .withIdentifier(constIdentifierNode)
      .withExpression(constDeclarationExpression)
      .build();
  }

  public buildConstDeclarationWithExpression({
    constIdentifierName,
    expressionNode,
  }: {
    constIdentifierName: string;
    expressionNode: ExpressionNode;
  }): ConstDeclarationNode {
    const constIdentifierNode = new IdentifierNodeBuilder().withName(constIdentifierName).build();
    return this.builder.withIdentifier(constIdentifierNode).withExpression(expressionNode).build();
  }
}
