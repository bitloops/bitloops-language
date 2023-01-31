import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../../domain/AccountEntity';
import { MoneyVO } from '../../domain/MoneyVO';
import { CurrencyVO } from '../../domain/CurrencyVO';

export class MongoAccountWriteRepoMapper {
  static toDomain(persistedAccount: any): AccountEntity {
    const balanceProps = {
      currency: CurrencyVO.create(persistedAccount.balance.currency).value,
      amount: persistedAccount.balance.amount,
    };
    const accountProps = {
      id: new Domain.UUIDv4(persistedAccount._id) as Domain.UUIDv4,
      balance: MoneyVO.create(balanceProps).value as MoneyVO,
    };
    return AccountEntity.create(accountProps).value;
  }

  static toPersistence(account: AccountEntity): any {
    const { amount, currency } = account.balance.props;
    return {
      _id: account.id.toString() as unknown as Mongo.ObjectId,
      balance: { amount, currency: currency.code },
    };
  }
}
