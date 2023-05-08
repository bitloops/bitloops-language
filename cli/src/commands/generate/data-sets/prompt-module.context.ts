import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';
import { CONCRETIONS } from './common/concretions.js';
import { CodeSnippets } from './common/code-snippets.js';
const MARKETING_CONSTANTS_FILE = `
export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
export const PubSubQueryBusToken = Symbol('PubSubQueryBusToken');
export const StreamingDomainEventBusToken = Symbol('StreamingDomainEventBus');
export const StreamingIntegrationEventBusToken = Symbol(
  'StreamingIntegrationEventBusToken',
);
export const PubSubIntegrationEventBusToken = Symbol(
  'PubSubIntegrationEventBusToken',
);
export const EmailServicePortToken = Symbol('EmailServicePort');
export const UserWriteRepoPortToken = Symbol('UserWriteRepoPort');
export const NotificationTemplateReadRepoPortToken = Symbol(
  'NotificationTemplateReadRepoPort',
);`;

const MARKETING_CONCRETIONS = {
  'email.service-port.ts': CONCRETIONS.MOCK,
  'user-write.repo-port.ts': CONCRETIONS.REPOSITORIES.MONGO,
  'notification-template-read.repo-port.ts': CONCRETIONS.REPOSITORIES.MONGO,
};

const IAM_CONSTANTS_FILE = `
export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
export const PubSubQueryBusToken = Symbol('PubSubQueryBusToken');
export const StreamingIntegrationEventBusToken = Symbol(
  'StreamingIntegrationEventBusToken'
);
export const StreamingDomainEventBusToken = Symbol(
  'StreamingDomainEventBusToken'
);
export const PubSubIntegrationEventBusToken = Symbol(
  'PubSubIntegrationEventBusToken'
);
export const UserWriteRepoPortToken = Symbol('UserWriteRepoPort');`;

const IAM_CONCRETIONS = {
  'user-write.repo-port.ts': CONCRETIONS.REPOSITORIES.PG,
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

  The concretion for each service/repo port is:
  ${Object.entries(providerImplementations)
    .map(([fileName, concretionType]) => `${fileName} has type ${concretionType}.`)
    .join('\n')}

  All repositories and services are imported this way:
  ${CodeSnippets.openTypescript()}
    import { <RepoClassName> } from './repositories/<repo-name>.repository';

    import { <ServiceClassName> } from './services/<service-name>.service';
  ${CodeSnippets.closeTypescript()}
  Where <repo-name> and <service-name> are all in kebab-case. They start with the type, followed  by the name:
  For example, for <fileName> = 'user-write.repo-port.ts' and <concretionType> = 'Mongo', 
  import { MongoUserWriteRepository } from 'repositories/mongo-user-write.repository' 
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
  JetstreamModule,
  NatsPubSubQueryBus,
  NatsPubSubIntegrationEventsBus,
  NatsStreamingCommandBus,
  NatsStreamingDomainEventBus,
  NatsStreamingIntegrationEventBus,
} from '@bitloops/bl-boilerplate-infra-nest-jetstream';
import { MongoModule } from '@bitloops/bl-boilerplate-infra-mongo';
import { MarketingModule as LibMarketingModule } from '@lib/bounded-contexts/marketing/marketing/marketing.module';
import { StreamingIntegrationEventHandlers } from '@lib/bounded-contexts/marketing/marketing/application/event-handlers/integration';
import { PubSubCommandHandlers, StreamingCommandHandlers } from '@lib/bounded-contexts/marketing/marketing/application/command-handlers'; 
import { QueryHandlers } from '@lib/bounded-contexts/marketing/marketing/application/query-handlers';
import { StreamingDomainEventHandlers } from '@lib/bounded-contexts/marketing/marketing/application/event-handlers/domain';
import {
  UserWriteRepoPortToken,
  EmailServicePortToken,
  NotificationTemplateReadRepoPortToken,
  PubSubQueryBusToken,
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingDomainEventBusToken,
  StreamingIntegrationEventBusToken,
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
    provide: PubSubQueryBusToken,
    useClass: NatsPubSubQueryBus,
  },
  {
    provide: PubSubIntegrationEventBusToken,
    useClass: NatsPubSubIntegrationEventsBus,
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
      pubSubCommandHandlers: [...PubSubCommandHandlers],
      pubSubQueryHandlers: [...QueryHandlers],
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
  NatsPubSubQueryBus,
  NatsPubSubIntegrationEventsBus,
  NatsStreamingCommandBus,
  NatsStreamingDomainEventBus,
  NatsStreamingIntegrationEventBus,
} from '@bitloops/bl-boilerplate-infra-nest-jetstream';
import { MongoModule } from '@bitloops/bl-boilerplate-infra-mongo';
import { PostgresModule } from '@bitloops/bl-boilerplate-infra-postgres';
import { AuthenticationModule as LibAuthenticationModule } from '@lib/bounded-contexts/iam/authentication/authentication.module';
import { PubSubCommandHandlers, StreamingCommandHandlers } from '@lib/bounded-contexts/iam/authentication/application/command-handlers';
import { QueryHandlers } from '@lib/bounded-contexts/iam/authentication/application/query-handlers';
import { StreamingDomainEventHandlers } from '@lib/bounded-contexts/iam/authentication/application/event-handlers/domain';
import { StreamingIntegrationEventHandlers } from '@lib/bounded-contexts/iam/authentication/application/event-handlers/integration';
import {
  UserWriteRepoPortToken,
  PubSubQueryBusToken,
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingDomainEventBusToken,
  StreamingIntegrationEventBusToken,
} from '@lib/bounded-contexts/iam/authentication/constants';
import { PostgresUserWriteRepository } from './repositories/postgres-user-write.repository';

const providers = [
  {
    provide: UserWriteRepoPortToken,
    useClass: PostgresUserWriteRepository,
  },
  {
    provide: PubSubQueryBusToken,
    useClass: NatsPubSubQueryBus,
  },
  {
    provide: PubSubIntegrationEventBusToken,
    useClass: NatsPubSubIntegrationEventsBus,
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
];
@Module({
  imports: [
    LibAuthenticationModule.register({
      inject: [...providers],
      imports: [MongoModule, PostgresModule],
    }),
    JetstreamModule.forFeature({
      moduleOfHandlers: AuthenticationModule,
      streamingCommandHandlers: [...StreamingCommandHandlers],
      pubSubCommandHandlers: [...PubSubCommandHandlers],
      streamingDomainEventHandlers: [...StreamingDomainEventHandlers],
      streamingIntegrationEventHandlers: [...StreamingIntegrationEventHandlers],
      pubSubQueryHandlers: [...QueryHandlers],
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
