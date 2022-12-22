import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoRootEntity } from '../domain/TodoRootEntity';
export interface TodoRepoPort
  extends Application.Repo.ICRUDWritePort<TodoRootEntity, Domain.UUIDv4> {
  updateTodoTitle(id: string, title: string): void;
}
