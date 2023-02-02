import { Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../config';
// import { sendEmailCommandHandler } from '../DI';
// import { SendEmailCommand } from '../application/commands';
import { MoneyDepositedIntegrationHandler } from './MoneyDepositedIntegrationHandler';
import { MoneyDepositedIntegrationEvent } from '../../../banking/banking/contracts/index';
import { IncrementDepositsCommand } from '../application/increase-deposit-counter';
import {
  afterDepositsIncrementedHandler,
  incrementDepositsCommandHandler,
  sendEmailCommandHandler,
} from '../DI';
import { DepositsIncrementedDomainEvent } from '../domain/events/DepositsIncrementedDomainEvent';
import { SendEmailCommand } from '../application/send-email';

// Subscriptions
export const setUpNotificationsSubscriptions = () => {
  const integrationEventBus = Container.getIntegrationEventBusFromContext(CONTEXT_ID);
  const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
  const domainEventBus = Container.getEventBusFromContext(CONTEXT_ID);

  const moneyDepositedIntegrationHandler = new MoneyDepositedIntegrationHandler(commandBus);
  integrationEventBus.subscribe<MoneyDepositedIntegrationEvent>(
    MoneyDepositedIntegrationEvent.getEventTopic('v1'),
    (event) => {
      moneyDepositedIntegrationHandler.handle(event);
    },
  );

  domainEventBus.subscribe<DepositsIncrementedDomainEvent>(
    DepositsIncrementedDomainEvent.getEventTopic(),
    (event) => {
      afterDepositsIncrementedHandler.handle(event);
    },
  );

  commandBus.register(
    IncrementDepositsCommand.getCommandTopic(),
    incrementDepositsCommandHandler.execute.bind(incrementDepositsCommandHandler),
  );

  commandBus.register(
    SendEmailCommand.getCommandTopic(),
    sendEmailCommandHandler.execute.bind(sendEmailCommandHandler),
  );
};

setUpNotificationsSubscriptions();
