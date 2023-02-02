export type TCustomerReadModelSnapshot = {
  id: string;
  email: string;
  accountId: string;
};

export class CustomerReadModel {
  constructor(public id: string, public email: string, public accountId: string) {}

  static fromPrimitives(snapshot: TCustomerReadModelSnapshot): CustomerReadModel {
    return new CustomerReadModel(snapshot.id, snapshot.email, snapshot.accountId);
  }
}
