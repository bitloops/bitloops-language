import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { ApplicationErrors } from '../errors/index';
import { GetDriverAvailabilityQuery } from '../../queries/get-driver-availability.query';
import { Inject } from '@nestjs/common';
import { DriverAvailabilityReadRepoPortToken } from '../../constants';
import { DriverAvailabilityReadRepoPort } from '../../ports/driver-availability-read.repo-port';
export type GetDriverAvailabilityQueryHandlerResponse = Either<
  string,
  Application.Repo.Errors.Unexpected | ApplicationErrors.DriverNotFoundError
>;
export class GetDriverAvailabilityQueryHandler
  implements Application.IQueryHandler<GetDriverAvailabilityQuery, string>
{
  constructor(
    @Inject(DriverAvailabilityReadRepoPortToken)
    private readonly driverAvailabilityRepository: DriverAvailabilityReadRepoPort
  ) {}
  get query() {
    return GetDriverAvailabilityQuery;
  }
  get boundedContext(): string {
    return 'driver';
  }
  @Traceable({
    operation: 'GetDriverAvailabilityQueryHandler',
    metrics: {
      name: 'GetDriverAvailabilityQueryHandler',
      category: 'queryHandler',
    },
  })
  async execute(
    query: GetDriverAvailabilityQuery
  ): Promise<GetDriverAvailabilityQueryHandlerResponse> {
    const driverAvailability = await this.driverAvailabilityRepository.getById(
      query.id
    );
    if (driverAvailability.isFail()) {
      return fail(driverAvailability.value);
    }
    if (driverAvailability.value === null) {
      return fail(new ApplicationErrors.DriverNotFoundError(query.id));
    }
    return ok(driverAvailability.value.accountStatus);
  }
}
