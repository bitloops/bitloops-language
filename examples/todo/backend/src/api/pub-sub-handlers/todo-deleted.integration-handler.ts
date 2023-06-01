
import { Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { TodoDeletedIntegrationEvent } from '@lib/bounded-contexts/todo/todo/contracts/integration-events/todo-deleted.integration-event';
import { todo } from '../../proto/generated/todo';
import { Subscriptions, Subscribers } from '../todo.grpc.controller';

export class TodoDeletedPubSubIntegrationEventHandler implements Application.IHandleIntegrationEvent {
  constructor(
    private readonly subscriptions: Subscriptions,
    private readonly subscribers: Subscribers,
  ) {}
  get event() {
    return TodoDeletedIntegrationEvent;
  }

  get boundedContext() {
    return TodoDeletedIntegrationEvent.boundedContextId;
  }

  get version() {
    return TodoDeletedIntegrationEvent.versions[0]; 
  }

  public async handle(event: TodoDeletedIntegrationEvent): Promise<Either<void, never>> {
    console.log(
      '[TodoDeletedIntegrationEvent]: Successfully received TodoDeleted PubSub IntegrationEvent',
    );
    const subscription = this.subscriptions[TodoDeletedPubSubIntegrationEventHandler.name];
    const subscriptionsSubscribers = subscription?.subscribers;
    if (subscriptionsSubscribers) {
      for (const subscriber of subscriptionsSubscribers) {
        const call = this.subscribers[subscriber]?.call;
        if (call) {
          const todoObject = new todo.Todo({
            id: event.todoId,
            userId: event.userId,
          });
          const message = new todo.OnEvent({
            onDeleted: todoObject,
          });
          call.write(message as any);
        }
      }
    }

    return ok();
  }
}

  