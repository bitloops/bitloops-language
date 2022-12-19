---
sidebar_label: UseCase
title: Bitloops Language - UseCase - Basic Syntax 
description: UseCase syntax on Bitloops Language - Use Cases define the main features of an application and coordinate the execution of tasks by entities, domain services and any other code in the system.  
keywords: [bitloops, bitloops language, basic syntax, programming language, variables, types, objects, data types, classes, interfaces, modules, functions, loops, services]
---

# UseCase

### Definition

**_UseCases_** (also known as Application Services) are the main features of the application. They coordinate among [Entities](https://bitloops.com/docs/bitloops-language/components/entity), Domain Services, handle database commands/queries and can issue out [Integration Events](https://bitloops.com/docs/bitloops-language/components/integration-event). They perform either a COMMAND(like _createTodo_) or a QUERY(like _getTodoById_) against the system.

We should strive to push all business domain logic into the domain model, whether that be in [Aggregates](https://bitloops.com/docs/bitloops-language/components/entity), [ValueObjects](https://bitloops.com/docs/bitloops-language/components/value-object) or
Domain Services. Keep Application Services thin, using them only to coordinate tasks on the model. [^vaughnvernon2013]

### Examples

##### Declaring a UseCase

```typescript
  UseCase UpdateTodoUseCase (todoRepo: TodoWriteRepoPort) {
    execute (requestDTO: UpdateTodoRequestDTO): (OK(void), Errors(ApplicationErrors.ToDoNotFoundError)) {
      const requestId = UUIDv4(requestDTO.id);
      const todoFound = this.todoRepo.getById(requestId);
      if(NOT todoFound) {
        const requestIdString = requestId.toString();
        return ApplicationErrors.ToDoNotFoundError(requestIdString);
      }

      const title = TitleVO({ title: requestDTO.title });

      const todo = TodoEntity({ title: title, completed: requestDTO.completed, id: requestId });
      this.todoRepo.update(todo);
    }
}
```

##### Using a UseCase

The **_UseCase_** is used inside a controller like this:

```typescript
const result = this.updateTodoUseCase.execute(dto);
```

### Syntax

##### Declaring a UseCase

```typescript
  UseCase <identifier name with a UseCase suffix> (<dependencies of UseCase>) {
      execute (<DTO>): (OK(<bitloopsPrimaryType>), Errors(<errorIdentifier '|' errorIdentifier...>)) {
          <statements>
      }
  }
```

##### Using a UseCase

```typescript
  this.<use case identifier name>.execute(<dto identifier name>);
```

References for the above:

- [DTO](https://bitloops.com/docs/bitloops-language/components/dto)

### Further reading

- [Application Layer Use Cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)
- [Application Service Explanation](<https://stackoverflow.com/questions/2268699/domain-driven-design-domain-service-application-service#:~:text=Application%20service%20is%20that%20layer,back%20there%20(or%20not).>)

[^vaughnvernon2013]: Vaughn Vernon, Implementing Domain-Driven Design, 2013
