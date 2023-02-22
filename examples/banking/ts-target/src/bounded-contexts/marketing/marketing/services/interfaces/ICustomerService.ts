import { GetCustomerByAccountIdResponse } from '../../../../banking/banking/contracts';

export interface ICustomerService {
  getEmailByAccountId(id: string): Promise<GetCustomerByAccountIdResponse>;
}
