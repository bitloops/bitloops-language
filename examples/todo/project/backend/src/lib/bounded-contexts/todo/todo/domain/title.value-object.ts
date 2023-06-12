import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { TitleProps } from './title.props';
import { DomainErrors } from './errors/index';
import { DomainRules } from './rules/index';
export type TTitleVOPrimitives = {
  title: string;
};
export class TitleVO extends Domain.ValueObject<TitleProps> {
  private constructor(props: TitleProps) {
    super(props);
  }
  public static create(
    props: TitleProps
  ): Either<TitleVO, DomainErrors.TitleOutOfBoundsError> {
    const res = Domain.applyRules([
      new DomainRules.TitleOutOfBoundsRule(props.title),
    ]);
    if (res) return fail(res);
    return ok(new TitleVO(props));
  }
  get title(): string {
    return this.props.title;
  }
  public static fromPrimitives(data: TTitleVOPrimitives): TitleVO {
    const TitleVOProps = { title: data.title };
    return new TitleVO(TitleVOProps);
  }
  public toPrimitives(): TTitleVOPrimitives {
    return {
      title: this.title,
    };
  }
}
