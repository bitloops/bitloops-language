export type AccountReadModel = {
  id: string;
  balance: {
    currency: string;
    amount: number;
  };
  // customerId: string;
};
