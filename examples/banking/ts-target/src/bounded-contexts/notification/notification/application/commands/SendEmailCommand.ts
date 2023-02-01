import { Application } from '@bitloops/bl-boilerplate-core';

import { SendEmailDTO } from '../../dtos';

import { CONTEXT_ID as contextId } from '../../config';

const SEND_EMAIL_COMMAND_NAME = 'SEND_EMAIL_COMMAND_NAME';

//TODO it doesn't work with private fields
export class SendEmailCommand extends Application.Command {
  public destination: string;
  public origin: string;
  public content: string;

  // Set static name so we can refer to them easily
  public static readonly commandName = SEND_EMAIL_COMMAND_NAME;

  constructor(emailData: SendEmailDTO) {
    super(SendEmailCommand.commandName, contextId);
    const { destination, origin, content } = emailData;
    this.destination = destination;
    this.origin = origin;
    this.content = content;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(SendEmailCommand.commandName, contextId);
  }
}
