import { Container } from '@bitloops/bl-boilerplate-core';
import client from '../../../shared/infra/db/mongo';
import { AfterDepositsIncrementedHandler } from './application/AfterDepositsIncrementedHandler';
import { IncrementDepositsCommandHandler } from './application/increase-deposit-counter/IncrementDepositsCommandHandler';
import { SendEmailCommandHandler } from './application/send-email/SendEmailCommandHandler';
import { CONTEXT_ID } from './config';
import { MongoAccountWriteRepo } from './repos/concretions/MongoAccountWriteRepo';
import { MockEmailService } from './services/concretions';

const incrementDepositsCommandHandler = new IncrementDepositsCommandHandler(
  new MongoAccountWriteRepo(client),
);

const commandBus = Container.getCommandBusFromContext(CONTEXT_ID);
const queryBus = Container.getQueryBusFromContext(CONTEXT_ID);

const afterDepositsIncrementedHandler = new AfterDepositsIncrementedHandler(commandBus, queryBus);

const sendEmailCommandHandler = new SendEmailCommandHandler(new MockEmailService());

export {
  incrementDepositsCommandHandler,
  afterDepositsIncrementedHandler,
  sendEmailCommandHandler,
};
