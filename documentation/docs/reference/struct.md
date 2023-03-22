---
sidebar_label: Struct
title: Struct - Basic Syntax
description: Struct syntax on Bitloops Language - Structs are used to store items in key/value pairs to then be accessed with the use of an index. Structs are similar to objects in Javascript.
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
    struct,
  ]
---

# Struct

### Definition of Struct

A Struct is used to store items in key/value pairs, which can then be accessed by the use of an index. You can think of Structs in BL as similar to Objects in Javascript, Hash maps in Java or Dictionaries in Python.  
Structurally Structs are similar to DTOs, but you can use them as domain method arguments, local variables and so forth.

### Declaration of Struct

You declare a Struct by defining its properties and types:

`Struct` `<identifier name>` `{` `parameters list separated with semicolon` `}` .

Parameters in Structs are written in the following format:

```typescript
[optional] parameterType parameterName;
```

Below you can see examples of Structs in action.

```typescript
Struct Person {
    string name;
    optional int32 age;
}
```

You can also declare nested Structs.

```typescript
Struct Person {
    string name;
    optional int32 age;
    Address address;
}

Struct Address {
    string street;
    int32 number;
}
```

All parameters are required by default. To make a parameter optional you place the word optional in front of it.

### Expression of Struct

You can use a declared Struct as follows:  
`<StructName>` `(` `{` `parameters evaluation list separated with semicolon` `}` `)` `;` .

Parameters evaluation in Structs are written in the following format:

```typescript
parameterName: parameterValue;
```

For example, for the Structs mentioned above, the expression could be:

```typescript
const person = Person({ name: "Jane Doe" });
```

Or if you have declared a nested Struct:

```typescript
const person = Person({
  name: "Jane Doe",
  address: Address({ street: "Main Street", number: 42 }),
});
```
