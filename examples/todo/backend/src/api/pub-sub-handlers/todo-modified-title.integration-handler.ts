
import { Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { TodoModifiedTitleIntegrationEvent } from '@lib/bounded-contexts/todo/todo/contracts/integration-events/todo-modified-title.integration-event';
import { todo } from '../../proto/generated/todo';
import { Subscriptions, Subscribers } from '../todo.grpc.controller';

export class TodoModifiedTitlePubSubIntegrationEventHandler implements Application.IHandleIntegrationEvent {
  constructor(
    private readonly subscriptions: Subscriptions,
    private readonly subscribers: Subscribers,
  ) {}
  get event() {
    return TodoModifiedTitleIntegrationEvent;
  }

  get boundedContext() {
    return TodoModifiedTitleIntegrationEvent.boundedContextId;
  }

  get version() {
    return TodoModifiedTitleIntegrationEvent.versions[0]; 
  }

  public async handle(event: TodoModifiedTitleIntegrationEvent): Promise<Either<void, never>> {
    console.log(
      '[TodoModifiedTitleIntegrationEvent]: Successfully received TodoModifiedTitle PubSub IntegrationEvent',
    );
    const subscription = this.subscriptions[TodoModifiedTitlePubSubIntegrationEventHandler.name];
    const subscriptionsSubscribers = subscription?.subscribers;
    if (subscriptionsSubscribers) {
      for (const subscriber of subscriptionsSubscribers) {
        const call = this.subscribers[subscriber]?.call;
        if (call) {
          const todoObject = new todo.Todo({
            id: event.todoId,
            title: event.title,
            userId: event.userId,
            completed: false,
          });
          const message = new todo.OnEvent({
            modifiedTitle: todoObject,
          });
          call.write(message as any);
        }
      }
    }

    return ok();
  }
}

  