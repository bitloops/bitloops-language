---
sidebar_position: 3
sidebar_label: Define a DTO
title: DTO - How to define one with Bitloops?
description: A Data Transfer Object (DTO) is an object that carries data between processes. Learn how to define a DTO with Bitloops Language to improve encapsulation of your application.
keywords: [dto, data transfer object, encapsulation, martin fowler, carry data, domain models, ddd, domain driven design, domain]
---

# Define a DTO

Bitloops language is built from the ground up using software engineering principles and best practices. DTOs allow you to better encapsulate data and carry it between independent parts of the system. 

In Bitloops Language you simply define a DTO:

`DTO` `<identifier name with a DTO suffix>` `{` `parameters list separated with semicolon` `}` .

Parameters in DTOs are written in the following format:

```typescript
[optional] parameterType parameterName;
```
As you can see, it is possible to make a parameter optional by placing the word optional in front of it.

Below is an example of DTOs in action.

```typescript
DTO ExampleRequestDTO {
  string name;
  optional string surname;
}
```

```typescript
DTO HExampleResponseDTO {
  string message;
}
```

By default, all parameters are required (unless optional is used in front) and errors will be thrown in the controllers if parameters are missing.  

To learn more about DTOs, read this reference guide on [DTOs](https://stackoverflow.com/questions/1051182/what-is-a-data-transfer-object-dto)
