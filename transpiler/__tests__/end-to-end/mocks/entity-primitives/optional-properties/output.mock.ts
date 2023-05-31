import { Domain, Either, ok } from '@bitloops/bl-boilerplate-core';
import { AccountProps } from './account.props';
import { MoneyVO, TMoneyVOPrimitives } from './money.value-object';
import { RowEntity, TRowEntityPrimitives } from './row.entity';
import { AmountVO } from './amount.value-object';
export type TAccountEntityPrimitives = {
  id?: string;
  price?: TMoneyVOPrimitives;
  row?: TRowEntityPrimitives;
  rows?: TRowEntityPrimitives[];
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
  get row(): RowEntity {
    return this.props.row;
  }
  get rows(): RowEntity[] {
    return this.props.rows;
  }
  public static fromPrimitives(data: TAccountEntityPrimitives): AccountEntity {
    const AccountEntityProps = {
      id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,
      price: data.price ? MoneyVO.fromPrimitives(data.price) : undefined,
      row: data.row ? RowEntity.fromPrimitives(data.row) : undefined,
      rows: data.rows ? data.rows.map((x) => RowEntity.fromPrimitives(x)) : undefined,
    };
    return new AccountEntity(AccountEntityProps);
  }
  public toPrimitives(): TAccountEntityPrimitives {
    return {
      id: this.id.toString(),
      price: this.price?.toPrimitives(),
      row: this.row?.toPrimitives(),
      rows: this.rows?.map((x) => x.toPrimitives()),
    };
  }
}
