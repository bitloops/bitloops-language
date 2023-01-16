---
sidebar_label: RESTController
title: Bitloops Language - RESTController - Basic Syntax 
description: RESTController syntax on Bitloops Language - RESTController is used to make restful web services and handle requests made by clients. More specifically, it can handle REST APIs such as GET, POST, DELETE, PUT and PATCH.   
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services, restcontroller]
---

# RESTController

### Definition

**_RESTController_** is used for making restful web services and handle the requests made by the client. It allows to handle all REST APIs such as GET, POST, DELETE, PUT, PATCH requests.
**_RestController_** creates the request [DTO](https://bitloops.com/docs/bitloops-language/components/dto) and executes the [UseCase](https://bitloops.com/docs/bitloops-language/components/usecase) with this DTO created. Then, it just handles the result to present with the appropriate format and status code, the data to the client.

### Examples

##### Declaring a RESTController

```typescript
  RESTController UpdateTodoRESTController (updateTodoUseCase: UpdateTodoUseCase) {
  method: REST.Methods.PUT;
  execute(request, response) {
    const dto = UpdateTodoRequestDTO({ id: request.params.id, completed: request.body.completed, title: request.body.title  });

    const result = this.updateTodoUseCase.execute(dto);

    if (result is Error) {
      switch (result.getClass()) {
        case ApplicationErrors.ToDoNotFoundError: {
          this.notFound(response, result);
          break;
        }
        default: {
          this.fail(response, result.message);
        }
      }
    } else {
      this.ok(response);
    }
  }
}
```

### Syntax

##### Declaring a RESTController

```typescript
  RESTController <identifier name with a Controller suffix> (<dependencies>) {
      method: REST.Methods.<REST API Methods>;
      execute (<request>, <response>) {
        <statements>
        <UseCase execution statement>
        <statements>
      }
  }
```

References for the above:

- [UseCase](https://bitloops.com/docs/bitloops-language/components/usecase)

### Further reading

- [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api)
