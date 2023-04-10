import { Application } from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../domain/CustomerReadModel';

export interface ICustomerReadRepo extends Application.Repo.ICRUDReadPort<CustomerReadModel> {
  getByAccountId(accountId: string): Promise<CustomerReadModel | null>;
}
