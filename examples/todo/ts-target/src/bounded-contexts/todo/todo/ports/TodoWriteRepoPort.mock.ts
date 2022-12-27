import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoEntity } from '../domain/TodoEntity.js';

export type TodoWriteRepoPort = Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>;
