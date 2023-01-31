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
import { CONTEXT_ID } from './config';

import { MongoTodoWriteRepo } from './repos/concretions/MongoToDoWriteRepo';
import { MongoTodoReadRepo } from './repos/concretions/MongoToDoReadRepo';

import { CreateTodoCommandHandler } from './application/CreateTodoCommandHandler';
import { GetAllTodosQueryHandler } from './application/get-all/GetAllTodosQueryHandler';

import { CreateTodoRESTCommandController } from '../../../api/todo/modules/todo/create-todo/CreateTodoRESTCommandController';
import { GetAllQueryController } from '../../../api/todo/modules/todo/get-all-todos/GetAllQueryController';

const createTodoCommandHandler = new CreateTodoCommandHandler(new MongoTodoWriteRepo(client));
const getAllTodosQueryHandler = new GetAllTodosQueryHandler(new MongoTodoReadRepo(client));

const createTodoRESTCommandController = new CreateTodoRESTCommandController(
  Container.getCommandBusFromContext(CONTEXT_ID),
);

const getAllTodosQueryController = new GetAllQueryController(
  Container.getQueryBusFromContext(CONTEXT_ID),
);

export {
  createTodoRESTCommandController,
  getAllTodosQueryController,
  createTodoCommandHandler,
  getAllTodosQueryHandler,
};
