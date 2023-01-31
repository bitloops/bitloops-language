import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Either, Infra } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../../../../../bounded-contexts/banking/banking/domain/errors/index';
import { WithdrawMoneyCommand } from '../../../../../bounded-contexts/banking/banking/application/withdraw-money/WithdrawMoneyCommand';
import { WithdrawMoneyRequestDTO } from '../../../../../bounded-contexts/banking/banking/dtos/WithdrawMoneyRequestDTO';

type WithdrawMoneyUseCaseResponse = Either<void, DomainErrors.InvalidMonetaryValue>;

export class WithdrawMoneyRESTCommandController extends Fastify.BaseController {
  constructor(private commandBus: Infra.CommandBus.ICommandBus) {
    super();
    this.commandBus = commandBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const { amount, accountId } = request.body;
    const dto: WithdrawMoneyRequestDTO = {
      amount,
      accountId,
    };

    const command = new WithdrawMoneyCommand(dto);
    const result = (await this.commandBus.sendAndGetResponse(command, [
      DomainErrors.InvalidMonetaryValue,
    ])) as WithdrawMoneyUseCaseResponse;

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
