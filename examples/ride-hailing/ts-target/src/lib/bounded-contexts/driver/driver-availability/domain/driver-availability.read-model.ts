export type TDriverAvailabilityReadModelSnapshot = {
  id: string;
  availabilityStatus: string;
  accountStatus: string;
};
export class DriverAvailabilityReadModel {
  public id: string;
  public availabilityStatus: string;
  public accountStatus: string;
  constructor(props: TDriverAvailabilityReadModelSnapshot) {
    this.id = props.id;
    this.availabilityStatus = props.availabilityStatus;
    this.accountStatus = props.accountStatus;
  }
  static fromPrimitives(
    snapshot: TDriverAvailabilityReadModelSnapshot
  ): DriverAvailabilityReadModel {
    return new DriverAvailabilityReadModel(snapshot);
  }
}
