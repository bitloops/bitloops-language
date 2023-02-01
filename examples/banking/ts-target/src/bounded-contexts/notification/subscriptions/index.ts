import { Container } from '@bitloops/bl-boilerplate-core';
import { TodoCreatedIntegrationEvent } from '../../../todo/todo/contracts/integration-events';
import { CONTEXT_ID } from '../config';
import { sendEmailCommandHandler } from '../DI';
import { SendEmailCommand } from '../application/commands';
import { MoneyDepositedIntegrationHandler } from './MoneyDepositedIntegrationHandler';

// Subscriptions
export const setUpNotificationsSubscriptions = () => {
  const integrationEventBus = Container.getIntegrationEventBusFromContext(CONTEXT_ID);
  const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
  const todoCreatedIntegrationEventHandler = new MoneyDepositedIntegrationHandler(commandBus);
  integrationEventBus.subscribe<TodoCreatedIntegrationEvent>(
    TodoCreatedIntegrationEvent.getEventTopic('v2'),
    (event) => {
      todoCreatedIntegrationEventHandler.handle(event);
    },
  );

  commandBus.register(
    SendEmailCommand.getCommandTopic(),
    sendEmailCommandHandler.execute.bind(sendEmailCommandHandler),
  );
};

setUpNotificationsSubscriptions();
