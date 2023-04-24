import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';
import { getNameFromPort } from './common/names.js';
import { CONCRETIONS } from './common/concretions.js';

const DEFAULT_PORT = `import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { SendSMSRequest } from '../structs/send-sms-request.struct';

export interface SMSServicePort {
  send(
    data: SendSMSRequest,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
`;

const SERVICE_CONCRETION = {
  [getNameFromPort('SMSServicePort')]: CONCRETIONS.MOCK,
};

const messageInstructions = (
  contextInfo: ContextInfo,
  concretions: Record<string, string>,
): string => {
  const [serviceName, serviceConcretionType] = Object.entries(concretions);

  return ` The bounded context is ${contextInfo.boundedContext} and the module is ${contextInfo.module}. You use them as part of the import paths when necessary.
The name of the service should be ${serviceName}.
The service ${serviceName} should be of a ${serviceConcretionType} one.  
`;
};

export const promptServiceMessages = (
  port: string = DEFAULT_PORT,
  contextInfo: ContextInfo,
  concretions: Record<string, string> = SERVICE_CONCRETION,
): ChatCompletionRequestMessage[] => [
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
${messageInstructions(
  {
    boundedContext: 'marketing',
    module: 'marketing',
  },
  {
    EmailService: 'Mock',
  },
)}
`,
  },
  {
    role: 'assistant',
    content: `
  '''typescript
import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Injectable } from '@nestjs/common';
import { EmailServicePort } from '@lib/bounded-contexts/marketing/marketing/ports/email.service-port';
import { SendEmailRequest } from '@lib/bounded-contexts/marketing/marketing/structs/send-email-request.struct';

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
      ${messageInstructions(contextInfo, concretions)}
    `,
  },
];
