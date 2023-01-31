import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { CustomerEntity } from '../../domain/CustomerEntity';

export interface ICustomerWriteRepo
  extends Application.Repo.ICRUDWritePort<CustomerEntity, Domain.UUIDv4> {
  getByEmail(email: string): Promise<CustomerEntity | null>;
}
