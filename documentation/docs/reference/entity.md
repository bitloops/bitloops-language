---
sidebar_label: Entity
title: Entity - Basic Syntax 
description: Entity syntax on Bitloops Language - An entity is a representation of an object that has an identity. It is unique!
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services, entity]
---

# Entity

An *entity* is an object defined primarily by its idenity. [^Evans2004]

The above definition requires all ***Entities*** to have some sort of identifier attached to them.
This is unlike a [ValueObject](./value-object.md) that holds attributes with specific qualities but no identifier to distinguish
between different values.

An example of an ***Entity*** could be an *Address* that has a unique identifier through
which it can be referenced by other ***Entities*** using its Id without needing to directly store the values of the ***Entity*** in that object. On the other hand, an *Address* could alternatively be represented by a [ValueObject](./value-object.md) under different circumstances. In a software printing out envelopes, an *Address* could simply be a
[ValueObject](./value-object.md) because it would represent just
a value being printed on an envelope. Nonetheless, for a postal service an
address's history might need to be tracked e.g. to forward mail sent to the old address, to the new address, in which case an ***Entity*** would be more appropriate.

A very special type of ***Entity*** is the ***Root Entity***. You can think of a ***Root Entity*** as an entity that can be directly looked up using just its Id without relying on a different ***Entity***. For example, in the context of a purchase order, you could have several lines of items (Item 1, Item 2, Item 3 etc.) within that purchase order. Item 1 on its own doesn't mean much, and so a request to a URL such as https://myexamplemarketplace.com/items/1 would make no sense because the Id 1 only makes sense within a specific purchase order such as this https://myexamplemarketplace.com/purchase-order/123/items/1. In this example, the purchase order would have to be a ***Root Entity*** and not a "simple" Entity whereas the item would be just an ***Entity***. If you need help with these concepts don't hesitate to reach out on our Discord.  

In the literature, you will see a lot of time the words *Aggregate* and *Aggregate Root*. An *Aggregate* is the conceptual combination of a Root Entity and the boundary of all other ***Entities*** placed inside the ***Root Entity*** whereas, an *Aggragate Root* is the ***Root Entity*** of the *Aggregate*. 

***Important***: An ***Entity*** can be included in only a single ***Root Entity*** but could be referenced using its Id in several. Other ***Root Entities*** can also be referenced by their Ids in another ***Root Entity*** but cannot be included into another directly.  

## Example

```ts
// This is the Root Entity definition - for a simple entity just remove the Root before the Entity
Root Entity TodoEntity {
  // Props are automatically converted into class variables with getters and setters.
  // If you want to make them private then you need to add the word private before the property declaration
  // e.g. private title Title;
  // In such a case, no getter / setter methods are going to be created and you will only be able to access
  // the variable from within class methods.
  // To access a class variable you use "this." infront of the name of the variable e.g. this.title 
  constructor(props: TodoProps): (OK(TodoEntity), Errors(DomainErrors.InvalidTitleError)) {}

  // methods that return OK/Errors are automatically public, if you need a private one that returns OK/Errors
  // you can add "private" before the method name e.g. private complete()
  complete(): (OK(), Errors()) {
    this.completed = true;
  }

  uncomplete(): (OK(), Errors()) {
    this.completed = false;
  }

  updateTitle(title: string): (OK(), Errors(DomainErrors.InvalidTitleError)) {
    this.title = TitleVO({title: title});
    return this.title.getTitle();
  }
}

// Props are used to define the required (or optional) properties of a class (such as ValueObject, Entity, UseCase etc.)
Props TitleProps {
  Title title;
}

// A Rule is used to validate the values of a ValueObject
Rule IsValidTitle(title: string) throws DomainErrors.InvalidTitleError {
  isBrokenIf(title > 150 OR title < 4);
}

// An Entity usually contains ValueObjects or other Entities
ValueObject TitleVO {
  constructor(props: TitleProps): (OK(TitleVO), Errors(DomainErrors.InvalidTitleError)) {
    applyRules(IsValidTitle(props.title));
  }
}

DomainError InvalidTitleError(title: string) {
  message: `Title ${title} is out of range`,
  errorId: 'fe53432-8ef7-42349-ab67-cb83d1d7772fe',
}
```

[^Evans2004]: Eric Evans, Domain Driven Design, 2004
