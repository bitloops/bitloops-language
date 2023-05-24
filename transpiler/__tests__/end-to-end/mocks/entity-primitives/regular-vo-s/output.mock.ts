import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountProps } from './account.props';
import { AmountVO } from './amount.value-object';
import { MoneyVO } from './money.value-object';
type TAccountEntityPrimitives = {
  id: string;
  price: {
    currency: string;
    amount: {
      value: number;
    };
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
        currency: data.price.currency,
        amount: AmountVO.create({
          value: data.price.amount.value,
        }).value as AmountVO,
      }).value as MoneyVO,
    };
    return new AccountEntity(AccountEntityProps);
  }
  public toPrimitives(): TAccountEntityPrimitives {
    return {
      id: this.id.toString(),
      price: {
        currency: this.props.price.currency,
        amount: {
          value: this.props.price.amount.value,
        },
      },
    };
  }
}
