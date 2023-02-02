import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { SendEmailVerificationCommand } from './SendEmailVerificationCommand';
import { RespondWithPublish } from '@bitloops/bl-boilerplate-core';
import { IEmailService } from '../../services/concretions/IEmailService';

type SendEmailVerificationCommandHandlerResponse = Either<void, never>;

export class SendEmailVerificationCommandHandler
  implements
    Application.IUseCase<
      SendEmailVerificationCommand,
      Promise<SendEmailVerificationCommandHandlerResponse>
    >
{
  constructor(private emailService: IEmailService) {}

  @RespondWithPublish()
  async execute(
    command: SendEmailVerificationCommand,
  ): Promise<SendEmailVerificationCommandHandlerResponse> {
    const content = 'This is a verification message!';
    const params = {
      origin: 'origin@email.com',
      destination: command.email,
      content,
    };
    await this.emailService.send(params);

    return ok();
  }
}
