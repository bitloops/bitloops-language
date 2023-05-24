import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountProps } from './account.props';
import { MoneyVO } from './money.value-object';
type TAccountEntityPrimitives = {
  id: string;
  price: {
    currency: string;
    amount: number;
  };
};
export class AccountEntity extends Domain.Aggregate<AccountProps> {
  private constructor(props: AccountProps) {
    super(props, props.id);
  }
  public static create(props: AccountProps): Either<AccountEntity, never> {
    return ok(new AccountEntity(props));
  }
  get id() {
    return this._id;
  }
  get price(): MoneyVO {
    return this.props.price;
  }
  public static fromPrimitives(data: TAccountEntityPrimitives): AccountEntity {
    const AccountEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      price: MoneyVO.create({
        currency: Domain.StandardVO.Currency.Value.create({
          currencyCode: data.price.currency,
        }).value as Domain.StandardVO.Currency.Value,
        amount: data.price.amount,
      }).value as MoneyVO,
    };
    return new AccountEntity(AccountEntityProps);
  }
  public toPrimitives(): TAccountEntityPrimitives {
    return {
      id: this.id.toString(),
      price: { currency: this.props.price.currency.currencyCode, amount: this.props.price.amount },
    };
  }
}
