---
sidebar_label: Rule
title: Rule - Basic Syntax
description: Rule syntax on Bitloops Language - Rule ...
keywords:
  [
    bitloops,
    bitloops language,
    basic syntax,
    programming language,
    variables,
    types,
    objects,
    data types,
    classes,
    interfaces,
    modules,
    functions,
    loops,
    services,
    rule,
  ]
---

# Rule

A Rule or a Business Rule is a language element which captures some business rules of the language. They are used inside the domain layer to enforce the invariants.
It provides a structured way to encapsulate complex business conditions and exceptions, ensuring they are consistently enforced across the domain layer of your application.

## Syntax

Each Rule can throw a Domain Error when its associated condition is not satisfied. The Domain Error serves as an exception mechanism indicating a violation of business rules.

For instance, let's consider the following Domain Error:

```typescript
DomainError InsufficientBalanceError(balance: float) {
    message: `Insufficient balance: ${balance} in account`,
    errorId: 'INSUFFICIENT_BALANCE`
}
```

This error is thrown when an operation attempts to reduce an account's balance below zero.

We define the corresponding Domain Rule, AccountCannotHaveNegativeBalanceRule, as shown below:

We would declare the corresponding Domain Rule like this:

```typescript
Rule AccountCannotHaveNegativeBalanceRule(amount: float, balance: float) throws DomainErrors.InsufficientBalanceError {
    const balanceUpdated = balance - amount;
    isBrokenIf(balanceUpdated < 0, (balanceUpdated, amount));
}
```

Here, the `AccountCannotHaveNegativeBalanceRule` Rule encapsulates the invariant that an account's balance cannot become negative. If the amount to be subtracted from the balance would result in a negative value, the `isBrokenIf` function throws the `InsufficientBalanceError` Domain Error.

### Using isBrokenIf

The `isBrokenIf` function is central to a Domain Rule definition. This function accepts two arguments:

1. A boolean condition to be evaluated.
2. The arguments to be passed to the Domain Error, in case the condition is evaluated to `true`.

The second argument of `isBrokenIf` maps directly to the parameters of the Domain Error. In the `AccountCannotHaveNegativeBalanceRule` example above, `(balanceUpdated, amount)` are passed as the second argument, which are then utilized by the `InsufficientBalanceError`.

```typescript
isBrokenIf(balanceUpdated < 0, (balanceUpdated, amount));
```

In situations where the Domain Error does not expect any arguments, you can omit the second argument from `isBrokenIf`.

For example, if we have a `GenericError` that doesn't expect any arguments:

```typescript
DomainError GenericError() {
  message: `A generic error has occurred`,
  errorId: 'GENERIC_ERROR`
}
```

We could write a corresponding rule like this:

```typescript
Rule SomeGenericRule(parameter: string) throws DomainErrors.GenericError {
  const someCondition = /_ evaluate some condition _/
  isBrokenIf(someCondition);
}
```

Here, the `isBrokenIf` function only requires the condition to be evaluated because `GenericError` doesn't take any additional arguments.
