import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';

type TGetAccountQuery = {
  accountId: string;
};

export class GetAccountQuery extends Application.Query {
  public readonly accountId: string;
  public static readonly queryName = 'GET_ACCOUNT_QUERY_NAME';

  constructor(getAccountQuery: TGetAccountQuery) {
    super(GetAccountQuery.queryName, contextId);
    this.accountId = getAccountQuery.accountId;
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetAccountQuery.queryName, contextId);
  }
}
