import { TRegularEvaluation, TArgumentList, TParam } from '../../../../../types.js';
import { IBuilder } from '../IBuilder.js';

export interface IRegularEvaluationBuilder extends IBuilder<TRegularEvaluation> {
  withType(type: TParam): IRegularEvaluationBuilder;
  withValue(value: string): IRegularEvaluationBuilder;
  withArgumentDependencies(argumentDependencies: TArgumentList): IRegularEvaluationBuilder;
}

export class RegularEvaluationBuilder implements IRegularEvaluationBuilder {
  private type: TParam;
  private value: string;
  private argumentDependencies?: TArgumentList;

  withType(type: TParam): IRegularEvaluationBuilder {
    this.type = type;
    return this;
  }

  withValue(value: string): IRegularEvaluationBuilder {
    this.value = value;
    return this;
  }

  withArgumentDependencies(argumentDependencies: TArgumentList): IRegularEvaluationBuilder {
    this.argumentDependencies = argumentDependencies;
    return this;
  }

  build(): TRegularEvaluation {
    const regularEvaluation: TRegularEvaluation = {
      regularEvaluation: {
        type: this.type,
        value: this.value,
      },
    };
    if (this.argumentDependencies) {
      regularEvaluation.regularEvaluation.argumentDependencies = this.argumentDependencies;
    }
    return regularEvaluation;
  }
}
