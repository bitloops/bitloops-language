
import { Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { TodoUncompletedIntegrationEvent } from '@lib/bounded-contexts/todo/todo/contracts/integration-events/todo-uncompleted.integration-event';
import { todo } from '../../proto/generated/todo';
import { Subscriptions, Subscribers } from '../todo.grpc.controller';

export class TodoUncompletedPubSubIntegrationEventHandler implements Application.IHandleIntegrationEvent {
  constructor(
    private readonly subscriptions: Subscriptions,
    private readonly subscribers: Subscribers,
  ) {}
  get event() {
    return TodoUncompletedIntegrationEvent;
  }

  get boundedContext() {
    return TodoUncompletedIntegrationEvent.boundedContextId;
  }

  get version() {
    return TodoUncompletedIntegrationEvent.versions[0]; 
  }

  public async handle(event: TodoUncompletedIntegrationEvent): Promise<Either<void, never>> {
    console.log(
      '[TodoUncompletedIntegrationEvent]: Successfully received TodoUncompleted PubSub IntegrationEvent',
    );
    const subscription = this.subscriptions[TodoUncompletedPubSubIntegrationEventHandler.name];
    const subscriptionsSubscribers = subscription?.subscribers;
    if (subscriptionsSubscribers) {
      for (const subscriber of subscriptionsSubscribers) {
        const call = this.subscribers[subscriber]?.call;
        if (call) {
          const todoObject = new todo.Todo({
            id: event.todoId,
            completed: false,
            userId: event.userId,
          });
          const message = new todo.OnEvent({
            uncompleted: todoObject,
          });
          call.write(message as any);
        }
      }
    }

    return ok();
  }
}

  