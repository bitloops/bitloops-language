import { Application } from '@bitloops/bl-boilerplate-core';
import { DriverAvailabilityReadModel } from '../domain/driver-availability.read-model';
export type DriverAvailabilityReadRepoPort =
  Application.Repo.ICRUDReadPort<DriverAvailabilityReadModel>;
