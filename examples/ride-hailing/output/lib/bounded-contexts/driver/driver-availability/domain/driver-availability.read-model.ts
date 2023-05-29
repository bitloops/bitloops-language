export type TDriverAvailabilityReadModelSnapshot = {
  id: string;
  availabilityStatus: string;
};
export class DriverAvailabilityReadModel {
  public id: string;
  public availabilityStatus: string;
  constructor(props: TDriverAvailabilityReadModelSnapshot) {
    this.id = props.id;
    this.availabilityStatus = props.availabilityStatus;
  }
  static fromPrimitives(
    snapshot: TDriverAvailabilityReadModelSnapshot
  ): DriverAvailabilityReadModel {
    return new DriverAvailabilityReadModel(snapshot);
  }
}
