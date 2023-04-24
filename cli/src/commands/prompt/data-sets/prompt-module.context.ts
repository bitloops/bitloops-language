import { ChatCompletionRequestMessage } from 'openai';
import { promptContextMessage } from './common/system.message.js';
import { ContextInfo } from '../../../types.js';
import { getNameFromToken } from './common/names.js';
import { CONCRETIONS } from './common/concretions.js';
const MARKETING_CONSTANTS_FILE = `export const EmailServicePortToken = Symbol('EmailServicePort');
export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
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

const IAM_CONSTANTS_FILE = `export const StreamingIntegrationEventBusToken = Symbol(
  'StreamingIntegrationEventBusToken',
);
export const StreamingDomainEventBusToken = Symbol(
  'StreamingDomainEventBusToken',
);
export const UserWriteRepoPortToken = Symbol('UserWriteRepoPort');`;

const TODO_CONSTANT_FILE = `export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
export const StreamingIntegrationEventBusToken = Symbol(
  'StreamingIntegrationEventBusToken',
);
export const PubSubIntegrationEventBusToken = Symbol(
  'PubSubIntegrationEventBusToken',
);
export const StreamingDomainEventBusToken = Symbol('StreamingDomainEventBus');
export const TodoWriteRepoPortToken = Symbol('TodoWriteRepoPort');
export const TodoReadRepoPortToken = Symbol('TodoReadRepoPort');`;

const TODO_CONCRETIONS = {
  [getNameFromToken('TodoWriteRepoPortToken')]: CONCRETIONS.REPOSITORIES.MONGO,
  [getNameFromToken('TodoReadRepoPortToken')]: CONCRETIONS.REPOSITORIES.MONGO,
};

const messageInstructions = (
  contextInfo: ContextInfo,
  moduleName: string,
  constantsFile: string,
  providerImplementations: Record<string, string>,
): string => {
  return `
  The bounded context is ${contextInfo.boundedContext} and the module is ${
    contextInfo.module
  }. You use them as part of the import paths when necessary.
    I have a dynamic nestJS module called ${moduleName}, generate an infra module that will register the ${moduleName}
    and provide all needed dependencies.
    All dependency tokens are exported from the {@lib-module-path}/constants.ts file.
    This is the constants file content.
    '''typescript
    ${constantsFile}
    '''
    All buses-related concretions are imported from @bitloops/bl-boilerplate-infra-nest-jetstream.

    ${Object.entries(providerImplementations)
      .map(([providerName, implType]) => `${providerName} has type ${implType}.`)
      .join('\n')}
  `;
};
export const promptModuleMessages = (
  moduleName = 'TodoModule',
  contextInfo: ContextInfo,
  constantsFile: string = TODO_CONSTANT_FILE,
  concretions: Record<string, string> = TODO_CONCRETIONS,
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
        {
          [getNameFromToken('EmailServicePortToken')]: CONCRETIONS.MOCK,
          [getNameFromToken('UserWriteRepoPortToken')]: CONCRETIONS.REPOSITORIES.MONGO,
          [getNameFromToken('NotificationTemplateReadRepoPortToken')]:
            CONCRETIONS.REPOSITORIES.MONGO,
        },
      )}`,
    },
    {
      role: 'assistant',
      content: `
  '''typescript
import { Module } from '@nestjs/common';
import {
  NatsStreamingCommandBus,
  JetstreamModule,
  NatsStreamingDomainEventBus,
  NatsStreamingIntegrationEventBus,
  NatsPubSubIntegrationEventsBus,
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
} from '@lib/bounded-contexts/marketing/marketing/constants';
import { UserWriteRepository } from './repository/user-write.repository';
import { NotificationTemplateReadRepository } from './repository/notification-template.repository';
import { MockEmailService } from './service';

const providers = [
  {
    provide: UserWriteRepoPortToken,
    useClass: UserWriteRepository,
  },
  {
    provide: NotificationTemplateReadRepoPortToken,
    useClass: NotificationTemplateReadRepository,
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

'''
  `,
    },
    {
      role: 'user',
      content: `
        ${messageInstructions(
          { boundedContext: 'iam', module: 'authentication' },
          'AuthenticationModule',
          IAM_CONSTANTS_FILE,
          {
            [getNameFromToken('UserWriteRepoPortToken')]: CONCRETIONS.REPOSITORIES.PG,
          },
        )}
    Generate an infra module that will register the ${moduleName}
    and provide all needed dependencies
    `,
    },
    {
      role: 'assistant',
      content: `
  '''typescript
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
import { UserWritePostgresRepository } from './repository/user-write.pg.repository';

const providers = [
  {
    provide: UserWriteRepoPortToken,
    useClass: UserWritePostgresRepository,
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
  '''
      `,
    },
    {
      role: 'user',
      content: `
        ${messageInstructions(contextInfo, moduleName, constantsFile, concretions)}
    Generate an infra module that will register the ${moduleName}
    and provide all needed dependencies
    `,
    },
  ];
};
