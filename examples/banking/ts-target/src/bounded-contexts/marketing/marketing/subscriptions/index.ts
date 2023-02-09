import { Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../config';
// import { sendEmailCommandHandler } from '../DI';
// import { SendEmailCommand } from '../application/commands';
import { MoneyDepositedIntegrationHandler } from '../application/event-handlers/integration/MoneyDepositedIntegrationHandler';
import { MoneyDepositedIntegrationEvent } from '../../../banking/banking/contracts/index';
import { IncrementDepositsCommand } from '../application/increase-deposit-counter';
import {
  sendEmailAfterDepositsIncrementedHandler,
  incrementDepositsCommandHandler,
  sendEmailCommandHandler,
} from '../DI';
import { DepositsIncrementedDomainEvent } from '../domain/events/DepositsIncrementedDomainEvent';
import { SendEmailCommand } from '../application/send-email';

// Subscriptions
export const setupSubscriptions = () => {
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
      sendEmailAfterDepositsIncrementedHandler.handle(event);
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

setupSubscriptions();
