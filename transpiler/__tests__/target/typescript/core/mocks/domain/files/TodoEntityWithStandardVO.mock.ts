import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountProps } from './AccountProps';
import { DomainErrors } from './errors/index';
import { MoneyVO } from './MoneyVO';
type TAccountEntityPrimitives = {
  id: string;
  version: string;
  money: {
    amount: number;
    currency: string;
  };
};
export class AccountEntity extends Domain.Entity<AccountProps> {
  private constructor(props: AccountProps) {
    super(props, props.id);
  }
  public static create(
    props: AccountProps,
  ): Either<AccountEntity, DomainErrors.InvalidMonetaryValueError> {
    return ok(new AccountEntity(props));
  }
  get id() {
    return this._id;
  }
  get version(): string {
    return this.props.version;
  }
  get money(): MoneyVO {
    return this.props.money;
  }
  public static fromPrimitives(data: TAccountEntityPrimitives): AccountEntity {
    const AccountEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      version: data.version,
      money: MoneyVO.create({
        amount: data.money.amount,
        currency: Domain.StandardVO.Currency.Value.create({
          currencyCode: data.money.currency,
        }).value as Domain.StandardVO.Currency.Value,
      }).value as MoneyVO,
    };
    return new AccountEntity(AccountEntityProps);
  }
  public toPrimitives(): TAccountEntityPrimitives {
    return {
      id: this.id.toString(),
      version: this.props.version,
      money: {
        amount: this.props.money.amount,
        currency: this.props.money.currency.currencyCode,
      },
    };
  }
}
