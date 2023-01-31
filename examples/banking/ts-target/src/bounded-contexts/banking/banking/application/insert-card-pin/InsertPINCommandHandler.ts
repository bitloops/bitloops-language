import { PINVO } from '../../domain/PINVO';
import { DomainErrors } from '../../domain/errors/index';
import { ICustomerWriteRepo } from '../../repos/interfaces/ICustomerWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { InsertPINCommand } from './InsertPINCommand';

import {
  Application,
  failWithPublish as failResp,
  okWithpublish as okResp,
  Either,
} from '@bitloops/bl-boilerplate-core';

type InsertPINCommandHandlerResponse = Either<
  void,
  | ApplicationErrors.CustomerNotFound
  | DomainErrors.PINIsNotPositiveNumber
  | DomainErrors.InvalidCustomerPIN
  | DomainErrors.InvalidCustomerPIN
>;

export class InsertPINCommandHandler
  implements Application.IUseCase<InsertPINCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private customerRepo: ICustomerWriteRepo;

  constructor(customerRepo: ICustomerWriteRepo) {
    this.customerRepo = customerRepo;
  }

  async execute(command: InsertPINCommand): Promise<InsertPINCommandHandlerResponse> {
    const fail = failResp(command.metadata);
    const ok = okResp(command.metadata);

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
    //TODO return customerID
    return ok();
  }
}
