import { Application, Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
type TGetCustomerByIdQuery = {
  id: string;
};
export class GetCustomerByIdQuery extends Application.Query {
  public readonly id: string;
  public readonly metadata: Application.TQueryMetadata = {
    boundedContextId: 'banking',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };
  constructor(getCustomerByIdRequestDTO: TGetCustomerByIdQuery) {
    super();
    this.id = getCustomerByIdRequestDTO.id;
  }
}
