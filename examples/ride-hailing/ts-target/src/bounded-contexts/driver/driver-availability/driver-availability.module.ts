
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
import { DriverAvailabilityModule as LibDriverAvailabilityModule } from '@lib/bounded-contexts/driver/driver-availability/driver-availability.module';
import { StreamingIntegrationEventHandlers } from '@lib/bounded-contexts/driver/driver-availability/application/event-handlers/integration';
import { PubSubCommandHandlers, StreamingCommandHandlers } from '@lib/bounded-contexts/driver/driver-availability/application/command-handlers';
import { QueryHandlers } from '@lib/bounded-contexts/driver/driver-availability/application/query-handlers';
import { StreamingDomainEventHandlers } from '@lib/bounded-contexts/driver/driver-availability/application/event-handlers/domain';
import {
  DriverAvailabilityWriteRepoPortToken,
  DriverAvailabilityReadRepoPortToken,
  PubSubQueryBusToken,
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingDomainEventBusToken,
  StreamingIntegrationEventBusToken,
} from '@lib/bounded-contexts/driver/driver-availability/constants';
import { MongoDriverAvailabilityReadRepository } from './repositories/mongo-driver-availability-read.repository';
import { MongoDriverAvailabilityWriteRepository } from './repositories/mongo-driver-availability-write.repository';

const providers = [
  {
    provide: DriverAvailabilityWriteRepoPortToken,
    useClass: MongoDriverAvailabilityWriteRepository,
  },
  {
    provide: DriverAvailabilityReadRepoPortToken,
    useClass: MongoDriverAvailabilityReadRepository,
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
    LibDriverAvailabilityModule.register({
      inject: [...providers],
      imports: [MongoModule],
    }),
    JetstreamModule.forFeature({
      moduleOfHandlers: DriverAvailabilityModule,
      streamingCommandHandlers: [...StreamingCommandHandlers],
      pubSubCommandHandlers: [...PubSubCommandHandlers],
      streamingDomainEventHandlers: [...StreamingDomainEventHandlers],
      streamingIntegrationEventHandlers: [...StreamingIntegrationEventHandlers],
      pubSubQueryHandlers: [...QueryHandlers],
    }),
  ],
  exports: [LibDriverAvailabilityModule],
})
export class DriverAvailabilityModule {}
