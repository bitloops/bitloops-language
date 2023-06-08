import { Domain } from '@bitloops/bl-boilerplate-core';
import { UserIdVO } from './user-id.value-object';
import { TitleVO } from './title.value-object';
export interface TodoProps {
  id?: Domain.UUIDv4;
  userId: UserIdVO;
  title: TitleVO;
  completed: boolean;
}
