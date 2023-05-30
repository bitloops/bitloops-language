import { Application } from '@bitloops/bl-boilerplate-core';
type TGetDriverAvailabilityQuery = {
  id: string;
};
export class GetDriverAvailabilityQuery extends Application.Query {
  public readonly id: string;
  constructor(getDriverAvailabilityRequestDTO: TGetDriverAvailabilityQuery) {
    super('driver');
    this.id = getDriverAvailabilityRequestDTO.id;
  }
}
