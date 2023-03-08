import { Application } from '@bitloops/bl-boilerplate-core';
type TGetCustomerByIdQuery = {
  id: string;
};
export class GetCustomerByIdQuery extends Application.Query {
  public readonly id: string;
  public static readonly queryName = 'banking.banking.QUERY.GET_CUSTOMER_BY_ID';
  constructor(getCustomerByIdRequestDTO: TGetCustomerByIdQuery) {
    super(GetCustomerByIdQuery.queryName, 'banking');
    this.id = getCustomerByIdRequestDTO.id;
  }
  static getQueryTopic(): string {
    return super.getQueryTopic(GetCustomerByIdQuery.queryName, 'banking');
  }
}
