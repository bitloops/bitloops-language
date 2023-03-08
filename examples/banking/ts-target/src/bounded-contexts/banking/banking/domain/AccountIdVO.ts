import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';

interface AccountIdProps {
  id: string;
}

export class AccountIdVO extends Domain.ValueObject<AccountIdProps> {
  get id(): string {
    return this.props.id;
  }

  private constructor(props: AccountIdProps) {
    super(props);
  }

  public static create(props: AccountIdProps): Either<AccountIdVO, never> {
    return ok(new AccountIdVO(props));
  }
}
