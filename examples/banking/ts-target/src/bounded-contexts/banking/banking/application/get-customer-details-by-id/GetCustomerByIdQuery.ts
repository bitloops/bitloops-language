import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { GET_CUSTOMER_BY_ID_QUERY_NAME } from '../../contracts';

export class GetCustomerByIdQuery extends Application.Query {
  public static readonly queryName = GET_CUSTOMER_BY_ID_QUERY_NAME;

  constructor(public id: string) {
    super(GetCustomerByIdQuery.queryName, contextId);
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetCustomerByIdQuery.queryName, contextId);
  }
}
