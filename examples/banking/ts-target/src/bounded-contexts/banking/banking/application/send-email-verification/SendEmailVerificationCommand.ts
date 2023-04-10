import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { SendEmailVerificationDTO } from '../../dtos/SendEmailVerificationDTO.js';

export class SendEmailVerificationCommand extends Application.Command {
  public email: string;
  private accountId: string;

  public static readonly commandName = 'SEND_EMAIL_VERIFICATION_COMMAND_NAME';

  constructor(sendEmailVerificationRequestDTO: SendEmailVerificationDTO) {
    super(SendEmailVerificationCommand.commandName, contextId);
    const { email, accountId } = sendEmailVerificationRequestDTO;
    this.email = email;
    this.accountId = accountId;
  }

  static getCommandTopic(): string {
    return super.getCommandTopic(SendEmailVerificationCommand.commandName, contextId);
  }
}
