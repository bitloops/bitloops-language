import { PINVO } from '../../domain/PINVO';
import { DomainErrors } from '../../domain/errors/index';
import { ICustomerWriteRepo } from '../../repos/interfaces/ICustomerWriteRepo';
import { ApplicationErrors } from '../errors/index';
import { InsertPINCommand } from './InsertPINCommand';

import { Application, ok, fail, Either, RespondWithPublish } from '@bitloops/bl-boilerplate-core';

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

export class InsertPINCommandHandler
  implements Application.IUseCase<InsertPINCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private customerRepo: ICustomerWriteRepo;

  constructor(customerRepo: ICustomerWriteRepo) {
    this.customerRepo = customerRepo;
  }

  @RespondWithPublish()
  async execute(command: InsertPINCommand): Promise<InsertPINCommandHandlerResponse> {
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
