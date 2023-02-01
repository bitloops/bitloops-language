import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { INCREMENT_DEPOSITS_COMMAND_NAME } from '../../contracts';
import { IncrementDepositsDTO } from '../../dtos/IncrementDepositsDTO';

export class IncrementDepositsCommand extends Application.Command {
  public accountId: string;

  // Set static name so we can refer to them easily
  public static readonly commandName = INCREMENT_DEPOSITS_COMMAND_NAME;

  constructor(insertPinRequestDTO: IncrementDepositsDTO) {
    super(IncrementDepositsCommand.commandName, contextId);
    const { accountId } = insertPinRequestDTO;
    this.accountId = accountId;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(IncrementDepositsCommand.commandName, contextId);
  }
}
