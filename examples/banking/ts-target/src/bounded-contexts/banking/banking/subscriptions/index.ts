import { Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../config';
import {
  insertPINCommandHandler,
  depositMoneyCommandHandler,
  withdrawMoneyCommandHandler,
} from '../DI';
import { InsertPINCommand } from '../application/insert-card-pin/index';
import { DepositMoneyCommand } from '../application/deposit-money/DepositMoneyCommand';
import { WithdrawMoneyCommand } from '../application/withdraw-money/WithdrawMoneyCommand';

export const setUpTodoSubscriptions = async () => {
  // // TODO maybe register use case instead of execute method
  // console.log('CreateUserCommand.getCommandTopic()', InsertPINCommand.getCommandTopic());
  const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
  await commandBus.register(
    InsertPINCommand.getCommandTopic(),
    insertPINCommandHandler.execute.bind(insertPINCommandHandler),
  );

  await commandBus.register(
    DepositMoneyCommand.getCommandTopic(),
    depositMoneyCommandHandler.execute.bind(depositMoneyCommandHandler),
  );
  await commandBus.register(
    WithdrawMoneyCommand.getCommandTopic(),
    withdrawMoneyCommandHandler.execute.bind(withdrawMoneyCommandHandler),
  );
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
