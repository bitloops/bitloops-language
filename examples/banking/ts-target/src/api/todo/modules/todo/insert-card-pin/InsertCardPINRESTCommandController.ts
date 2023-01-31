import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Either, Infra } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../../../../../bounded-contexts/banking/banking/domain/errors/index.js';
import { InsertPINCommand } from '../../../../../bounded-contexts/banking/banking/application/insert-card-pin/InsertPINCommand.js';
import { InsertPINRequestDTO } from '../../../../../bounded-contexts/banking/banking/dtos/InsertPINRequestDTO.js';

type InsertCardPinUseCaseResponse = Either<void, DomainErrors.InvalidMonetaryValue>;

export class InsertCardPINRESTCommandController extends Fastify.BaseController {
  constructor(private commandBus: Infra.CommandBus.ICommandBus) {
    super();
    this.commandBus = commandBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const { email, pin } = request.body;
    const dto: InsertPINRequestDTO = {
      email,
      pin,
    };

    const command = new InsertPINCommand(dto);
    const result = (await this.commandBus.sendAndGetResponse(command, [
      DomainErrors.InvalidMonetaryValue,
    ])) as InsertCardPinUseCaseResponse;

    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.InvalidCustomerPIN: {
          this.unauthorized(response, result.value);
          break;
        }
        case DomainErrors.PINIsNotPositiveNumber: {
          this.badRequest(response, result.value);
          break;
        }
        default:
          this.fail(response, result.value.message);
      }
    } else {
      this.created(response);
    }
  }
}
