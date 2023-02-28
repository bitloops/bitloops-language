import { Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../config';
import {
  insertPINCommandHandler,
  depositMoneyCommandHandler,
  withdrawMoneyCommandHandler,
  getAccountByIdQueryHandler,
  getCustomerByIdQueryHandler,
  getCustomerByAccountIdQueryHandler,
  sendEmailVerificationCommandHandler,
} from '../DI';
import { InsertPINCommand } from '../application/insert-card-pin/index';
import { DepositMoneyCommand } from '../application/deposit-money/DepositMoneyCommand';
import { WithdrawMoneyCommand } from '../application/withdraw-money/WithdrawMoneyCommand';
import { GetAccountQuery } from '../application/get-account-details/GetAccountQuery';
import { GetCustomerByIdQuery } from '../application/get-customer-details-by-id/GetCustomerByIdQuery';
import { MoneyDepositedToAccount } from '../domain/events/MoneyDepositedToAccount';
import { MoneyWithdrawnFromAccount } from '../domain/events/MoneyWithdrawnFromAccount';

import { MoneyDepositedPublishIntegrationEventHandler } from '../application/event-handlers/domain/MoneyDepositedPublishIntegrationEventHandler';
import { GetCustomerByAccountIdQuery } from '../application/get-customer-details-by-account-id/GetCustomerByAccountIdQuery';
import { SendEmailVerificationCommand } from '../application/send-email-verification';
import { MoneyWithdrawnPublishIntegrationEventHandler } from '../application/event-handlers/domain/MoneyWithdrawnPublishIntegrationEventHandler';
import { SendEmailAfterMoneyDepositedHandler } from '../application/event-handlers/domain/SendEmailAfterMoneyDepositedHandler';

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

  await commandBus.register(
    SendEmailVerificationCommand.getCommandTopic(),
    sendEmailVerificationCommandHandler.execute.bind(sendEmailVerificationCommandHandler),
  );

  const queryBus = Container.getQueryBusFromContext(CONTEXT_ID);
  await queryBus.register(
    GetAccountQuery.getQueryTopic(),
    getAccountByIdQueryHandler.execute.bind(getAccountByIdQueryHandler),
  );
  await queryBus.register(
    GetCustomerByIdQuery.getQueryTopic(),
    getCustomerByIdQueryHandler.execute.bind(getCustomerByIdQueryHandler),
  );

  await queryBus.register(
    GetCustomerByAccountIdQuery.getQueryTopic(),
    getCustomerByAccountIdQueryHandler.execute.bind(getCustomerByAccountIdQueryHandler),
  );

  // // Domain events subscriptions
  const domainEventBus = Container.getEventBusFromContext(CONTEXT_ID);
  // Possible we need the external domain event bus here for integration events, different from domain events one
  const moneyDepositedIntegrationEventHandler = new MoneyDepositedPublishIntegrationEventHandler();
  const afterMoneyDepositedHandler = new SendEmailAfterMoneyDepositedHandler();
  await domainEventBus.subscribe<MoneyDepositedToAccount>(
    MoneyDepositedToAccount.getEventTopic(),
    (event) => {
      moneyDepositedIntegrationEventHandler.handle(event);
      afterMoneyDepositedHandler.handle(event);
    },
  );

  const moneyWithdrawnIntegrationEventHandler = new MoneyWithdrawnPublishIntegrationEventHandler();
  await domainEventBus.subscribe<MoneyWithdrawnFromAccount>(
    MoneyWithdrawnFromAccount.getEventTopic(),
    (event) => {
      moneyWithdrawnIntegrationEventHandler.handle(event);
    },
  );
};

setUpTodoSubscriptions();
