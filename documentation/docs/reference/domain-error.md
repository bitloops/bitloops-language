---
sidebar_label: DomainError
title: DomainError - Basic Syntax 
description: DomainError syntax on Bitloops Language - Domain Erros occur when there is an error in the domain layer of your application and its important to have a predefined template to better manage these errors when they occur.  
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services]
---

# DomainError

## Overview

The domain error component helps you better organize the errors associated with the domain of your application
by providing an understandable and easily modified template. This way your errors are well documented
and identifiable by both the developers and users of your application.

## Syntax

```typescript
 DomainError InvalidName(name: string) {
   message: `${name} is an invalid name`,
   errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',
 }
```

As you might have observed the command mainly consists of 2 fields the `message` and the
`errorId`. The `errorId` is the unique identifier of your domain errors and it
helps you better identify them in your application.

The `message` property is were you get specific on what your error actually mean. This
part will most likely be the one that is displayed to the people interacting
with your application and it is where good definition actually plays a big role.
Luckily the bitloops language utilizes typeScript's
[template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
mechanism that enables the injection of variables in your message string.
You can use the arguments that are passed in your object to dynamically
define your errors based on circumstances.

As you can observe in the example above we can utilize this mechanic and be
more specific about the name that caused the error.

## Usage Example

```typescript
ValueObject Name {
  const regName = /^[a-zA-Z ]{2,30}$/;

  isInvalidName(name: string): bool {
    return !regName.test(name);
  }

  create(props: NameProps): (OK(Name), Error(DomainErrors.InvalidName)) {
    if (isInvalidName(props.name)) {
      return new DomainErrors.InvalidName(props.name);
    } else {
      return new Name(props);
    }
  }
}

DomainError InvalidName(name: string) {
  message: `${name} is an invalid name`,
  errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',
}
```

As you can see in the example above the validity of the name is something that
is related with your domain and it is therefore a meaningful error. It is therefore
defined inside the Name entity and it is returned at the appropriate case of the
create method.
