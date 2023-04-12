import { Application, Domain, Either } from '@bitloops/bl-boilerplate-core';
import { TodoRootEntity } from '../domain/todo-root.entity';
export interface TodoRepoPort
  extends Application.Repo.ICRUDWritePort<TodoRootEntity, Domain.UUIDv4> {
  updateTodoTitle(
    id: string,
    title: string,
  ): Promise<Either<void, Application.Repo.Errors.Unexpected>>;
}
