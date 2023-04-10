import { Application, ok, RespondWithPublish, Either } from '@bitloops/bl-boilerplate-core';
import { IEmailService } from '../../services/interfaces/IEmailService';
import { SendEmailCommand } from './SendEmailCommand';

type SendEmailCommandHandlerResponse = Either<void, void>;

export class SendEmailCommandHandler
  implements Application.IUseCase<SendEmailCommand, Promise<SendEmailCommandHandlerResponse>>
{
  constructor(private emailService: IEmailService) {
    this.emailService = emailService;
  }

  @RespondWithPublish()
  async execute(command: SendEmailCommand): Promise<SendEmailCommandHandlerResponse> {
    await this.emailService.send({
      origin: command.origin,
      destination: command.destination,
      content: command.content,
    });
    console.log(`Successfully executed SendEmail use case`);
    return await ok();
  }
}
