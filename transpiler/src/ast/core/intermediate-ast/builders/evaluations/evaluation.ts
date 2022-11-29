import { TEvaluation, TEvaluationValues, TRegularEvaluation } from '../../../../../types.js';
import { IBuilder } from '../IBuilder.js';
import { IRegularEvaluationBuilder } from './regularEvaluation.js';

export class EvaluationBuilderDirector {
  private regularEvaluationBuilder: IRegularEvaluationBuilder;

  constructor(regularEvaluationBuilder: IRegularEvaluationBuilder) {
    this.regularEvaluationBuilder = regularEvaluationBuilder;
  }

  buildRegularVariableEvaluation(value: string): TRegularEvaluation {
    const type = 'variable';
    const evaluationRes = this.regularEvaluationBuilder.withType(type).withValue(value).build();
    return evaluationRes;
  }
}

export interface IEvaluationBuilder extends IBuilder<TEvaluation> {
  withEvaluationValues(evaluation: TEvaluationValues): IEvaluationBuilder;
}

export class EvaluationBuilder implements IEvaluationBuilder {
  private evaluation: TEvaluationValues;

  withEvaluationValues(evaluation: TEvaluationValues): IEvaluationBuilder {
    this.evaluation = evaluation;
    return this;
  }

  build(): TEvaluation {
    return {
      evaluation: this.evaluation,
    };
  }
}
