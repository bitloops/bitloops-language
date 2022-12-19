---
sidebar_position: 3
sidebar_label: Define an Entity
title: Entity - How to define one with Bitloops?
description: An Entity is a variable in Bitloops Language with its own identify. Learn how to define an Entity using BL to increase cohesion of your application.
keywords: [Entity, programming variable, high-cohesion, domain models, ddd, domain driven design, domain, entities, aggregates]
---

# Define an Entity

An Entity is an object (or variable) that has identidy. This means it is unique and can be referenced by other objects using its ID. 

To declare an Entity with Bitloops Language, you simply define your entity variable and name, adding an "Entity" suffix:

```typescript
Entity TitleEntity {
 constructor(props: TodoProps): (OK(TodoEntity), Errors(DomainErrors.InvalidTitleError))
  }
```

Now, in Bitloops Language specifically, to ensure good coding practice, there is the concept of [Root Entity](https://bitloops.com/docs/bitloops-language/components/entity). This is a special type of Entity as its the Entity that can be referenced by other objects in the application. 

To declare this type of Entity, you should simply add Root as a prefix: 

```typescript
Root Entity TitleEntity {
 constructor(props: TodoProps): (OK(TodoEntity), Errors(DomainErrors.InvalidTitleError))
  }
```
