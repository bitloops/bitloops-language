const obj = {
  id: 'string',
  price: {
    currency: {
      primitiveValue: {
        primitiveValue: {
          currencyCode: 'string',
        },
        identifier: 'Domain.StandardVO.Currency.Value',
        isStandardVO: true,
      },
      identifier: 'MoneyVO',
    },
    amount: {
      primitiveValue: 'number',
      identifier: 'MoneyVO',
    },
  },
};
console.log(obj);
