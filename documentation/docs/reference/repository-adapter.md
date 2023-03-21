---
sidebar_label: RepoAdapter
title: Repository Adapter - Basic Syntax 
description: RepoAdapter syntax on Bitloops Language - Repository Adapters allow developers to declare the actual concretion of the repository port that allows the system to connect to different databases easily.  
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services, repoadapter, repository adapter]
---

# RepoAdapter

The RepoAdapter component is a tool which helps to declare the actual concretion of the **RepoPort**,
in order to plug in different databases easily. Its name and functionality is inspired by the Repository Pattern.
More information not available yet!

### Syntax
```
Not available yet! 
```

## CRUDRepoAdapter
The CRUDRepoAdapter is a RepoAdapter which utilizes the **CRUDRepoPort**.

### Syntax
```typescript
 RepoAdapters.Mongo concretes [Demo][Hello World]MyHelloRepoPort;
```
In order to utilize the RepoAdapter the declaration above is needed:

```RepoAdapters.Mongo```: Here the actual database of the concretion is declared from the available system databases.

```concretes```: A reserved word to attach a spesific port to the **RepoAdapter**.

```[Demo][Hello World]MyHelloRepoPort```: Here the specific **RepoPort** is declared in order to attach it to the specific concretion. ``[Demo]`` represents the bounded context where the specific port is declared. ```[Hello World]``` is the specific module where is the specific **RepoPort** declaration is located, followed by the ```MyHelloRepoPort``` which is the exact name of the **RepoPort**which have been declared.

After the declaration the system creates actual implementation of the adapter using mongoDB, under the hood.

### Example
For example in order to create a concretion with mongoDB for the example dicussed at the RepoPort (for the **CRUDRepoPort**), the concretion declaration would be something like this: 
```typescript
 RepoAdapters.Mongo concretes [Sales][CarSelling]CarRepoPort;
```
