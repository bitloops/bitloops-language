import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoEntity } from '../domain/TodoEntity.js';

export type TodoWriteRepoPort = Application.Repo.ICRUDWritePort<
  TodoEntity,
  Domain.UUIDv4
>;

// export interface ITodoWriteRepository {
//   findOneById(id: number): Promise<TodoEntity>;
//   findAll(): Promise<TodoEntity[]>;
//   save(hero: TodoEntity): Promise<void>;
// }

export const TodoWriteRepoPortToken = Symbol('TodoWriteRepoPort');
