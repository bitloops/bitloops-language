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
import client from '../../../shared/infra/db/mongo';

import { MongoCustomerWriteRepo } from './repos/concretions/MongoCustomerWriteRepo';
import { InsertPINCommandHandler } from './application/insert-card-pin/InsertPINCommandHandler.js';
import { MongoAccountWriteRepo } from './repos/concretions/MongoAccountWriteRepo.js';
import { DepositMoneyCommandHandler } from './application/deposit-money/DepositMoneyCommandHandler.js';
import { WithdrawMoneyCommandHandler } from './application/withdraw-money/WithdrawMoneyCommandHandler.js';
import { WithdrawMoneyRESTCommandController } from '../../../api/todo/modules/todo/withdraw-money/WithdrawMoneyRESTCommandController.js';
import { Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from './config/index.js';
import { DepositMoneyRESTCommandController } from '../../../api/todo/modules/todo/deposit-money/DepositMoneyRESTCommandController.js';
import { InsertCardPINRESTCommandController } from '../../../api/todo/modules/todo/insert-card-pin/InsertCardPINRESTCommandController.js';

const insertPINCommandHandler = new InsertPINCommandHandler(new MongoCustomerWriteRepo(client));
const depositMoneyCommandHandler = new DepositMoneyCommandHandler(
  new MongoAccountWriteRepo(client),
);
const withdrawMoneyCommandHandler = new WithdrawMoneyCommandHandler(
  new MongoAccountWriteRepo(client),
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
// const getAllTodosQueryHandler = new GetAllTodosQueryHandler(new MongoTodoReadRepo(client));

// const getAllTodosQueryController = new GetAllQueryController(
//   Container.getQueryBusFromContext(CONTEXT_ID),
// );

export {
  insertPINCommandHandler,
  depositMoneyCommandHandler,
  withdrawMoneyCommandHandler,
  insertCardPINRESTCommandController,
  depositMoneyRESTCommandController,
  withdrawMoneyRESTCommandController,
  //   getAllTodosQueryController,
  //   getAllTodosQueryHandler,
};
