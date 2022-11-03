import { Domain } from '@bitloops/bl-boilerplate-core';

export interface UpdateTodoRequestDTO {
  id: Domain.UUIDv4;
  title: string;
  completed: boolean;
}
