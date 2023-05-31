import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { SendEmailCommand } from '../../commands/send-email.command';
import { Inject } from '@nestjs/common';
import { EmailServicePortToken } from '../../constants';
import { EmailServicePort } from '../../ports/email.service-port';
export type SendEmailCommandHandlerResponse = Either<
  void,
  Application.Repo.Errors.Unexpected
>;
export class SendEmailCommandHandler
  implements Application.ICommandHandler<SendEmailCommand, void>
{
  constructor(
    @Inject(EmailServicePortToken)
    private readonly emailService: EmailServicePort
  ) {}
  get command() {
    return SendEmailCommand;
  }
  get boundedContext(): string {
    return 'marketing';
  }
  @Traceable({
    operation: 'SendEmailCommandHandler',
    metrics: {
      name: 'SendEmailCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: SendEmailCommand
  ): Promise<SendEmailCommandHandlerResponse> {
    const email = {
      origin: command.origin,
      destination: command.destination,
      content: command.content,
    };
    const emailServiceResult = await this.emailService.send(email);
    if (emailServiceResult.isFail()) {
      return fail(emailServiceResult.value);
    }
    return ok();
  }
}
