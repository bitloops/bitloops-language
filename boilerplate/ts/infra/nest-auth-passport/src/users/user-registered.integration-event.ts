import { Infra } from '@bitloops/bl-boilerplate-core';

type UserRegisteredIntegrationSchemaV1 = {
  userId: string;
  email: string;
};

export class UserRegisteredIntegrationEvent
  implements Infra.EventBus.IntegrationEvent<UserRegisteredIntegrationSchemaV1>
{
  public metadata: any;
  static fromContextId = 'Bitloops_IAM';
  static versions = ['v1'];

  constructor(public data: UserRegisteredIntegrationSchemaV1) {
    this.metadata = {
      fromContextId: UserRegisteredIntegrationEvent.fromContextId,
      version: UserRegisteredIntegrationEvent.versions[0],
    };
  }
}
