
import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Injectable } from '@nestjs/common';
import { EmailServicePort } from '@lib/bounded-contexts/marketing/marketing/ports/email.service-port';
import { SendEmailRequest } from '@lib/bounded-contexts/marketing/marketing/structs/send-email-request.struct';

@Injectable()
export class MockEmailService implements EmailServicePort {
  send(
    email: SendEmailRequest
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    console.log('MockEmailService sending email:', email);
    return Promise.resolve(ok());
  }
}
