import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountStatusProps } from './account-status.props';
export type TAccountStatusVOPrimitives = {
  status: string;
};
export class AccountStatusVO extends Domain.ValueObject<AccountStatusProps> {
  private constructor(props: AccountStatusProps) {
    super(props);
  }
  public static create(
    props: AccountStatusProps
  ): Either<AccountStatusVO, never> {
    return ok(new AccountStatusVO(props));
  }
  get status(): string {
    return this.props.status;
  }
  public static fromPrimitives(
    data: TAccountStatusVOPrimitives
  ): AccountStatusVO {
    const AccountStatusVOProps = { status: data.status };
    return new AccountStatusVO(AccountStatusVOProps);
  }
  public toPrimitives(): TAccountStatusVOPrimitives {
    return {
      status: this.status,
    };
  }
}
