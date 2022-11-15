import {
  TExpression,
  TExpressionValues,
  TEvaluationValues,
  TEvaluation,
} from '../../../../types.js';
import { IEvaluationBuilder } from '../evaluations/evaluation.js';
import { IBuilder } from '../IBuilder.js';

export class ExpressionBuilderDirector {
  private evaluationBuilder: IEvaluationBuilder;

  constructor(evaluationBuilder: IEvaluationBuilder) {
    this.evaluationBuilder = evaluationBuilder;
  }

  buildEvaluation(evaluation: TEvaluationValues): TEvaluation {
    const evaluationRes = this.evaluationBuilder.withEvaluationValues(evaluation).build();
    return evaluationRes;
  }
}

export interface IExpressionBuilder extends IBuilder<TExpression> {
  withExpressionValues(expression: TExpressionValues): IExpressionBuilder;
}

export class ExpressionBuilder implements IExpressionBuilder {
  private expression: TExpressionValues;

  withExpressionValues(expression: TExpressionValues): IExpressionBuilder {
    this.expression = expression;
    return this;
  }

  build(): TExpression {
    return {
      expression: this.expression,
    };
  }
}
