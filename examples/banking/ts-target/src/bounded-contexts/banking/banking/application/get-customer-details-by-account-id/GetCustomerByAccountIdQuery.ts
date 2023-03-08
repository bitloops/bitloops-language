import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';

type TGetCustomerByAccountIdQuery = {
  accountId: string;
};

export class GetCustomerByAccountIdQuery extends Application.Query {
  public readonly accountId: string;
  public static readonly queryName = 'GET_CUSTOMER_BY_ACCOUNT_ID';

  constructor(getCustomerByAccountIdQuery: TGetCustomerByAccountIdQuery) {
    super(GetCustomerByAccountIdQuery.queryName, contextId);
    this.accountId = getCustomerByAccountIdQuery.accountId;
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetCustomerByAccountIdQuery.queryName, contextId);
  }
}
