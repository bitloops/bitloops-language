
import { Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { TodoCompletedIntegrationEvent } from '@lib/bounded-contexts/todo/todo/contracts/integration-events/todo-completed.integration-event';
import { todo } from '../../proto/generated/todo';
import { Subscriptions, Subscribers } from '../todo.grpc.controller';

export class TodoCompletedPubSubIntegrationEventHandler implements Application.IHandleIntegrationEvent {
  constructor(
    private readonly subscriptions: Subscriptions,
    private readonly subscribers: Subscribers,
  ) {}
  get event() {
    return TodoCompletedIntegrationEvent;
  }

  get boundedContext() {
    return TodoCompletedIntegrationEvent.boundedContextId;
  }

  get version() {
    return TodoCompletedIntegrationEvent.versions[0]; 
  }

  public async handle(event: TodoCompletedIntegrationEvent): Promise<Either<void, never>> {
    console.log(
      '[TodoCompletedIntegrationEvent]: Successfully received TodoCompleted PubSub IntegrationEvent',
    );
    const { payload } = event;

    const { userId } = payload;
    const subscription = this.subscriptions[TodoCompletedPubSubIntegrationEventHandler.name];
    const subscriptionsSubscribers = subscription?.subscribers;
    if (subscriptionsSubscribers) {
      for (const subscriber of subscriptionsSubscribers) {
        const call = this.subscribers[subscriber]?.call;
        if (call) {
          const todoObject = new todo.Todo({
            id: payload.todoId,
            userId: payload.userId,
            completed: true,
          });
          const message = new todo.OnEvent({
            onCompleted: todoObject,
          });
          call.write(message as any);
        }
      }
    }

    return ok();
  }
}

  