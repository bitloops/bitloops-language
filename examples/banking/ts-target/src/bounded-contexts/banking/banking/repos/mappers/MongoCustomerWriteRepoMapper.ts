import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { AccountIdVO } from '../../domain/AccountIdVO.js';
import { CustomerEntity } from '../../domain/CustomerEntity.js';
import { EmailVO } from '../../domain/EmailVO.js';
import { PINVO } from '../../domain/PINVO.js';
import { Domain } from '@bitloops/bl-boilerplate-core';

export class MongoCustomerWriteRepoMapper {
  static toDomain(persistedCustomer: any): CustomerEntity {
    const customerProps = {
      id: new Domain.UUIDv4(persistedCustomer._id) as Domain.UUIDv4,
      email: EmailVO.create(persistedCustomer.email).value as EmailVO,
      pin: PINVO.create(persistedCustomer.pin).value as PINVO,
      accountId: AccountIdVO.create(persistedCustomer.accountId).value as AccountIdVO,
    };
    return CustomerEntity.create(customerProps).value;
  }

  static toPersistence(customer: CustomerEntity): any {
    return {
      _id: customer.id.toString() as unknown as Mongo.ObjectId,
      email: customer.email.email,
      pin: customer.pin.pin,
      accountId: customer.accountId.toString(),
    };
  }
}
