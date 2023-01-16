---
sidebar_label: ReadModel
title: Bitloops Language - ReadModel - Basic Syntax 
description: ReadModel syntax on Bitloops Language - Read Model is simply a model that is built specifically for queries and reading the data. This improves performance and reduces communication costs.  
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services]
---

# ReadModel

### Definition

A **_Read Model_** is a model specialized for reads, that is, queries. Queries are performed to obtain the data needed by the client applications, so the returned type can be specifically made for the clients and it can simply be a JSON object. So a **_Read Model_** is a data structure for displaying information that is in some way based on a Write Model.

### Examples

##### Declaring a ReadModel

```typescript
  ReadModel TodoReadModel {
    string id;
    string title;
    bool completed;
  }
```

### Syntax

##### Declaring a ReadModel

```typescript
    ReadModel <identifier name with a ReadModel suffix> {
        <parameters list separated with semicolon>
    }
```

### Further reading

- [Implement reads in a microservice](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/cqrs-microservice-reads)
- [Read Model on the write side](https://dev.to/alexlawrence/read-model-on-the-write-side-107d)
