import { Application } from '@bitloops/bl-boilerplate-core';
type TGetCustomerByIdQuery = {
  id: string;
};
export class GetCustomerByIdQuery extends Application.Query {
  public readonly id: string;
  constructor(getCustomerByIdRequestDTO: TGetCustomerByIdQuery) {
    super('banking');
    this.id = getCustomerByIdRequestDTO.id;
  }
}
