import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';

type TGetCustomerByIdQuery = {
  id: string;
};

export class GetCustomerByIdQuery extends Application.Query {
  public readonly id: string;
  public static readonly queryName = 'GET_CUSTOMER_BY_ID_QUERY_NAME';

  constructor(getCustomerByIdQuery: TGetCustomerByIdQuery) {
    super(GetCustomerByIdQuery.queryName, contextId);
    this.id = getCustomerByIdQuery.id;
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetCustomerByIdQuery.queryName, contextId);
  }
}
