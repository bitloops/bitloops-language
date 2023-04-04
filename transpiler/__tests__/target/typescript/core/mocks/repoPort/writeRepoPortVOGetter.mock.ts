import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TodoRootEntity } from '../domain/TodoRootEntity';
export type TodoRepoPort = Application.Repo.ICRUDWritePort<TodoRootEntity, Domain.UUIDv4>;
