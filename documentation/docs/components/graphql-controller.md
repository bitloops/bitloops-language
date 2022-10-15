# GraphQLController

GraphQL Controllers act like a resolver, while also defining their schema. You define the operation input which must be a DTO declared inside the same module with the Controller.

It is also necessary to define the [operation type](#operation-type) of the controller, as a result defining the interaction of the controller with the GraphQL clients.

#### **`controller-graphql.bl`**

```ts
GraphQLController HelloWorldGQLController () {
  operation: GraphQL.Operations.Query;
  input: HelloWorldRequestDTO;

  execute (request): HelloWorldResponseDTO {
    const response = HelloWorldResponseDTO({
        message: 'Hello World!'
    })
    return this.ok(response);
  }
}
```

It is important that you return a value, either success or error, otherwise the operation will fail.

### Operation type

| OperationType                   | Description                                                          |
| ------------------------------- | -------------------------------------------------------------------- |
| GraphQL.Operations.Query        | a read‐only fetch.                                                   |
| GraphQL.Operations.Mutation     | a write followed by a fetch.                                         |
| GraphQL.Operations.Subscription | a long‐lived request that fetches data in response to source events. |

### Return values and error-handling

| OperationType                       | Description                  |
| ----------------------------------- | ---------------------------- |
| this.ok(DTO)                        | regular response for success |
| this.clientError(message?: string)  | UserInputError               |
| this.unauthorized(message?: string) | AuthenticationError          |
| this.forbidden(message?: string)    | ForbiddenError               |
| this.fail(error: Error \| string)   | ApolloError                  |
