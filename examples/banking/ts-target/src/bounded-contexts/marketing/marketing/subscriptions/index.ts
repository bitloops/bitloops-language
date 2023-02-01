import { Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../config';
import { sendEmailCommandHandler } from '../DI';
import { SendEmailCommand } from '../application/commands';
import { MoneyDepositedIntegrationHandler } from './MoneyDepositedIntegrationHandler';
import { MoneyDepositedIntegrationEvent } from '../../../banking/banking/contracts/index';

// Subscriptions
export const setUpNotificationsSubscriptions = () => {
  const integrationEventBus = Container.getIntegrationEventBusFromContext(CONTEXT_ID);
  const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
  const queryBus = Container.getQueryBusFromContext(CONTEXT_ID);

  const moneyDepositedIntegrationHandler = new MoneyDepositedIntegrationHandler(
    commandBus,
    queryBus,
  );
  integrationEventBus.subscribe<MoneyDepositedIntegrationEvent>(
    MoneyDepositedIntegrationEvent.getEventTopic('v1'),
    (event) => {
      moneyDepositedIntegrationHandler.handle(event);
    },
  );

  commandBus.register(
    SendEmailCommand.getCommandTopic(),
    sendEmailCommandHandler.execute.bind(sendEmailCommandHandler),
  );
};

setUpNotificationsSubscriptions();
