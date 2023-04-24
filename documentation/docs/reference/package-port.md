---
sidebar_label: PackagePort
title: Package Port - Basic Syntax
description: PackagePort syntax on Bitloops Language - Package Port allows developers to quickly use external libraries by acting as an interface between the Bitloops application and that external library.
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
    PackagePort,
    packageadapter,
  ]
---

# PackagePort

The PackagePort component is a tool which will help you utilize external libraries of the target transpilation language. It acts as an interface, in order to declare methods which will be later be implemented by the corresponding ServiceAdapter. Its name and functionality is inspired by the [Hexagonal Architecture](https://bitloops.com/docs/bitloops-language/learning/software-architecture/hexagonal-architecture) (or Ports and Adapters architecture).

## Syntax

```typescript
 PackagePort GherkinPackagePort {
   encode(value: string): bytes;
 }
```

The declaration starts with the reserved word **PackagePort** and then the name of the package which should end with the word _Port_.
Then the signatures of the methods of the package will be declared with the corresponding parameter and return types, exactly as an interface is declare in most languages.

The types of the method parameters and return type correspond to the language primitives.
