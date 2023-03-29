import {
  Infra,
  Domain,
  asyncLocalStorage,
} from '@src/bitloops/bl-boilerplate-core';

type UserRegisteredIntegrationSchemaV1 = {
  userId: string;
  email: string;
};

export class UserRegisteredIntegrationEvent
  implements Infra.EventBus.IntegrationEvent<UserRegisteredIntegrationSchemaV1>
{
  public metadata: Infra.EventBus.TIntegrationEventMetadata;
  static boundedContextId = 'Bitloops_IAM';
  static versions = ['v1'];

  constructor(public data: UserRegisteredIntegrationSchemaV1) {
    this.metadata = {
      boundedContextId: UserRegisteredIntegrationEvent.boundedContextId,
      version: UserRegisteredIntegrationEvent.versions[0],
      createdAtTimestamp: Date.now(),
      messageId: new Domain.UUIDv4().toString(),
      context: null,
      correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    };
  }
}
