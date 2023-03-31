import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { SendEmailCommand } from '../commands/SendEmailCommand';
import { Inject } from '@nestjs/common';
import { EmailDomainServiceToken } from '../../constants';
import { EmailDomainService } from '../../structs/EmailDomainService';
import { EmailToSend } from '../../structs/EmailToSend';
export type SendEmailCommandHandlerResponse = Either<void, void>;
export class SendEmailCommandHandler
  implements Application.ICommandHandler<SendEmailCommand, void>
{
  constructor(
    @Inject(EmailDomainServiceToken)
    private readonly emailService: EmailDomainService,
  ) {}
  get command() {
    return SendEmailCommand;
  }
  get boundedContext(): string {
    return SendEmailCommand.boundedContextId;
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
