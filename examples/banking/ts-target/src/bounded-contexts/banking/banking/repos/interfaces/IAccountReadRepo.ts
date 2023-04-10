import { Application } from '@bitloops/bl-boilerplate-core';
import { AccountReadModel } from '../../domain/AccountReadModel';

export type IAccountReadRepo = Application.Repo.ICRUDReadPort<AccountReadModel>;
