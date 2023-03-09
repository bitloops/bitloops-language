export type TNameReadModelSnapshot = { name: string };
export class NameReadModel {
  public name: string;
  constructor(props: TNameReadModelSnapshot) {
    this.name = props.name;
  }
  static fromPrimitives(snapshot: TNameReadModelSnapshot): NameReadModel {
    return new NameReadModel(snapshot);
  }
}
