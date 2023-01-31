import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountCreated } from './events/AccountCreated';
import { MoneyVO } from './MoneyVO';
import { DomainErrors } from './errors/index.js';

export interface AccountProps {
  id?: Domain.UUIDv4;
  balance: MoneyVO;
}

export class AccountEntity extends Domain.Aggregate<AccountProps> {
  private constructor(props: AccountProps) {
    super(props, props.id);
  }

  public static create(props: AccountProps): Either<AccountEntity, never> {
    const todo = new AccountEntity(props);
    const isNew = !props.id;
    if (isNew) {
      todo.addDomainEvent(new AccountCreated(todo));
    }
    return ok(todo);
  }

  get id() {
    return this._id;
  }

  get balance(): MoneyVO {
    return this.props.balance;
  }

  public updateBalance(balance: MoneyVO): Either<void, never> {
    this.props.balance = balance;
    return ok();
  }

  public addToBalanceAmount(amount: number): Either<void, DomainErrors.InvalidMonetaryValue> {
    const updatedAmount = this.props.balance.amount + amount;
    const balanceVO = MoneyVO.create({
      amount: updatedAmount,
      currency: this.props.balance.currency,
    });
    if (balanceVO.isFail()) {
      return fail(balanceVO.value);
    }
    this.props.balance = balanceVO.value;
    return ok();
  }
}
