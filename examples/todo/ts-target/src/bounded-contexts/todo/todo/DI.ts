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
// import { MockTodoRepo } from './repos/concretions/MockTodoRepo';
import { MongoTodoWriteRepo } from './repos/concretions/MongoToDoWriteRepo';
import { MongoTodoReadRepo } from './repos/concretions/MongoToDoReadRepo';

import { TodoCreateUseCase } from './application/TodoCreateUseCase';
import { TodoGetAllUseCase } from './application/TodoGetAllUseCase';

import { TodoCreateController } from './driving-adapters/TodoCreateController';
import { TodoUpdateController } from './driving-adapters/TodoUpdateController';
import { TodoDeleteController } from './driving-adapters/TodoDeleteController';
import { TodoGetAllController } from './driving-adapters/TodoGetAllController';
import { TodoGetByIdController } from './driving-adapters/TodoGetByIdController';
import { TodoGetAllGQLController } from './driving-adapters/TodoGetAllGQLController';
import client from '../../../shared/infra/db/mongo';

const todoCreateController = new TodoCreateController(
  new TodoCreateUseCase(new MongoTodoWriteRepo(client)),
);
const todoUpdateController = new TodoUpdateController();
const todoDeleteController = new TodoDeleteController();
const todoGetAllController = new TodoGetAllController(
  new TodoGetAllUseCase(new MongoTodoReadRepo(client)),
);
const todoGetByIdController = new TodoGetByIdController();
const todoGetAllGQLController = new TodoGetAllGQLController(
  new TodoGetAllUseCase(new MongoTodoReadRepo(client)),
);

export {
  todoCreateController,
  todoUpdateController,
  todoDeleteController,
  todoGetAllController,
  todoGetByIdController,
  todoGetAllGQLController,
};
