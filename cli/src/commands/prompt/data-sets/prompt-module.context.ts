import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';
import { getNameFromToken } from './common/names.js';
import { CONCRETIONS } from './common/concretions.js';
import { CodeSnippets } from './common/code-snippets.js';
const MARKETING_CONSTANTS_FILE = `export const EmailServicePortToken = Symbol('EmailServicePort');
export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
export const PubSubQueryBusToken = Symbol('PubSubQueryBusToken');
export const StreamingDomainEventBusToken = Symbol('StreamingDomainEventBus');
export const StreamingIntegrationEventBusToken = Symbol(
  'StreamingIntegrationEventBusToken',
);
export const PubSubIntegrationEventBusToken = Symbol(
  'PubSubIntegrationEventBusToken',
);
export const UserWriteRepoPortToken = Symbol('UserWriteRepoPort');
export const NotificationTemplateReadRepoPortToken = Symbol(
  'NotificationTemplateReadRepoPort',
);`;

const MARKETING_CONCRETIONS = {
  [getNameFromToken('EmailServicePortToken')]: CONCRETIONS.MOCK,
  [getNameFromToken('UserWriteRepoPortToken')]: CONCRETIONS.REPOSITORIES.MONGO,
  [getNameFromToken('NotificationTemplateReadRepoPortToken')]: CONCRETIONS.REPOSITORIES.MONGO,
};

const IAM_CONSTANTS_FILE = `export const StreamingIntegrationEventBusToken = Symbol(
  'StreamingIntegrationEventBusToken',
);
export const StreamingDomainEventBusToken = Symbol(
  'StreamingDomainEventBusToken',
);
export const UserWriteRepoPortToken = Symbol('UserWriteRepoPort');`;

const IAM_CONCRETIONS = {
  [getNameFromToken('UserWriteRepoPortToken')]: CONCRETIONS.REPOSITORIES.MONGO,
};

const messageInstructions = (
  contextInfo: ContextInfo,
  moduleName: string,
  constantsFile: string,
  providerImplementations: Record<string, string>,
): string => {
  return `
  I have a dynamic nestJS module called ${moduleName}, generate an infra module that will register the ${moduleName}
  and provide all needed dependencies.
  The bounded context is ${contextInfo.boundedContext} and the module is ${
    contextInfo.module
  }. You use them as part of the import paths when necessary.

  All dependency tokens are exported from the {@lib-module-path}/constants.ts file.
  This is the constants file content.
  ${CodeSnippets.openTypescript()}
  ${constantsFile}
  ${CodeSnippets.closeTypescript()}
  You should import all tokens from the constants file.

  All buses-related concretions are imported from @bitloops/bl-boilerplate-infra-nest-jetstream.

  ${Object.entries(providerImplementations)
    .map(([providerName, implType]) => `${providerName} has type ${implType}.`)
    .join('\n')}
  This is how you import repositories and services
  ${CodeSnippets.openTypescript()}
    import { <RepoClassName> } from './repositories/<repo-name-in-kebab-case>.repository';

    import { <ServiceClassName> } from './services/<service-name-in-kebab-case>.service';
  ${CodeSnippets.closeTypescript()}
  `;
};
export const promptModuleMessages = (
  moduleName: string,
  contextInfo: ContextInfo,
  constantsFile: string,
  concretions: Record<string, string>,
): ChatCompletionRequestMessage[] => {
  return [
    promptContextMessage,
    {
      role: 'user',
      content: `${messageInstructions(
        {
          boundedContext: 'marketing',
          module: 'marketing',
        },
        'MarketingModule',
        MARKETING_CONSTANTS_FILE,
        MARKETING_CONCRETIONS,
      )}`,
    },
    {
      role: 'assistant',
      content: `
 ${CodeSnippets.openTypescript()}
import { Module } from '@nestjs/common';
import {
  NatsStreamingCommandBus,
  JetstreamModule,
  NatsStreamingDomainEventBus,
  NatsStreamingIntegrationEventBus,
  NatsPubSubIntegrationEventsBus,
  NatsPubSubQueryBus,
} from '@bitloops/bl-boilerplate-infra-nest-jetstream';
import { MongoModule } from '@bitloops/bl-boilerplate-infra-mongo';
import { MarketingModule as LibMarketingModule } from '@lib/bounded-contexts/marketing/marketing/marketing.module';
import { StreamingIntegrationEventHandlers } from '@lib/bounded-contexts/marketing/marketing/application/event-handlers/integration';
import { StreamingCommandHandlers } from '@lib/bounded-contexts/marketing/marketing/application/command-handlers';
import { StreamingDomainEventHandlers } from '@lib/bounded-contexts/marketing/marketing/application/event-handlers/domain';
import {
  EmailServicePortToken,
  NotificationTemplateReadRepoPortToken,
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingDomainEventBusToken,
  StreamingIntegrationEventBusToken,
  UserWriteRepoPortToken,
  PubSubQueryBusToken,
} from '@lib/bounded-contexts/marketing/marketing/constants';
import { MongoUserWriteRepository } from './repositories/mongo-user-write.repository';
import { MongoNotificationTemplateReadRepository } from './repositories/mongo-notification-template-read.repository';
import { MockEmailService } from './services/mock-email.service';

const providers = [
  {
    provide: UserWriteRepoPortToken,
    useClass: MongoUserWriteRepository,
  },
  {
    provide: NotificationTemplateReadRepoPortToken,
    useClass: MongoNotificationTemplateReadRepository,
  },
  {
    provide: EmailServicePortToken,
    useClass: MockEmailService,
  },
  {
    provide: StreamingCommandBusToken,
    useClass: NatsStreamingCommandBus,
  },
  {
    provide: StreamingDomainEventBusToken,
    useClass: NatsStreamingDomainEventBus,
  },
  {
    provide: StreamingIntegrationEventBusToken,
    useClass: NatsStreamingIntegrationEventBus,
  },
  {
    provide: PubSubIntegrationEventBusToken,
    useClass: NatsPubSubIntegrationEventsBus,
  },
  {
    provide: PubSubQueryBusToken,
    useClass: NatsPubSubQueryBus,
  }
];
@Module({
  imports: [
    LibMarketingModule.register({
      inject: [...providers],
      imports: [MongoModule],
    }),
    JetstreamModule.forFeature({
      moduleOfHandlers: MarketingModule,
      streamingIntegrationEventHandlers: [...StreamingIntegrationEventHandlers],
      streamingDomainEventHandlers: [...StreamingDomainEventHandlers],
      streamingCommandHandlers: [...StreamingCommandHandlers],
    }),
  ],
  exports: [LibMarketingModule],
})
export class MarketingModule {}

${CodeSnippets.closeTypescript()}
  `,
    },
    {
      role: 'user',
      content: messageInstructions(
        { boundedContext: 'iam', module: 'authentication' },
        'AuthenticationModule',
        IAM_CONSTANTS_FILE,
        IAM_CONCRETIONS,
      ),
    },
    {
      role: 'assistant',
      content: `
  ${CodeSnippets.openTypescript()}
  import { Module } from '@nestjs/common';
  import {
    JetstreamModule,
    NatsStreamingDomainEventBus,
    NatsStreamingIntegrationEventBus,
  } from '@bitloops/bl-boilerplate-infra-nest-jetstream';
  import { MongoModule } from '@bitloops/bl-boilerplate-infra-mongo';
  import { PostgresModule } from '@bitloops/bl-boilerplate-infra-postgres';
  import { AuthenticationModule as LibAuthenticationModule } from '@lib/bounded-contexts/iam/authentication/authentication.module';
import { PubSubCommandHandlers } from '@lib/bounded-contexts/iam/authentication/application/command-handlers';
import { StreamingDomainEventHandlers } from '@lib/bounded-contexts/iam/authentication/application/event-handlers/domain';
import {
  StreamingDomainEventBusToken,
  StreamingIntegrationEventBusToken,
  UserWriteRepoPortToken,
} from '@lib/bounded-contexts/iam/authentication/constants';
import { PostgresUserWriteRepository } from './repositories/postgres-user-write.repository';

const providers = [
  {
    provide: UserWriteRepoPortToken,
    useClass: PostgresUserWriteRepository,
  },
  {
    provide: StreamingIntegrationEventBusToken,
    useClass: NatsStreamingIntegrationEventBus,
  },
  {
    provide: StreamingDomainEventBusToken,
    useClass: NatsStreamingDomainEventBus,
  },
];
@Module({
  imports: [
    LibAuthenticationModule.register({
      inject: [...providers],
      imports: [MongoModule, PostgresModule],
    }),
    JetstreamModule.forFeature({
      moduleOfHandlers: AuthenticationModule,
      pubSubCommandHandlers: [...PubSubCommandHandlers],
      streamingDomainEventHandlers: [...StreamingDomainEventHandlers],
    }),
  ],
  exports: [LibAuthenticationModule],
})
export class AuthenticationModule {}
${CodeSnippets.closeTypescript()}
      `,
    },
    {
      role: 'user',
      content: `
        ${messageInstructions(contextInfo, moduleName, constantsFile, concretions)}
    `,
    },
  ];
};
