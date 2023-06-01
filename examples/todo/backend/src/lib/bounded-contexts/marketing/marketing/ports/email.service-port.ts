import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { SendEmailRequest } from '../structs/send-email-request.struct';
export interface EmailServicePort {
  send(
    email: SendEmailRequest
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
