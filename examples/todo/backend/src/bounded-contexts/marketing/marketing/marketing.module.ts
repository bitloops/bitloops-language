
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

