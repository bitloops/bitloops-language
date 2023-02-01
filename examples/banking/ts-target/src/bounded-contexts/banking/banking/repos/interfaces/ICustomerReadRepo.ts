import { Application } from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../domain/CustomerReadModel';

export type ICustomerReadRepo = Application.Repo.ICRUDReadPort<CustomerReadModel>;
