
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
import { TodoModule as LibTodoModule } from '@lib/bounded-contexts/todo/todo/todo.module';
import { StreamingIntegrationEventHandlers } from '@lib/bounded-contexts/todo/todo/application/event-handlers/integration';
import { PubSubCommandHandlers, StreamingCommandHandlers } from '@lib/bounded-contexts/todo/todo/application/command-handlers';
import { QueryHandlers } from '@lib/bounded-contexts/todo/todo/application/query-handlers';
import { StreamingDomainEventHandlers } from '@lib/bounded-contexts/todo/todo/application/event-handlers/domain';
import {
  TodoWriteRepoPortToken,
  TodoReadRepoPortToken,
  PubSubQueryBusToken,
  PubSubIntegrationEventBusToken,
  StreamingCommandBusToken,
  StreamingDomainEventBusToken,
  StreamingIntegrationEventBusToken,
} from '@lib/bounded-contexts/todo/todo/constants';
import { MongoTodoWriteRepository } from './repositories/mongo-todo-write.repository';
import { MongoTodoReadRepository } from './repositories/mongo-todo-read.repository';

const providers = [
  {
    provide: TodoWriteRepoPortToken,
    useClass: MongoTodoWriteRepository,
  },
  {
    provide: TodoReadRepoPortToken,
    useClass: MongoTodoReadRepository,
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
    LibTodoModule.register({
      inject: [...providers],
      imports: [MongoModule],
    }),
    JetstreamModule.forFeature({
      moduleOfHandlers: TodoModule,
      streamingCommandHandlers: [...StreamingCommandHandlers],
      pubSubCommandHandlers: [...PubSubCommandHandlers],
      streamingDomainEventHandlers: [...StreamingDomainEventHandlers],
      streamingIntegrationEventHandlers: [...StreamingIntegrationEventHandlers],
      pubSubQueryHandlers: [...QueryHandlers],
    }),
  ],
  exports: [LibTodoModule],
})
export class TodoModule {}
