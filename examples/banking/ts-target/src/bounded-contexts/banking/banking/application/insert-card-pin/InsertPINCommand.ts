import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { INSERT_PIN_COMMAND_NAME } from '../../contracts';
import { InsertPINRequestDTO } from '../../dtos/InsertPINRequestDTO.js';

export class InsertPINCommand extends Application.Command {
  public email: string;
  public pin: string;

  // Set static name so we can refer to them easily
  public static readonly commandName = INSERT_PIN_COMMAND_NAME;

  constructor(insertPinRequestDTO: InsertPINRequestDTO) {
    super(InsertPINCommand.commandName, contextId);
    const { email, pin } = insertPinRequestDTO;
    this.email = email;
    this.pin = pin;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(InsertPINCommand.commandName, contextId);
  }
}
