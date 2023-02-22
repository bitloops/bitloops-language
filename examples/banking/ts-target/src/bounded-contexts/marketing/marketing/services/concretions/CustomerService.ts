import { ICustomerService } from '../interfaces/ICustomerService.js';
import { Infra } from '@bitloops/bl-boilerplate-core';
import {
  GetCustomerByAccountIdQuery,
  GetCustomerByAccountIdResponse,
} from '../../../../banking/banking/contracts/';

export class CustomerService implements ICustomerService {
  constructor(private queryBus: Infra.QueryBus.IQueryBus) {}
  async getEmailByAccountId(id: string): Promise<GetCustomerByAccountIdResponse> {
    const query = new GetCustomerByAccountIdQuery({
      accountId: id,
    });
    return this.queryBus.query<GetCustomerByAccountIdResponse>(query);
  }
}
