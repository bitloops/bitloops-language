import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountCreated } from './events/AccountCreated';

export interface AccountProps {
  id?: Domain.UUIDv4;
  deposits: number; // TODO make read model
}

export class AccountEntity extends Domain.Aggregate<AccountProps> {
  private constructor(props: AccountProps) {
    super(props, props.id);
  }

  public static create(props: AccountProps): Either<AccountEntity, never> {
    const account = new AccountEntity(props);
    const isNew = !props.id;
    if (isNew) {
      account.addDomainEvent(new AccountCreated(account));
    }
    return ok(account);
  }

  get id() {
    return this._id;
  }

  get deposits() {
    return this.props.deposits;
  }

  public incrementDeposits(): Either<void, never> {
    this.props.deposits++;
    return ok();
  }
}
