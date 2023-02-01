import { PINVO } from '../../domain/PINVO';
import { DomainErrors } from '../../domain/errors/index';
import { ICustomerWriteRepo } from '../../repos/interfaces/ICustomerWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { InsertPINCommand } from './InsertPINCommand';

import {
  Application,
  ok,
  fail,
  failWithPublish as failResp,
  okWithpublish as okResp,
  Either,
} from '@bitloops/bl-boilerplate-core';

type TCustomerId = {
  customerId: string;
};

type InsertPINCommandHandlerResponse = Either<
  TCustomerId,
  | ApplicationErrors.CustomerNotFound
  | DomainErrors.PINIsNotPositiveNumber
  | DomainErrors.InvalidCustomerPIN
  | DomainErrors.InvalidCustomerPIN
>;

function RespondWithPublish() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const metadata = args[0].metadata;
      const fail = failResp(metadata);
      const ok = okResp(metadata);
      console.log('testDecorator', metadata);
      // Call the original method with the correct context
      const result = (await originalMethod.apply(this, args)) as InsertPINCommandHandlerResponse;
      console.log('result is: ', result);
      console.log('result is ok', result.isOk());
      // Wrap the result in okWithPublish or failWithPublish
      if (result.isOk()) {
        return ok(result.value);
      } else {
        return fail(result.value);
      }
    };
    return descriptor;
  };
}

export class InsertPINCommandHandler
  implements Application.IUseCase<InsertPINCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private customerRepo: ICustomerWriteRepo;

  constructor(customerRepo: ICustomerWriteRepo) {
    this.customerRepo = customerRepo;
  }

  @RespondWithPublish()
  async execute(command: InsertPINCommand): Promise<InsertPINCommandHandlerResponse> {
    // const fail = failResp(command.metadata);
    // const ok = okResp(command.metadata);

    const customerEntity = await this.customerRepo.getByEmail(command.email);

    if (!customerEntity) {
      return fail(new ApplicationErrors.CustomerNotFound(command.email));
    }
    const pinProvided = PINVO.create({ pin: command.pin });

    if (pinProvided.isFail()) {
      return fail(pinProvided.value);
    }

    const validationPinRes = customerEntity.validatePIN(pinProvided.value);
    if (validationPinRes.isFail()) {
      return fail(validationPinRes.value);
    }
    return ok({ customerId: customerEntity.id.toString() });
  }
}
