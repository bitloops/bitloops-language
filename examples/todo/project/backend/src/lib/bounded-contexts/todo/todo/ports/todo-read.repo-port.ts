import { Application } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/todo.read-model';
export type TodoReadRepoPort = Application.Repo.ICRUDReadPort<TodoReadModel>;
