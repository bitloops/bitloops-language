import { Domain } from '@bitloops/bl-boilerplate-core';
import { EmailVO } from './email.value-object';
export interface UserProps {
  id?: Domain.UUIDv4;
  email: EmailVO;
  password: string;
  lastLogin?: string;
}
