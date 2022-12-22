import { Application } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/TodoReadModel';
export interface TodoReadRepoPort extends Application.Repo.ICRUDReadPort<TodoReadModel> {
  getTodo(): TodoReadModel;
}
