import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Infra } from '@bitloops/bl-boilerplate-core';
import { InsertPINRequestDTO } from '../../../../bounded-contexts/banking/banking/dtos/InsertPINRequestDTO';
import {
  DomainErrors,
  ApplicationErrors,
  InsertPINCommand,
  InsertPINCommandHandlerResponse,
} from '../../../../bounded-contexts/banking/banking/contracts';

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
    const result = await this.commandBus.sendAndGetResponse<InsertPINCommandHandlerResponse>(
      command,
      [DomainErrors.InvalidMonetaryValue],
    );

    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.InvalidCustomerPIN: {
          this.unauthorized(response, result.value);
          break;
        }
        case DomainErrors.PINLength:
        case DomainErrors.PINIsNotPositiveNumber: {
          this.badRequest(response, result.value);
          break;
        }
        case ApplicationErrors.CustomerNotFound: {
          this.notFound(response, result.value);
          break;
        }
        default:
          this.fail(response, result.value.message);
      }
    } else {
      this.ok(response, result.value);
    }
  }
}
