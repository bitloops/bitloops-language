import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { WITHDRAW_MONEY_COMMAND_NAME } from '../../contracts';
import { WithdrawMoneyRequestDTO } from '../../dtos/WithdrawMoneyRequestDTO.js';

export class WithdrawMoneyCommand extends Application.Command {
  public accountId: string;
  public amount: number;

  // Set static name so we can refer to them easily
  public static readonly commandName = WITHDRAW_MONEY_COMMAND_NAME;

  constructor(withdrawMoneyRequestDTO: WithdrawMoneyRequestDTO) {
    super(WithdrawMoneyCommand.commandName, contextId);
    const { accountId, amount } = withdrawMoneyRequestDTO;
    this.accountId = accountId;
    this.amount = amount;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(WithdrawMoneyCommand.commandName, contextId);
  }
}
