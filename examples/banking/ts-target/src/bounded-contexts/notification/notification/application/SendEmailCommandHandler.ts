import { SendEmailCommand } from './commands';

import { Application, okWithpublish as okResp, Either } from '@bitloops/bl-boilerplate-core';

import { IEmailService } from '../services/concretions/IEmailService';

type SendEmailCommandHandlerResponse = Either<void, void>;

export class SendEmailCommandHandler
  implements Application.IUseCase<SendEmailCommand, Promise<SendEmailCommandHandlerResponse>>
{
  constructor(private emailService: IEmailService) {
    this.emailService = emailService;
  }

  async execute(command: SendEmailCommand): Promise<SendEmailCommandHandlerResponse> {
    const ok = okResp(command.metadata);
    await this.emailService.send({
      origin: command.origin,
      destination: command.destination,
      content: command.content,
    });
    console.log(`Successfully executed SendEmail use case`);
    return await ok();
  }
}
