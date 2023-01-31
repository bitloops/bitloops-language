import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { Domain } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../../domain/AccountEntity.js';
import { MoneyVO } from '../../domain/MoneyVO.js';

export class MongoAccountWriteRepoMapper {
  static toDomain(persistedAccount: any): AccountEntity {
    const accountProps = {
      id: new Domain.UUIDv4(persistedAccount._id) as Domain.UUIDv4,
      balance: MoneyVO.create(persistedAccount.balance).value as MoneyVO,
    };
    return AccountEntity.create(accountProps).value;
  }

  static toPersistence(account: AccountEntity): any {
    return {
      _id: account.id.toString() as unknown as Mongo.ObjectId,
      balance: account.balance.props,
    };
  }
}
