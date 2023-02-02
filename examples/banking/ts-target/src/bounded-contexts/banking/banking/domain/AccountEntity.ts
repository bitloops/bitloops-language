import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { AccountCreated } from './events/AccountCreated';
import { MoneyVO } from './MoneyVO';
import { DomainErrors } from './errors/index';
import { Rules } from './rules/index';
import { MoneyDepositedToAccount } from './events/MoneyDepositedToAccount';
import { MoneyWithdrawnFromAccount } from './events/MoneyWithdrawnFromAccount';
import { CurrencyVO } from './CurrencyVO';

export interface AccountProps {
  id?: Domain.UUIDv4;
  balance: MoneyVO;
}

type TAccountEntitySnapshot = {
  id: string;
  balance: {
    currency: string;
    amount: number;
  };
};

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

  get balance(): MoneyVO {
    return this.props.balance;
  }

  public withdrawAmount(amount: number): Either<void, DomainErrors.InvalidMonetaryValue> {
    const amountToBeWithdrawn = MoneyVO.create({
      amount,
      currency: this.props.balance.currency,
    });
    if (amountToBeWithdrawn.isFail()) {
      return fail(amountToBeWithdrawn.value);
    }
    const finalAmount = this.props.balance.amount - amount;
    const res = Domain.applyRules([
      new Rules.AccountCannotHaveNegativeBalance(finalAmount, this.props.balance.amount),
    ]);
    if (res) return fail(res);
    const balanceVO = MoneyVO.create({
      amount: finalAmount,
      currency: this.props.balance.currency,
    });
    if (balanceVO.isFail()) {
      return fail(balanceVO.value);
    }
    this.props.balance = balanceVO.value;
    this.addDomainEvent(new MoneyWithdrawnFromAccount(this));
    return ok();
  }

  public depositAmount(amount: number): Either<void, DomainErrors.InvalidMonetaryValue> {
    const amountToBeAdded = MoneyVO.create({
      amount,
      currency: this.props.balance.currency,
    });

    if (amountToBeAdded.isFail()) {
      return fail(amountToBeAdded.value);
    }

    const updatedAmount = this.props.balance.amount + amount;
    const balanceVO = MoneyVO.create({
      amount: updatedAmount,
      currency: this.props.balance.currency,
    });
    if (balanceVO.isFail()) {
      return fail(balanceVO.value);
    }
    this.props.balance = balanceVO.value;
    this.addDomainEvent(new MoneyDepositedToAccount(this));
    return ok();
  }

  public toPrimitives(): TAccountEntitySnapshot {
    return {
      id: this.id.toString(),
      balance: {
        currency: this.props.balance.currency.code,
        amount: this.props.balance.amount,
      },
    };
  }

  public static fromPrimitives(data: TAccountEntitySnapshot): AccountEntity {
    const balanceProps = {
      currency: CurrencyVO.create({ code: data.balance.currency }).value,
      amount: data.balance.amount,
    };
    const accountProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      balance: MoneyVO.create(balanceProps).value as MoneyVO,
    };
    return new AccountEntity(accountProps);
  }
}
