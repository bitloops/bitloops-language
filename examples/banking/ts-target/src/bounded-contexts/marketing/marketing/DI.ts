import { Container } from '@bitloops/bl-boilerplate-core';
import client from '../../../shared/infra/db/mongo';
import { SendEmailAfterDepositsIncrementedHandler } from './application/event-handlers/domain/SendEmailAfterDepositsIncrementedHandler';
import { IncrementDepositsCommandHandler } from './application/increase-deposit-counter/IncrementDepositsCommandHandler';
import { SendEmailCommandHandler } from './application/send-email/SendEmailCommandHandler';
import { CONTEXT_ID } from './config';
import { MongoAccountWriteRepo } from './repos/concretions/MongoAccountWriteRepo';
import { MongoNotificationTemplateReadRepo } from './repos/concretions/NotificationTemplateReadRepo';
import { CustomerService, MockEmailService } from './services/concretions';

const incrementDepositsCommandHandler = new IncrementDepositsCommandHandler(
  new MongoAccountWriteRepo(client),
);

const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
const queryBus = Container.getQueryBusFromContext(CONTEXT_ID);

const customerService = new CustomerService(queryBus);
const notificationTemplateRepo = new MongoNotificationTemplateReadRepo(client);

const sendEmailAfterDepositsIncrementedHandler = new SendEmailAfterDepositsIncrementedHandler(
  commandBus,
  customerService,
  notificationTemplateRepo,
);

const sendEmailCommandHandler = new SendEmailCommandHandler(new MockEmailService());

export {
  incrementDepositsCommandHandler,
  sendEmailAfterDepositsIncrementedHandler,
  sendEmailCommandHandler,
};
