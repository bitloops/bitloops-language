---
sidebar_position: 3
sidebar_label: Define a Value Object
title: Value Object - How to define one with Bitloops?
description: A Value Object is a variable in Bitloops Language without identify. Learn how to define a Value Object using BL to increase cohesion of your application.
keywords: [value object, programming variable, high-cohesion, domain models, ddd, domain driven design, domain, entities, aggregates]
---

# Define a Value Object

A value object is simple an object (or variable) that do not have any identity. This is the key difference between value objects and entities. Value objects simply describe some characteristics of a thing.

To declare a value object with Bitloops Language, you simply define your value object variable and name, adding a VO suffix:

```typescript
ValueObject TitleVO {
  constructor(props: TitleProps): (OK(TitleVO), Errors(DomainErrors.TitleOutOfBoundsError)) {
    applyRules(TitleOutOfBoundsRule(props.title));
  }
}
```
