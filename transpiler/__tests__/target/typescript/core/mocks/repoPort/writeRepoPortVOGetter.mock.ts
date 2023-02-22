import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoRootEntity } from '../domain/TodoRootEntity';
export interface TodoRepoPort
  extends Application.Repo.ICRUDWritePort<TodoRootEntity, Domain.UUIDv4> {
  getByCompleted(completed: boolean): Promise<TodoRootEntity | null>;
  getByEmail(email: string): Promise<TodoRootEntity | null>;
}
