# Data Transfer Object (DTO)


### Definition

A Data Transfer Object (DTO) is an object that is used to encapsulate data and carry data between independent parts of the system or even between different systems (for example between Controllers adn client applications). DTOs are simple objects that do not contain any business logic or behaviour and are only used for storage, retrieval, serialization and deserialization of its own data. DTOs can reduce the number of method calls required between processes.   

DTOs are very common in other programming languages:
* TypeScript ->  represented as a type
* Go -> represented as a type struct
* Java -> represented as a JavaBean or POJO  


### Syntax
##### Declaring a DTO

Declaring a DTO is fairly simple:

`DTO` `<identifier name with a DTO suffix>` `{` `parameters list separated with semicolon` `}` .

Parameters in DTOs are written in the following format:

```typescript
[optional] parameterType parameterName;
```

Below you can see examples of DTOs in action.

```typescript
DTO HelloWorldRequestDTO {
  string name;
  optional string email;
}
```

```typescript
DTO HelloWorldResponseDTO {
  string message;
}
```

All parameters are automatically required and appropriate errors will be thrown in the controllers if required parameters are missing.  
To make a parameter optional you place the word optional in front of it.

##### Expressing a DTO

The expression of a declared DTO happens is written as follows:  
`<DTOName>` `(` `{` `parameters evaluation list separated with semicolon` `}` `)` `;` .

Parameters evaluation in DTO are written in the following format:

```typescript
parameterName: parameterValue;
```

For example, for the DTOs that have been declared above, the expression could be:

For `HelloWorldRequestDTO`:

```typescript
HelloWorldRequestDTO({
  name: 'John Doe',
  email: 'johndoe@somewhere.com',
});
```

As the parameter `email` is optional, it could also be:

```typescript
HelloWorldRequestDTO({
  name: 'John Doe',
});
```

For `HelloWorldResponseDTO`:

```typescript
HelloWorldResponseDTO({
  message: 'OK',
});
```

If a parameter is missing and it is not optional, appropriate errors will be thrown in the controllers.

Finally, a DTO can have nested [Structs](https://bitloops.com/docs/bitloops-language/components/mapper) in it as follows:

```typescript

DTO PersonDTO {
  string firstName;
  string lastName;
  Address address;
}

PersonDTO ({
  firstName: "Ada",
  lastName: "Lovelace",
  address: Address({ street: "Bond Street", streetNumber: StreetNumber({number: 28, numberPostfix: "B"}), postCode: "ABC 2F"}),
});
```

### Further reading

* [Wikipedia - Data Transfor Object](https://en.wikipedia.org/wiki/Data_transfer_object)
* [StackOverflow - What is a Data Transfer Object (DTO)?](https://stackoverflow.com/questions/1051182/what-is-a-data-transfer-object-dto)
* [Martin Fowler - Data Transfer Object](https://martinfowler.com/eaaCatalog/dataTransferObject.html)
* [Baeldung - The DTO Pattern (Data Transfer Object)](https://www.baeldung.com/java-dto-pattern)
