import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoEntity } from '../domain/todo.entity';
export type TodoWriteRepoPort = Application.Repo.ICRUDWritePort<
  TodoEntity,
  Domain.UUIDv4
>;
