import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { ApplicationErrors } from '../errors/index';
import { BecomeUnavailableCommand } from '../../commands/become-unavailable.command';
import { Inject } from '@nestjs/common';
import { DriverAvailabilityWriteRepoPortToken } from '../../constants';
import { DriverAvailabilityWriteRepoPort } from '../../ports/driver-availability-write.repo-port';
export type BecomeUnavailableCommandHandlerResponse = Either<
  void,
  Application.Repo.Errors.Unexpected | ApplicationErrors.DriverNotFoundError
>;
export class BecomeUnavailableCommandHandler
  implements Application.ICommandHandler<BecomeUnavailableCommand, void>
{
  constructor(
    @Inject(DriverAvailabilityWriteRepoPortToken)
    private readonly driverAvailabilityRepository: DriverAvailabilityWriteRepoPort
  ) {}
  get command() {
    return BecomeUnavailableCommand;
  }
  get boundedContext(): string {
    return 'driver';
  }
  @Traceable({
    operation: 'BecomeUnavailableCommandHandler',
    metrics: {
      name: 'BecomeUnavailableCommandHandler',
      category: 'commandHandler',
    },
  })
  async execute(
    command: BecomeUnavailableCommand
  ): Promise<BecomeUnavailableCommandHandlerResponse> {
    const driverAvailability =
      await this.driverAvailabilityRepository.getDriverAvailability(command.id);
    if (driverAvailability.isFail()) {
      return fail(driverAvailability.value);
    }
    if (driverAvailability.value === null) {
      return fail(new ApplicationErrors.DriverNotFoundError(command.id));
    }
    driverAvailability.value.BecomeUnavailable();
    return ok();
  }
}
