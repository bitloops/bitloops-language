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
import { MongoTodoWriteRepo } from './repos/concretions/MongoToDoWriteRepo';
import { MongoTodoReadRepo } from './repos/concretions/MongoToDoReadRepo';

import { CreateTodoUseCase } from './application/CreateTodoUseCase';
import { GetAllTodoUseCase } from './application/GetAllTodoUseCase';

import { CreateTodoRESTController } from './driving-adapters/CreateTodoRESTController';
import { GetAllTodoRESTController } from './driving-adapters/GetAllTodoRESTController';
import { GetAllTodoGQLController } from './driving-adapters/GetAllTodoGQLController';

import client from '../../../shared/infra/db/mongo';

const createTodoRESTController = new CreateTodoRESTController(
  new CreateTodoUseCase(new MongoTodoWriteRepo(client)),
);
const todoGetAllController = new GetAllTodoRESTController(
  new GetAllTodoUseCase(new MongoTodoReadRepo(client)),
);
const todoGetAllGQLController = new GetAllTodoGQLController(
  new GetAllTodoUseCase(new MongoTodoReadRepo(client)),
);

export { createTodoRESTController, todoGetAllController, todoGetAllGQLController };
