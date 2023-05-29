import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { DriverAvailabilityEntity } from '../domain/driver-availability.entity';
export type DriverAvailabilityWriteRepoPort = Application.Repo.ICRUDWritePort<
  DriverAvailabilityEntity,
  Domain.UUIDv4
>;
