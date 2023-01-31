import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { CustomerEntity } from '../../domain/CustomerEntity';

export type ICustomerWriteRepo = Application.Repo.ICRUDWritePort<CustomerEntity, Domain.UUIDv4>;
