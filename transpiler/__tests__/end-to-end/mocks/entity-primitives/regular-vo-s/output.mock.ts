import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountProps } from './account.props';
import { MoneyVO, TMoneyVOPrimitives } from './money.value-object';
import { AmountVO } from './amount.value-object';
export type TAccountEntityPrimitives = {
  id: string;
  price: TMoneyVOPrimitives;
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
      price: MoneyVO.fromPrimitives(data.price),
    };
    return new AccountEntity(AccountEntityProps);
  }
  public toPrimitives(): TAccountEntityPrimitives {
    return {
      id: this.id.toString(),
      price: this.price.toPrimitives(),
    };
  }
}
