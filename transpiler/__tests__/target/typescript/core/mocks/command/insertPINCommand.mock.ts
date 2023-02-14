import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';

type TInsertPINCommand = {
  email: string;
  pin: string;
};

export class InsertPINCommand extends Application.Command {
  public readonly email: string;
  public readonly pin: string;

  public static readonly commandName = 'INSERT_PIN_COMMAND';

  constructor(insertPINRequestDTO: TInsertPINCommand) {
    super(InsertPINCommand.commandName, contextId);
    this.email = insertPINRequestDTO.email;
    this.pin = insertPINRequestDTO.pin;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(InsertPINCommand.commandName, contextId);
  }
}
