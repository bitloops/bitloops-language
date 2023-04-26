import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';
import { FileNameToClassName } from './common/names.js';
import { FileNameAndConcretion, ServiceConcretion } from './common/concretions.js';
import { CodeSnippets } from './common/code-snippets.js';

const messageInstructions = (
  contextInfo: ContextInfo,
  concretions: FileNameAndConcretion,
): string => {
  const [serviceFileName, serviceConcretionType] = concretions;

  // Convert
  const className = FileNameToClassName.service(
    serviceFileName,
    serviceConcretionType as ServiceConcretion,
  );

  return ` The bounded context is ${contextInfo.boundedContext} and the module is ${contextInfo.module}. You use them as part of the import paths when necessary.
  The class name should be ${className}.
The service ${className} should be of a ${serviceConcretionType} one.  
`;
};

export const promptServiceMessages = (
  port: string,
  contextInfo: ContextInfo,
  concretions: FileNameAndConcretion,
): ChatCompletionRequestMessage[] => [
  promptContextMessage,
  {
    role: 'user',
    content: `Generate the service adapter for the following service port
  ${CodeSnippets.openTypescript()}
    import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { SendEmailRequest } from '../structs/send-email-request.struct';

export interface EmailServicePort {
  send(
    data: SendEmailRequest,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
${CodeSnippets.closeTypescript()}
${messageInstructions(
  {
    boundedContext: 'marketing',
    module: 'marketing',
  },
  ['email.service-port', 'Mock'],
)}
`,
  },
  {
    role: 'assistant',
    content: `
  ${CodeSnippets.openTypescript()}
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
${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: `
    Generate a service adapter for the following port
    ${CodeSnippets.openTypescript()}
    ${port}
    ${CodeSnippets.closeTypescript()}
      ${messageInstructions(contextInfo, concretions)}
    `,
  },
];
