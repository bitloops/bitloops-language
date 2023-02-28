import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { AccountCreated } from './events/AccountCreated';
import { MoneyVO } from './MoneyVO';
import { DomainErrors } from './errors/index';
import { Rules } from './rules/index';
import { MoneyDepositedToAccount } from './events/MoneyDepositedToAccount';
import { MoneyWithdrawnFromAccount } from './events/MoneyWithdrawnFromAccount';

export interface AccountProps {
  id?: Domain.UUIDv4;
  balance: MoneyVO;
  version: number;
}

type TAccountEntityPrimitives = {
  id: string;
  balance: {
    currency: string;
    amount: number;
  };
  version: number;
};

export class AccountEntity extends Domain.Aggregate<AccountProps> {
  private constructor(props: AccountProps) {
    props.version ||= 1;
    super(props, props.id);
  }

  public static create(
    props: AccountProps,
  ): Either<
    AccountEntity,
    DomainErrors.InvalidMonetaryValue | Domain.StandardVO.Currency.ErrorTypes
  > {
    const account = new AccountEntity(props);
    const isNew = !props.id;
    if (isNew) {
      account.addDomainEventClass(AccountCreated);
    }
    return ok(account);
  }

  get id() {
    return this._id;
  }

  get balance(): MoneyVO {
    return this.props.balance;
  }

  get version(): number {
    return this.props.version;
  }

  public incrementVersion(): void {
    this.props.version++;
  }

  public withdrawAmount(
    amount: number,
  ): Either<void, DomainErrors.InvalidMonetaryValue | DomainErrors.InsufficientBalance> {
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

  public depositAmount(
    amount: number,
  ): Either<void, DomainErrors.InvalidMonetaryValue | DomainErrors.InsufficientBalance> {
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

  public toPrimitives(): TAccountEntityPrimitives {
    return {
      id: this.id.toString(),
      balance: {
        currency: this.props.balance.currency.currencyCode,
        amount: this.props.balance.amount,
      },
      version: this.props.version,
    };
  }

  public static fromPrimitives(data: TAccountEntityPrimitives): AccountEntity {
    const balanceProps = {
      currency: Domain.StandardVO.Currency.Value.create({
        currencyCode: data.balance.currency,
      }).value as Domain.StandardVO.Currency.Value,
      amount: data.balance.amount,
    };

    const accountProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      balance: MoneyVO.create(balanceProps).value as MoneyVO,
      version: data.version,
    };
    return new AccountEntity(accountProps);
  }
}
