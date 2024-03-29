import { Application, Either } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/todo.read-model';
export interface TodoReadRepoPort extends Application.Repo.ICRUDReadPort<TodoReadModel> {
  getTodo(): Promise<Either<TodoReadModel, Application.Repo.Errors.Unexpected>>;
}
