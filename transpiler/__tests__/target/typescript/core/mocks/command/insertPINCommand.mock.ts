import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';

type TInsertPinCommand = {
  email: string;
  pin: string;
};

export class InsertPINCommand extends Application.Command {
  public readonly email: string;
  public readonly pin: string;

  // Set static name so we can refer to them easily
  public static readonly commandName = 'INSERT_PIN_COMMAND';

  constructor(insertPinRequestDTO: TInsertPinCommand) {
    super(InsertPINCommand.commandName, contextId);
    this.email = insertPinRequestDTO.email;
    this.pin = insertPinRequestDTO.pin;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(InsertPINCommand.commandName, contextId);
  }
}

type TInsertPinCommand = {
  id: string;
};

export class InsertPinCommand extends Application.Command {
  public readonly id: string;
  public static readonly commandName = InsertPinCommand;
  constructor(InsertPinRequestDTO: InsertPinCommand) {
    super(InsertPinCommand.commandName, contextId);
    this.id = InsertPinRequestDTO.id;
  }
  static getCommandTopic(): string {
    return super.getCommandTopic(InsertPINCommand.commandName, contextId);
  }
}
