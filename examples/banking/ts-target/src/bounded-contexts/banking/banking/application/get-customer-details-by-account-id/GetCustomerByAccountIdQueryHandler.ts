import { Application, Either, RespondWithPublish, ok, fail } from '@bitloops/bl-boilerplate-core';
import { CustomerReadModel } from '../../domain/CustomerReadModel';
import { ICustomerReadRepo } from '../../repos/interfaces/ICustomerReadRepo';
import { ApplicationErrors } from '../errors/index';
import { GetCustomerByAccountIdQuery } from './GetCustomerByAccountIdQuery';

export type GetCustomerByAccountIdUseCaseResponse = Either<
  CustomerReadModel,
  ApplicationErrors.CustomerByAccountIdNotFound
>;

export class GetCustomerByAccountIdQueryHandler
  implements
    Application.IUseCase<
      GetCustomerByAccountIdQuery,
      Promise<GetCustomerByAccountIdUseCaseResponse>
    >
{
  constructor(private customerRepo: ICustomerReadRepo) {}

  @RespondWithPublish()
  async execute(
    query: GetCustomerByAccountIdQuery,
  ): Promise<GetCustomerByAccountIdUseCaseResponse> {
    const requestAccountId = query.accountId;
    const customer = await this.customerRepo.getByAccountId(requestAccountId);
    if (!customer) {
      return fail(new ApplicationErrors.CustomerByAccountIdNotFound(requestAccountId));
    }

    return await ok(customer);
  }
}
