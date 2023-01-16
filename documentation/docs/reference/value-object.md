---
sidebar_label: ValueObject
title: Bitloops Language - ValueObject - Basic Syntax 
description: ValueObject syntax on Bitloops Language - Value objects are objects that do not have an identidy. There are objects that represent a characteristic and do not identify an variable or object.   
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services]
---

# ValueObject

### Definition
Value Objects are objects that have no conceptual identity and describe some characteristics of a thing.
They are defined only by their properties and their equality is not based on identity. 


### Examples

##### Declaring a ValueObject

```typescript
ValueObject TitleVO {
  constructor(props: TitleProps): (OK(TitleVO), Errors(DomainErrors.TitleOutOfBoundsError)) {
    applyRules(TitleOutOfBoundsRule(props.title));
  }
}
```

##### Using a ValueObject
```
const title = TitleVO({ title: requestDTO.title });
```

### Syntax

##### Declaring a Value Object

```typescript
ValueObject <identifier name with a VO suffix> { 

  //constant variable declarations
  const <identifier> : <type> = <expression>;
  
  // constructor declaration, here we define whatever needs specific handling during the creation of the value object and 
  //we use applyRules to ensure its validation. By default automatic getters are generated.
  constructor(<props of the ValueObject>) : (OK(<type>), Errors(<DomainErrorIdentifier> '|' <DomainErrorIdentifier>...)) {
    <statements>
  }
  
  // private method declaration
  <[optional] private> <method identifier> (<arg, arg...>): <type> {
    <statements>
  }
  
}
```

##### Creating a Value Object


```typescript
<name of Value Object>(<props>);
```

References for the above:
* [props](https://bitloops.com/docs/bitloops-language/components/props)


### Further reading
- [Value Objects-Martin Fowler](https://martinfowler.com/bliki/ValueObject.html)
