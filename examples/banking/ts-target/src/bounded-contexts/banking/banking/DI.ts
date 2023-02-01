/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { Container } from '@bitloops/bl-boilerplate-core';
import client from '../../../shared/infra/db/mongo';

import { MongoAccountWriteRepo } from './repos/concretions/MongoAccountWriteRepo';
import { MongoCustomerWriteRepo } from './repos/concretions/MongoCustomerWriteRepo';
import { InsertPINCommandHandler } from './application/insert-card-pin/InsertPINCommandHandler';
import { DepositMoneyCommandHandler } from './application/deposit-money/DepositMoneyCommandHandler';
import { WithdrawMoneyCommandHandler } from './application/withdraw-money/WithdrawMoneyCommandHandler';
import { CONTEXT_ID } from './config/index';
import { InsertCardPINRESTCommandController } from '../../../api/banking/modules/banking/insert-card-pin/InsertCardPINRESTCommandController';
import { DepositMoneyRESTCommandController } from '../../../api/banking/modules/banking/deposit-money/DepositMoneyRESTCommandController';
import { WithdrawMoneyRESTCommandController } from '../../../api/banking/modules/banking/withdraw-money/WithdrawMoneyRESTCommandController';
import { GetAccountByIdQueryController } from '../../../api/banking/modules/banking/get-account-by-id/GetAccountByIdQueryController';
import { GetAccountQueryHandler } from './application/get-account-details/GetAccountQueryHandler';
import { GetCustomerQueryHandler } from './application/get-customer-details-by-id/GetCustomerQueryHandler';
import { MongoCustomerReadRepo } from './repos/concretions/MongoCustomerReadRepo';
import { MongoAccountReadRepo } from './repos/concretions/MongoAccountReadRepo';
import { GetCustomerByIdQueryController } from '../../../api/banking/modules/banking/get-customer-by-id/GetCustomerByIdQueryController';
import { GetCustomerByAccountIdQueryHandler } from './application/get-customer-details-by-account-id/GetCustomerByAccountIdQueryHandler';
import { GetCustomerByAccountIdQueryController } from '../../../api/banking/modules/banking/get-customer-by-account-id/GetCustomerByAccountIdQueryController';
import { SendEmailVerificationCommandHandler } from './application/send-email-verification/SendEmailVerificationCommandHandler';
import { MockEmailService } from './services/concretions';

const insertPINCommandHandler = new InsertPINCommandHandler(new MongoCustomerWriteRepo(client));
const depositMoneyCommandHandler = new DepositMoneyCommandHandler(
  new MongoAccountWriteRepo(client),
);
const withdrawMoneyCommandHandler = new WithdrawMoneyCommandHandler(
  new MongoAccountWriteRepo(client),
);

const sendEmailVerificationCommandHandler = new SendEmailVerificationCommandHandler(
  new MockEmailService(),
);

const insertCardPINRESTCommandController = new InsertCardPINRESTCommandController(
  Container.getCommandBusFromContext(CONTEXT_ID),
);

const depositMoneyRESTCommandController = new DepositMoneyRESTCommandController(
  Container.getCommandBusFromContext(CONTEXT_ID),
);
const withdrawMoneyRESTCommandController = new WithdrawMoneyRESTCommandController(
  Container.getCommandBusFromContext(CONTEXT_ID),
);

const getCustomerByIdQueryHandler = new GetCustomerQueryHandler(new MongoCustomerReadRepo(client));
const getCustomerByAccountIdQueryHandler = new GetCustomerByAccountIdQueryHandler(
  new MongoCustomerReadRepo(client),
);

const getAccountByIdQueryHandler = new GetAccountQueryHandler(new MongoAccountReadRepo(client));

const getAccountByIdController = new GetAccountByIdQueryController(
  Container.getQueryBusFromContext(CONTEXT_ID),
);

const getCustomerByIdController = new GetCustomerByIdQueryController(
  Container.getQueryBusFromContext(CONTEXT_ID),
);

const getCustomerByAccountIdController = new GetCustomerByAccountIdQueryController(
  Container.getQueryBusFromContext(CONTEXT_ID),
);

export {
  insertPINCommandHandler,
  depositMoneyCommandHandler,
  withdrawMoneyCommandHandler,
  insertCardPINRESTCommandController,
  depositMoneyRESTCommandController,
  withdrawMoneyRESTCommandController,
  getCustomerByIdQueryHandler,
  getAccountByIdQueryHandler,
  getAccountByIdController,
  getCustomerByIdController,
  getCustomerByAccountIdController,
  getCustomerByAccountIdQueryHandler,
  sendEmailVerificationCommandHandler,
};
