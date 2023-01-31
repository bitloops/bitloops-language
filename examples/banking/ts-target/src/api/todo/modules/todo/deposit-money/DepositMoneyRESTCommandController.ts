import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Either, Infra } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../../../../../bounded-contexts/banking/banking/domain/errors/index';
import { DepositMoneyCommand } from '../../../../../bounded-contexts/banking/banking/application/deposit-money/DepositMoneyCommand';
import { DepositMoneyRequestDTO } from '../../../../../bounded-contexts/banking/banking/dtos/DepositMoneyRequestDTO';

type DepositMoneyUseCaseResponse = Either<void, DomainErrors.InvalidMonetaryValue>;

export class DepositMoneyRESTCommandController extends Fastify.BaseController {
  constructor(private commandBus: Infra.CommandBus.ICommandBus) {
    super();
    this.commandBus = commandBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const { amount, accountId } = request.body;
    const dto: DepositMoneyRequestDTO = {
      amount,
      accountId,
    };

    const command = new DepositMoneyCommand(dto);
    const result = (await this.commandBus.sendAndGetResponse(command, [
      DomainErrors.InvalidMonetaryValue,
    ])) as DepositMoneyUseCaseResponse;

    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.InvalidMonetaryValue: {
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
