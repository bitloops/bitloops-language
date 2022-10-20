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
  todoCreateController,
  todoGetAllController,
} from '../../../../../bounded-contexts/todo/todo/DI';

const todoRESTRouter = async (fastify: Fastify.Instance) => {
  fastify.post('/', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {
    return todoCreateController.execute(request, reply);
  });
  fastify.get('/', {}, async (request: Fastify.Request, reply: Fastify.Reply) => {
    return todoGetAllController.execute(request, reply);
  });
};

export { todoRESTRouter };
