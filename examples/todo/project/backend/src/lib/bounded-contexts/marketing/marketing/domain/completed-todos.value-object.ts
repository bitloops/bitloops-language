import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { CompletedTodosProps } from './completed-todos.props';
import { DomainErrors } from './errors/index';
import { DomainRules } from './rules/index';
export type TCompletedTodosVOPrimitives = {
  counter: number;
};
export class CompletedTodosVO extends Domain.ValueObject<CompletedTodosProps> {
  private constructor(props: CompletedTodosProps) {
    super(props);
  }
  public static create(
    props: CompletedTodosProps
  ): Either<CompletedTodosVO, DomainErrors.InvalidTodosCounterError> {
    const res = Domain.applyRules([
      new DomainRules.CompletedTodosIsPositiveNumberRule(props.counter),
    ]);
    if (res) return fail(res);
    return ok(new CompletedTodosVO(props));
  }
  get counter(): number {
    return this.props.counter;
  }
  public static fromPrimitives(
    data: TCompletedTodosVOPrimitives
  ): CompletedTodosVO {
    const CompletedTodosVOProps = { counter: data.counter };
    return new CompletedTodosVO(CompletedTodosVOProps);
  }
  public toPrimitives(): TCompletedTodosVOPrimitives {
    return {
      counter: this.counter,
    };
  }
}
