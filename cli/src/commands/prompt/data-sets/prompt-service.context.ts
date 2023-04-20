import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';

const DEFAULT_PORT = `import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { SendEmailRequest } from '../structs/send-email-request.struct';

export interface EmailServicePort {
  send(
    data: SendEmailRequest,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
`;

export const promptServiceMessages: (port?: string) => ChatCompletionRequestMessage[] = (
  port = DEFAULT_PORT,
) => [
  promptContextMessage,
  {
    role: 'user',
    content: `Generate the service adapter for the following service port
  '''typescript
    import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { SendEmailRequest } from '../structs/send-email-request.struct';

export interface EmailServicePort {
  send(
    data: SendEmailRequest,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
'''
I want to use as as an email provider a mock one that just logs the email to the console.
`,
  },
  {
    role: 'assistant',
    content: `
  '''typescript
import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Injectable } from '@nestjs/common';
import { EmailServicePort } from '@src/lib/bounded-contexts/marketing/marketing/ports/email.service-port';
import { SendEmailRequest } from '@src/lib/bounded-contexts/marketing/marketing/structs/send-email-request.struct';

@Injectable()
export class MockEmailService implements EmailServicePort {
  send(
    data: SendEmailRequest,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>> {
    console.log('MockEmailService sending data:', data);
    return Promise.resolve(ok());
  }
}
'''
  `,
  },
  {
    role: 'user',
    content: `
    Generate a service adapter for the following port
    '''typescript
    ${port}
    '''
    `,
  },
];
