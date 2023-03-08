import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { AccountEntity } from '../../domain/AccountEntity';

export type IAccountWriteRepo = Application.Repo.ICRUDWritePort<AccountEntity, Domain.UUIDv4>;
