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
import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import {
  depositMoneyRESTCommandController,
  getAccountByIdController,
  getCustomerByIdController,
  insertCardPINRESTCommandController,
  withdrawMoneyRESTCommandController,
} from '../../../../../bounded-contexts/banking/banking/DI';

const bankingRESTRouter = async (fastify: Fastify.Instance) => {
  fastify.post('/insertPIN', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {
    return insertCardPINRESTCommandController.execute(request, reply);
  });
  fastify.post('/depositMoney', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {
    return depositMoneyRESTCommandController.execute(request, reply);
  });
  fastify.post('/withdrawMoney', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {
    return withdrawMoneyRESTCommandController.execute(request, reply);
  });

  fastify.get(
    '/accounts/:accountId',
    {},
    async (request: Fastify.Request, reply: Fastify.Reply) => {
      return getAccountByIdController.execute(request, reply);
    },
  );

  fastify.get(
    '/customers/:customerId',
    {},
    async (request: Fastify.Request, reply: Fastify.Reply) => {
      return getCustomerByIdController.execute(request, reply);
    },
  );
};

export { bankingRESTRouter };
