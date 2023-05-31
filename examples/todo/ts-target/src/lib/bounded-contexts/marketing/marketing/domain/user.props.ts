import { Domain } from '@bitloops/bl-boilerplate-core';
import { CompletedTodosVO } from './completed-todos.value-object';
import { EmailVO } from './email.value-object';
export interface UserProps {
  id?: Domain.UUIDv4;
  completedTodos: CompletedTodosVO;
  email: EmailVO;
}
