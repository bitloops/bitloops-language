export type TNameReadModelSnapshot = { name: string };
export class NameReadModel {
  constructor(public props: TNameReadModelSnapshot) {}
  static fromPrimitives(snapshot: TNameReadModelSnapshot): NameReadModel {
    return new NameReadModel(snapshot);
  }
}
