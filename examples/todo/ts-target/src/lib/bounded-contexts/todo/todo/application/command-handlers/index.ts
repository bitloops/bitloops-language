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
import { AddTodoCommandHandler } from './add-todo.command-handler';
import { CompleteTodoCommandHandler } from './complete-todo.command-handler';
import { DeleteTodoCommandHandler } from './delete-todo.command-handler';
import { ModifyTodoTitleCommandHandler } from './modify-todo-title.command-handler';
import { UncompleteTodoCommandHandler } from './uncomplete-todo.command-handler';
export const PubSubCommandHandlers = [
  AddTodoCommandHandler,
  CompleteTodoCommandHandler,
  DeleteTodoCommandHandler,
  ModifyTodoTitleCommandHandler,
  UncompleteTodoCommandHandler,
];
export const StreamingCommandHandlers = [
  AddTodoCommandHandler,
  CompleteTodoCommandHandler,
  DeleteTodoCommandHandler,
  ModifyTodoTitleCommandHandler,
  UncompleteTodoCommandHandler,
];
