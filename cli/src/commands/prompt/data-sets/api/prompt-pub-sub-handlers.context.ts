/**
 * Real time grpc pub sub handlers
 */

import { CodeSnippets } from '../common/code-snippets.js';

const messageInstructionsPubSubHandlers = (
  protoFile: string,
  integrationEventFileContent: string,
  packageName: string,
): string => {
  if (!integrationEventFileContent) {
    throw new Error('Should be called with integration event');
  }
  return ` 
  Given this protobuf file:

  You will create a typescript class .

  You will create a handler that reacts to IntegrationEvents, and publishes grpc stream events.
  Here is the protobuf file:
  ${CodeSnippets.openProto()}
  ${protoFile}
  ${CodeSnippets.closeProto()}
  
  Given this integration event: 

  ${CodeSnippets.openTypescript()}
  ${integrationEventFileContent}
  ${CodeSnippets.closeTypescript()}

  Extract its data from the event.payload property, and map them to the respective grpc stream event defined in the protobuf file.
  We have generated typescript code from the protobuf file, which can be used as:
  import { <package-name> } from '../../proto/generated/<package-name>';

  Where package-name = ${packageName},
  
  //to be continued...
`;
};

export const promptApiGrpcControllerOnEventMethod = (
  protobuf: string,
  integrationEvents: string[],
  packageName: string,
): ChatCompletionRequestMessage[] => [
  promptContextMessage,
  {
    role: 'system',
    content: `  
      You generate a class which is an integration event handler, using Typescript language. You respond with code only.
      `,
  },
  {
    role: 'user',
    content:
      messageInstructionsOnMethod(
        PROTOBUF,
        [
          'TodoAddedIntegrationEvent',
          'TodoTitleModifiedIntegrationEvent',
          'TodoCompletedIntegrationEvent',
        ],
        'todo',
        'TodoService',
      ) +
      ` 
  You should use each rpc's response to return the response like this.
  `,
  },
  {
    role: 'assistant',
    content: `
    ${CodeSnippets.openTypescript()}
import { Application, ok, Either } from '@bitloops/bl-boilerplate-core';
import { TodoAddedIntegrationEvent } from '@src/lib/bounded-contexts/todo/todo/contracts/integration-events/todo-added.integration-event';
import { todo } from '../../proto/generated/todo';
import { Subscriptions, Subscribers } from '../todo.grpc.controller';

export class TodoAddedPubSubIntegrationEventHandler implements Application.IHandleIntegrationEvent {
  constructor(
    private readonly subscriptions: Subscriptions,
    private readonly subscribers: Subscribers,
  ) {}
  get event() {
    return TodoAddedIntegrationEvent;
  }

  get boundedContext() {
    return TodoAddedIntegrationEvent.boundedContextId;
  }

  get version() {
    return TodoAddedIntegrationEvent.versions[0]; 
  }

  public async handle(event: TodoAddedIntegrationEvent): Promise<Either<void, never>> {
    console.log(
      '[TodoAddedIntegrationEvent]: Successfully received TodoAdded PubSub IntegrationEvent',
    );
    const { payload } = event;

    const { userId } = payload;
    const subscription = this.subscriptions[TodoAddedPubSubIntegrationEventHandler.name];
    const subscriptionsSubscribers = subscription?.subscribers;
    if (subscriptionsSubscribers) {
      for (const subscriber of subscriptionsSubscribers) {
        const call = this.subscribers[subscriber]?.call;
        if (call) {
          const todoObject = new todo.Todo({
            id: payload.todoId,
            title: payload.title,
            completed: false,
          });
          const message = new todo.OnEvent({
            onAdded: todoObject,
          });
          call.write(message as any);
        }
      }
    }

    return ok();
  }
}

  ${CodeSnippets.closeTypescript()}
  `,
  },
  {
    role: 'user',
    content: messageInstructionsPubSubHandlers(protobuf, integrationEvents, packageName),
  },
];
