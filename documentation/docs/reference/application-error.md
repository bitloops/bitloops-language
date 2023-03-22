---
sidebar_label: ApplicationError
title: ApplicationError - Basic Syntax
description: ApplicationError syntax on Bitloops Language - Application Erros occur when there is an error in the application layer where interaction with external parts is initiated
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
  ]
---

# ApplicationError

## Overview

As discussed in the [domain error](./domain-error.md) component you
already have a good abstraction for meaningful errors for your problem space, but
what happens with unexpected errors caused by the environment of your system?

In a similar logic you need a different wrapper that helps you distinguish those
exceptions from your domain errors.
This abstraction is named application error since those types of problems are
caused during a use case execution (application layer) where interaction with external parts is initiated.

## Syntax

```typescript
ApplicationError DatabaseError(error: string) {
    message: `the following ${error} happened in the db`,
    errorId: 'd0cc35f0-37f7-11ed-a261-0242ac120002',
  }
```

The syntax is similar to the [domain error syntax](./domain-error#syntax) since
as discussed, the purpose of this component is to help you have better
separation between those main categories of errors.

## Usage Example

```typescript
UseCase CreateBookingUseCase () {
  execute(createBookingRequestDTO: CreateBookingRequestDTO):
  (OK(CreateBookingResponseDTO), Errors(DomainErrors.InvalidBooking, ApplicationErrors.UndefinedName))
  {
    ...
  let booking;
  try {
    // We don't own this code, so we'll wrap it in a try-catch
    booking = db.Booking.save({ name, date })
  } catch (err) {
    return new ApplicationError(new DatabaseError)
  }
  return success(new CreateBookingSuccess(booking.bookingId))
  }
}
```

Consider a use case where you want to create a booking for a hotel. As showed in
the example above there will eventually come a point that you will want to
interact with the infrastructure layer of your system and save your result in the
database. With the use of the appropriate application error you can properly
define a possible malfunction of this external process while still keeping it
separate from your domain errors.
