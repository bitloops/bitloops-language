import got from 'got';

import { ICustomerService } from '../interfaces/ICustomerService.js';

type CustomerInfoResponse = {
  id: string;
  email: string;
  accountId: string;
};

const REST_SERVER_URL = process.env.BANKING_SERVICE_URL || 'http://localhost:3000';
export class CustomerService implements ICustomerService {
  async getEmailByAccountId(id: string): Promise<string> {
    const url = `${REST_SERVER_URL}/api/banking/customers/account/${id}`;
    const data = await got.get<CustomerInfoResponse>(url).json<CustomerInfoResponse>();
    return data.email;
  }
}
