import { Application, Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
export class GetAllQuery extends Application.Query {
  public readonly metadata: Application.TQueryMetadata = {
    boundedContextId: 'banking',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };
  constructor() {
    super();
  }
}
