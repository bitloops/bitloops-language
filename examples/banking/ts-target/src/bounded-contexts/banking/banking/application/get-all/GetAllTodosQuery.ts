import { Application } from '@bitloops/bl-boilerplate-core';

import { CONTEXT_ID as contextId } from '../../config';
import { GET_ALL_TODOS_QUERY_NAME } from '../../contracts';

export class GetAllTodosQuery extends Application.Query {
  public static readonly queryName = GET_ALL_TODOS_QUERY_NAME;

  constructor() {
    super(GetAllTodosQuery.queryName, contextId);
  }

  static getQueryTopic(): string {
    return super.getQueryTopic(GetAllTodosQuery.queryName, contextId);
  }
}
