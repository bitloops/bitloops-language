import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { DepositMoneyRequestDTO } from '../../dtos/DepositMoneyRequestDTO';

export class DepositMoneyCommand extends Application.Command {
  public accountId: string;
  public amount: number;

  // Set static name so we can refer to them easily
  public static readonly commandName = 'DEPOSIT_MONEY_COMMAND_NAME';

  constructor(depositMoneyRequestDTO: DepositMoneyRequestDTO) {
    super(DepositMoneyCommand.commandName, contextId);
    const { accountId, amount } = depositMoneyRequestDTO;
    this.accountId = accountId;
    this.amount = amount;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(DepositMoneyCommand.commandName, contextId);
  }
}
