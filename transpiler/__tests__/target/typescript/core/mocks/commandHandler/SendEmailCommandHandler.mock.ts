import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { EmailService } from '../../structs/EmailService';
import { SendEmailCommand } from '../commands/SendEmailCommand';
import { EmailToSend } from '../../structs/EmailToSend';
export type SendEmailCommandHandlerResponse = Either<void, void>;
export class SendEmailCommandHandler
  implements Application.ICommandHandler<SendEmailCommand, void>
{
  constructor(private emailService: EmailService) {}
  get command() {
    return SendEmailCommand;
  }
  get boundedContext(): string {
    return SendEmailCommand.boundedContext;
  }
  @Traceable({
    operation: 'SendEmailCommandHandler',
    metrics: {
      name: 'SendEmailCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(command: SendEmailCommand): Promise<SendEmailCommandHandlerResponse> {
    const emailToSend: EmailToSend = {
      origin: command.origin,
      destination: command.destination,
      content: command.content,
    };
    await this.emailService.send(emailToSend);
    return ok();
  }
}
