# PackagePort

The PackagePort component is a tool which will help you utilize external libraries of the target transpilation language. It acts as an interface, in order to declare methods which will be later be implemented by the corresponding ServiceAdapter. Its name and functionality is inspired by the [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) (or Ports and Adapters architecture).

## Syntax
 ```typescript
  PackagePort GherkinPackagePort {
    encode(value: string): bytes;
  }
 ```
 
The declaration starts with the reserved word **PackagePort** and then the name of the package which should end with the word *Port*.
Then the signatures of the methods of the package will be declared with the corresponding parameter and return types, exactly as an interface is declare   in most languages.
 
The types of the method parameters and return type correspond to the language primitives.
