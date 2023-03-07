export type TAccountReadModelSnapshot = {
  id: string;
  balance: {
    currency: string;
    amount: number;
  };
};

export class AccountReadModel {
  constructor(
    public props: TAccountReadModelSnapshot
  ) {}

  static fromPrimitives(snapshot: TAccountReadModelSnapshot): AccountReadModel {
    return new AccountReadModel(snapshot);
  }
}
