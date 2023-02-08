export interface ICustomerService {
  getEmailByAccountId(id: string): Promise<string>;
}
