import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Infra } from '@bitloops/bl-boilerplate-core';
import {
  DomainErrors,
  WithdrawMoneyCommand,
  WithdrawMoneyCommandHandlerResponse,
} from '../../../../bounded-contexts/banking/banking/contracts';
import { WithdrawMoneyRequestDTO } from '../../../../bounded-contexts/banking/banking/dtos/WithdrawMoneyRequestDTO';

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
    const result = await this.commandBus.sendAndGetResponse<WithdrawMoneyCommandHandlerResponse>(
      command,
      [DomainErrors.InvalidMonetaryValue],
    );

    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.InvalidMonetaryValue: {
          this.badRequest(response, result.value);
          break;
        }
        case DomainErrors.InsufficientBalance: {
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
