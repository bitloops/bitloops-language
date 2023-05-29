import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { DomainErrors } from '../../domain/errors/index';
import { ApplicationErrors } from '../errors/index';
import { BecomeAvailableCommand } from '../../commands/become-available.command';
import { Inject } from '@nestjs/common';
import { DriverAvailabilityWriteRepoPortToken } from '../../constants';
import { DriverAvailabilityWriteRepoPort } from '../../ports/driver-availability-write.repo-port';
export type BecomeAvailableCommandHandlerResponse = Either<
  void,
  | Application.Repo.Errors.Unexpected
  | DomainErrors.AccountIsBlockedError
  | ApplicationErrors.DriverNotFoundError
>;
export class BecomeAvailableCommandHandler
  implements Application.ICommandHandler<BecomeAvailableCommand, void>
{
  constructor(
    @Inject(DriverAvailabilityWriteRepoPortToken)
    private readonly driverAvailabilityRepository: DriverAvailabilityWriteRepoPort
  ) {}
  get command() {
    return BecomeAvailableCommand;
  }
  get boundedContext(): string {
    return 'driver';
  }
  @Traceable({
    operation: 'BecomeAvailableCommandHandler',
    metrics: {
      name: 'BecomeAvailableCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: BecomeAvailableCommand
  ): Promise<BecomeAvailableCommandHandlerResponse> {
    const driverAvailability =
      await this.driverAvailabilityRepository.getDriverAvailability(command.id);
    if (driverAvailability.isFail()) {
      return fail(driverAvailability.value);
    }
    if (driverAvailability.value === null) {
      return fail(new ApplicationErrors.DriverNotFoundError(query.id));
    }
    const result = driverAvailability.value.becomeAvailable();
    if (result.isFail()) {
      return fail(result);
    }
    return ok();
  }
}
