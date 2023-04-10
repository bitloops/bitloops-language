---
sidebar_position: 2
sidebar_label: Quick Start
title: Bitloops Quick Start - Learn Bitloops Language quickly
description: This article explains how to get started with Bitloops very quickly. It provides a demonstration of how to get it up and running, how it works and how to begin exploring its features and capabilities.  
keywords: [bitloops, software engingeering, software architecture, clean code, learning programming, learning coding, software development, better programming]
---

# Quick Start 

How to create a ToDo App with BL

Creating a To Do App as example

## Project structure

BL needs an input folder with a setup.bl file and the essential controllers of the use cases which will be transpiled.
  
The structure of the input folder must be as the following:
```
📦 .
 ┣ 📂To Do App                # Bounded Context Name
 ┃ ┗ 📂To Do                  # Module Name
 ┃ ┃ ┗ 📂Use Cases            # Standard Name (Do not change!)
 ┃ ┃ ┃ ┗ 📂Add To Do          # Use Case
 ┃ ┃ ┃ ┃ ┗ 📜controller.bl			
 ┃ ┃ ┃ ┗ 📂 ...	              # Another Use Case	
 ┗ 📜setup.bl

```
### setup.bl file
Setup file must be located in the root directory of the input folder.  

#### Format

##### Language configuration (optional)  
Configure which language the bl will be transpiled to.
Fow now, only Typescript-Nest is supported and it is selected by default.  
More languages to follow.

```typescript
Config.setLanguage(Typescript-Nest);
```

##### Router definition (REST)
Declare your router and assign to it a router expression as the example:
```typescript
const toDoRESTRouter = RESTRouter(REST.Fastify) {
  Get('/add'): [To Do App][To Do]AddToDoRESTController();
// <Method>(<Path>): [<Bounded Context>][<Module>]<Controller>();
};
```
In accordance with Domain-Driven-Development principles, due to the ubiquitous language, **use cases** and **controllers** must have **unique names**.

##### Server expression (REST)
Instantiate your server and bind routes as the example:
```typescript
RESTServer({
  server: REST.Fastify,
  port: env.FASTIFY_PORT || 5001,
  apiPrefix: '/api',
}) {
  '/todo': toDoRESTRouter;
};
```

### controller.bl file
Controller file must be located in the directory of the Use Case it coordinates.

#### Format
##### Controller expression (REST)
Declare and instantiate your controller as the example:
```typescript
RESTController HelloWorldController () {
  method: REST.Methods.GET;
  execute(request, response) {
    this.ok(response, 'To Do added!');
  }
};
```  
 