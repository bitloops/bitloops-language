import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { GET_ACCOUNT_QUERY_NAME } from '../../contracts';

export class GetAccountQuery extends Application.Query {
  public static readonly queryName = GET_ACCOUNT_QUERY_NAME;

  constructor(public accountId: string) {
    super(GetAccountQuery.queryName, contextId);
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetAccountQuery.queryName, contextId);
  }
}
