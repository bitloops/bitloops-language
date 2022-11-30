import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { NameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { ExpressionBuilderDirector } from './expression.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EvaluationFieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';

export class EvaluationFieldBuilderDirector {
  buildEvaluationField(name: string, expression: ExpressionNode): EvaluationFieldNode {
    const nameNode = new NameNodeBuilder().withName(name).build();

    const evaluationFieldNode = new EvaluationFieldNodeBuilder()
      .withName(nameNode)
      .withExpression(expression)
      .build();

    return evaluationFieldNode;
  }

  buildStringLiteralEvaluationField(name: string, value: string): EvaluationFieldNode {
    const stringExpression = new ExpressionBuilderDirector().buildStringLiteralExpression(value);
    return this.buildEvaluationField(name, stringExpression);
  }
}

export class EvaluationFieldListBuilerDirector {
  buildEvaluationFieldListWithOneStringField(
    fieldName: string,
    fieldValue: string,
  ): EvaluationFieldListNode {
    const nameNode = new NameNodeBuilder().withName(fieldName).build();
    const expressionNode = new ExpressionBuilderDirector().buildStringLiteralExpression(fieldValue);
    const evaluationFieldNode = new EvaluationFieldNodeBuilder()
      .withName(nameNode)
      .withExpression(expressionNode)
      .build();
    const evaluationFieldListNode = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields([evaluationFieldNode])
      .build();
    return evaluationFieldListNode;
  }

  buildEvaluationFieldListWithOneVariableField(
    fieldName: string,
    fieldValue: string,
  ): EvaluationFieldListNode {
    const nameNode = new NameNodeBuilder().withName(fieldName).build();
    const expressionNode = new ExpressionBuilderDirector().buildStringLiteralExpression(fieldValue);
    const evaluationFieldNode = new EvaluationFieldNodeBuilder()
      .withName(nameNode)
      .withExpression(expressionNode)
      .build();
    const evaluationFieldListNode = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields([evaluationFieldNode])
      .build();
    return evaluationFieldListNode;
  }
}
