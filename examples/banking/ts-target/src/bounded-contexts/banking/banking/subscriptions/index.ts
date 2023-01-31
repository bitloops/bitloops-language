// import { Container } from '@bitloops/bl-boilerplate-core';
// import { GetAllTodosQuery } from '../application/get-all/GetAllTodosQuery';
// import { TodoCreatedPublishIntegrationEventHandler } from '../application/TodoCreatedPublishIntegrationEventHandler';
// import { CONTEXT_ID } from '../config';
// import { createTodoCommandHandler, getAllTodosQueryHandler } from '../DI';
// import { CustomerCreated } from '../domain/events/TodoCreated';
// import { InsertPINCommand } from '../application/insert-card-pin/index.js';

export const setUpTodoSubscriptions = async () => {
  // // TODO maybe register use case instead of execute method
  // console.log('CreateUserCommand.getCommandTopic()', InsertPINCommand.getCommandTopic());
  // const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
  // await commandBus.register(
  //   InsertPINCommand.getCommandTopic(),
  //   createTodoCommandHandler.execute.bind(createTodoCommandHandler),
  // );
  // const queryBus = Container.getQueryBusFromContext(CONTEXT_ID);
  // await queryBus.register(
  //   GetAllTodosQuery.getQueryTopic(),
  //   getAllTodosQueryHandler.execute.bind(getAllTodosQueryHandler),
  // );
  // // Domain events subscriptions
  // const domainEventBus = Container.getEventBusFromContext(CONTEXT_ID);
  // // Possible we need the external domain event bus here for integration events, different from domain events one
  // const integrationEventBus = Container.getIntegrationEventBusFromContext(CONTEXT_ID);
  // const todoCreatedPublishIntegrationEventHandler = new TodoCreatedPublishIntegrationEventHandler(
  //   integrationEventBus,
  // );
  // await domainEventBus.subscribe<CustomerCreated>(CustomerCreated.getEventTopic(), (event) => {
  //   todoCreatedPublishIntegrationEventHandler.handle(event);
  // });
};

setUpTodoSubscriptions();
