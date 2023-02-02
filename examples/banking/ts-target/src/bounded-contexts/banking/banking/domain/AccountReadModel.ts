export type TAccountReadModelSnapshot = {
  id: string;
  balance: {
    currency: string;
    amount: number;
  };
};

export class AccountReadModel {
  constructor(
    public id: string,
    public balance: {
      currency: string;
      amount: number;
    },
  ) {}

  static fromPrimitives(snapshot: TAccountReadModelSnapshot): AccountReadModel {
    return new AccountReadModel(snapshot.id, snapshot.balance);
  }
}
