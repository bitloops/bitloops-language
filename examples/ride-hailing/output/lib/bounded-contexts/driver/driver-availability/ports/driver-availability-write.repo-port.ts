import { Application } from '@bitloops/bl-boilerplate-core';
import { DriverAvailabilityEntity } from '../domain/driver-availability.entity';
export type DriverAvailabilityWriteRepoPort = Application.Repo.ICRUDWritePort<
  DriverAvailabilityEntity,
  string
>;
