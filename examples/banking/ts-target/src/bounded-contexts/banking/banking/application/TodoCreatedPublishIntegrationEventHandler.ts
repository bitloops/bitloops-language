// import { Infra, Application } from '@bitloops/bl-boilerplate-core';
// import { TodoCreatedIntegrationEvent } from '../contracts';
// import { CustomerCreated } from '../domain/events/TodoCreated';

// export class TodoCreatedPublishIntegrationEventHandler implements Application.IHandle {
//   constructor(private eventBus: Infra.EventBus.IEventBus) {}

//   public async handle(event: CustomerCreated): Promise<void> {
//     const { customer: todo } = event;

//     const events = TodoCreatedIntegrationEvent.create({
//       title: todo.title.title,
//       completed: todo.completed,
//     });

//     const eventsWithTopic = events.map((event) => {
//       return { message: event, topic: event.eventTopic };
//     });

//     await this.eventBus.publishMany(eventsWithTopic);

//     console.log(
//       `[AfterTodoCreatedDomainEvent]: Successfully published TodoCreatedIntegrationEvent`,
//     );
//   }
// }
