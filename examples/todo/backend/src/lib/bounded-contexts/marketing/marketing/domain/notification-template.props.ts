import { Domain } from '@bitloops/bl-boilerplate-core';
export interface NotificationTemplateProps {
  id?: Domain.UUIDv4;
  template: string;
  type: string;
}
