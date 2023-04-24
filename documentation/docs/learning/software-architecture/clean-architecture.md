---
sidebar_position: 4
sidebar_label: Clean
title: "Clean Architecture Reference Guide: Everything You Need to Know About Clean Architecture" 
description: Clean Architecture offers a great understanding of how to build scalable, modular, maintainable software. Learn about its origins, benefits, and best practices, see real-world examples, and get ready to create better apps today! 
keywords: [clean architecture, Robert C. Martin, Uncle Bob, software architecture patterns, separation of concerns, layered architecture, modularity, scalability, benefits, agile development, continuous delivery, scalability, adaptability, software development]
---

# Introduction to Clean Architecture
Clean architecture is a software architecture pattern that has gained popularity in recent years due to its ability to create flexible, scalable, and maintainable software systems. 

The approach prioritizes the separation of concerns and the independence of frameworks and tools, allowing developers to focus on domain logic and business rules. 

Clean architecture is based on the principle that software systems should be designed with a clear separation of concerns, where each component of the system is responsible for a specific task or functionality. 


 <div style="text-align:center;vertical-align:middle;">
        <img src="https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/Clean-Architecture-Uncle-Bob.png" style="margin:auto; width:600px;" />
    </div>

<p style="text-align:center;vertical-align:middle;">
Clean Architecture Diagram, Image by Robert C. Martin
</p>


This separation allows developers to change the implementation of one component without affecting the rest of the system. Clean architecture also prioritizes the use of domain logic and use cases over technical details, allowing developers to focus on delivering value to the end-users.
In this article, we will explore the origins of clean architecture, how it differs from other software architecture patterns, and its relationship with domain-driven design (DDD). We will also discuss the benefits of clean architecture and provide examples of how it is used in practice. Understanding clean architecture is crucial for software developers who want to create high-quality, scalable, and maintainable software systems that can adapt to changing business requirements.

## Origins of clean architecture
Clean architecture was first introduced by Uncle Bob, a well-known software engineer, author, and speaker, in his book "Clean Architecture: A Craftsman's Guide to Software Structure and Design." Martin's book builds upon his earlier works, such as "Clean Code," "Agile Software Development, Principles, Patterns, and Practices," and "The Clean Coder."


 <div style="text-align:center;vertical-align:middle;">
        <img src="https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/clean-architecture-book-uncle-bob.jpg" style="margin:auto; width:300px;" />
    </div>

<p style="text-align:center;vertical-align:middle;">
Clean Architecture Book by Robert C. Martin
</p>

&nbsp;
&nbsp;

Uncle Bob’s motivation for creating clean architecture was to address the common problems that he observed in software development, such as rigid software systems that were difficult to maintain, high coupling between components, and a lack of modularity. He believed that these problems were caused by a focus on technical details rather than domain logic and business requirements.

Therefore, to address these issues, Uncle Bob developed a set of principles that prioritize the separation of concerns, the independence of frameworks and tools, and the focus on the business or domain logic. 

He proposed a layered architecture with clear boundaries and interfaces, where the domain logic is at the center of the system, and the outer layers are responsible for the delivery mechanisms, such as the user interface, database, or network. 
The ultimate goal is to create a flexible and maintainable software architecture that could adapt to changing business requirements.


## Clean Architecture - The Fundamentals!
The central theme of clean architecture is that it breaks up software systems into layers that are easier to maintain, making systems more flexible, maintainable, and testable over time. 



 <div style="text-align:center;vertical-align:middle;">
        <img src="https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/clean-architecture-cone.jfif" style="margin:auto; width:600px;" />
    </div>

<p style="text-align:center;vertical-align:middle;">
The Clean Architecture Cone - <a href="https://www.codingblocks.net/podcast/clean-architecture-make-your-architecture-scream/">Source</a>
</p>

&nbsp;
&nbsp;

At its core, Clean Architecture is based on the idea that software systems should be built around a set of core business rules or entities. These entities represent the fundamental concepts and relationships that underpin the application and encapsulate the enterprise business rules.

Entities are the primary building blocks of a software system, and they represent the business objects that are manipulated by the use cases. Entities encapsulate the core business rules, and they are not influenced by the user interface or any other external factor. The entities form the backbone of the application and are the most stable part of the architecture.

Use cases are the next layer in the Clean Architecture. They represent the application business rules, which are specific to the application and not to the enterprise. Use cases use entities to implement specific business rules and represent the various ways that the system can be used. Each use case represents a single action that the user can perform, and they operate on entities to produce the desired outcome.

The interface adapters layer is responsible for converting data between the outside world and the use case layer. This layer is where controllers, gateways, presenters, and other interface-related components reside. Controllers handle user input, while gateways are responsible for accessing external data sources, such as databases or web services. Presenters are responsible for rendering data in the user interface.

Finally, the external interfaces layer represents the interfaces that the system has with the outside world. These interfaces can include databases, user interfaces, web APIs, and other external systems. The external interfaces layer is responsible for translating data between the application and external systems.

The key idea behind Clean Architecture is to separate the application's core business rules from the external interfaces and implementation details. This separation ensures that the application is flexible and maintainable over time, as changes to external systems or interfaces do not affect the core business logic. Clean Architecture encourages developers to write code that is modular, testable, and maintainable, making it easier to evolve the system over time.



## Clean Architecture - Implementation rules
As already highlighted, clean architecture emphasizes the separation of concern, and in order to achieve this, clean architecture provides a set of key rules that developers should follow when implementing software systems.

These rules include:
- Dependency rule
- Use of interfaces
- Separation of concerns
- Domain models
- Testing

By following these rules, developers can create software systems that are well-defined, maintainable, and adaptable to changes over time.

### The dependency Rule
The dependency rule is perhaps the most important rule in clean architecture. This rule states that source code dependencies can only point inwards, towards higher-level policies and domain logic. This means that the inner layers of the system should not depend on the outer layers, but rather the other way around. This rule ensures that the domain logic and business rules are separated from the technical details and infrastructure concerns of the system, making the system more flexible and adaptable to changes over time.

### Use of Interfaces
Another key rule in clean architecture is the use of interfaces. By using interfaces, developers can create clear boundaries between different components of the system, making it easier to test and maintain the system over time. Interfaces also provide a way to ensure that different components of the system can be replaced or modified without affecting the rest of the system.

### Separation of Concerns
Clean architecture emphasizes the separation of concerns between different components of the system. This means that the domain logic and business rules should be separated from the technical details and infrastructure concerns of the system. By separating concerns, developers can focus on the domain logic and business requirements of the system, without getting bogged down in technical details or implementation details.

### Domain Models
Clean architecture encourages the use of domain models to represent the business logic of the system. Domain models provide a way to ensure that the business logic is separated from the technical details and implementation details of the system. By using domain models, developers can create a well-defined and maintainable architecture for the system - see next section about DDD

### Testing 
Finally, clean architecture emphasizes the importance of testing. By writing automated tests for the system, developers can ensure that the system is working as expected and that changes to the system do not introduce bugs or regressions. Automated tests also provide a way to ensure that the system is maintainable and adaptable to changes over time.


## The dependency rule - Learn this really well!
The Dependency Rule is a key principle in Clean Architecture that helps to minimize coupling between components, making the system more flexible and maintainable. 

It is important to use interfaces or protocols to represent abstractions, and to ensure that dependencies always point towards the stable abstractions and away from the volatile concrete implementations. 

The idea is to minimize the impact of changes in the volatile components of the system, such as databases, frameworks, or external libraries, on the stable and essential components of the system, such as the domain logic.

An incorrect usage of the Dependency Rule would be when a higher-level module depends on a lower-level module, or when both modules depend on each other. This creates tight coupling between the modules, which makes the system difficult to change and maintain. 

Another aspect of the Dependency Rule is the direction of the dependencies. The principle states that dependencies should always point towards the stable abstractions and away from the volatile concrete implementations. 

The best is to provide an example!
Below you can see a standard scenario where a user creates a todo on their Web-based ToDo application. 

 <div style="text-align:center;vertical-align:middle;">
        <img src="https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/Clean%20Architecture%20Use%20Case%20Example.png" style="margin:auto; width:600px;" />
    </div>

&nbsp;
&nbsp;

This is a typical flow, and may seem acceptable - the UI makes a data request from the Presenter, which in turn calls the Use Case, which in turn calls the controller to then present it back to the user. How else should the Controller get data from the web without having a dependency on it? Or even the Use Case on the Controller? 


However, as you can see in the figure below, dependencies are pointing outwards which is incorrect. The dependency rule states they should only point inwards - from the outer layers to the inner layers. This is an essential rule in the Clean Architecture design pattern, and one that is also used in other software architectures such as Onion and Hexagonal Architecture. 


In this case, we have a few dependencies that are correct:
- UI → Presenter (✅ Not Violating)
- Presenter → Translate Usecase (✅ Not Violating)

But then we get to a couple that do violate the dependency rule:
- Translate Usecase → Translate Controller (❌ Violating)
- Translate Controller → Web (❌ Violating)

#### So how do we fix this?

Well, in order to abide by the dependency rule, we need to invert the direction of the arrow, which can be achieved through the use of Polymorphism. By introducing an Interface between the two layers, we can invert the dependency, which is known as The Dependency Inversion Principle.

In cases where the Dependency Rule has been violated, we can implement the Dependency Inversion Principle to correct the issue. By doing so, we can ensure that our system remains flexible, maintainable, and less prone to errors, all of which are essential to building high-quality software.

The images below explain how we convert a seemingly outward dependency into an inward dependency,


 <div style="text-align:center;vertical-align:middle;">
        <img src="https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/Clean-architecture-dependency-rule-transformation.png" style="margin:auto; width:600px;" />
    </div>


&nbsp;
&nbsp;

By allowing the application to order what data it wants without caring how the database or API prepares that data, we can achieve a level of decoupling where the application does not depend on the database or API directly. 

This allows us to change the schema or implementation of the database or API without breaking the application as long as it continues to provide the data the application requires.

Additionally, following the single-way dependency rule helps to prevent the system from entering a deadlock state. For example, if the first layer depends on the second layer, and the second layer depends on the first layer, any changes made to one layer could potentially break the other layer. To avoid this, we should always make sure that dependencies point in one direction only, from the outer layer to the inner layer.

So, finally, we get an implementation such as this:

Or from a slightly different perspective, we can see that a properly designed system following the principles of Clean Architecture, only the outer layer has dependencies on the inner layer, and not the other way around. 



By following these principles, developers can build software systems that are more robust, flexible, and maintainable over time.

## How clean architecture works well with DDD

Clean architecture and domain-driven design (DDD) share several principles, making them complementary approaches to software development. 
DDD is an approach that prioritizes the importance of the domain model in software development, while clean architecture focuses on the separation of concerns and the use of clear boundaries and interfaces.

Clean architecture provides a flexible and adaptable architecture that can support the development of complex software systems through the clear separation of concerns between the domain logic and the infrastructure, which enables developers to implement the domain model without being influenced by technical details.

More specifically, in clean architecture, the domain logic is at the center of the system, and the outer layers, such as the user interface, database, or network, are responsible for the delivery mechanisms. 

This separation allows developers to change the implementation of one layer without affecting the rest of the system, but then the question is: how do I organize my business domain logic? 

 <div style="text-align:center;vertical-align:middle;">
        <img src="https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/clean-architecture-and-ddd.png" style="margin:auto; width:600px;" />
    </div>

<p style="text-align:center;vertical-align:middle;">
DDD and Clean/layered Architecture
</p>


This is where DDD comes in due to its focus on obtaining, defining and organizing business requirements that ensures software systems deliver value to the end-users. 

This focus on the domain logic and the business requirements allows developers to build software systems that are adaptable to changing business needs. 
The combination of clean architecture and DDD provides a powerful approach to software development that can support the creation of maintainable, scalable, and adaptable software systems that deliver value to end-users.

## Benefits of clean architecture

Clean architecture provides several benefits making it a powerful approach to software development that can support the creation of maintainable, scalable, and adaptable software systems that deliver value to end-users.

A comprehensive list of their benefits include:
**Separation of concerns:** Clean architecture provides a clear separation of concerns between the different components of a software system. This separation allows developers to focus on the domain logic and business rules, rather than technical details or infrastructure concerns.

**Independence of frameworks and tools:** Clean architecture allows developers to change the implementation of one component without affecting the rest of the system. This independence of frameworks and tools makes the system more adaptable to changes in business requirements or technology.

**Flexibility and scalability:** Clean architecture provides a flexible and adaptable architecture that can support the development of complex software systems. The layered architecture and clear boundaries and interfaces make it easy to add new features or modify existing ones, without affecting the rest of the system.

**Testability:** Clean architecture makes it easier to write automated tests, as the domain logic is separated from the infrastructure concerns. This separation also makes it easier to test the system at different levels, such as unit tests, integration tests, or acceptance tests.

**Maintainability:** Clean architecture provides a structure that makes it easier to maintain the system over time. The separation of concerns and the use of clear boundaries and interfaces make it easier to identify and fix bugs or add new features.

**Adaptability:** Clean architecture is well-suited to supporting agile development and continuous delivery that is commonly used in projects with regular changing business requirements. By separating concerns and focusing on domain logic and business requirements, developers can create software systems that can evolve over time to meet changing business needs.

**Compatibility with DDD:** Clean architecture and domain-driven design (DDD) are complementary approaches to software development. Clean architecture provides a flexible and adaptable architecture that supports the implementation of the domain model in DDD.

## Conclusion
It should be quite evident that clean architecture is a powerful way to design and build software that is easy to maintain, update, and scale. 

By following its rules, developers can separate different parts of the app into layers, focus on important parts of the app code, and make it easier to test and update. 

Clean Architecture also encourages developers to use interfaces, break down the app into smaller parts, and focus on what's most important for the app to work well.

While there are many different software architecture patterns to choose from, clean architecture has become a popular choice because of its flexibility, scalability, and focus on maintainability. 

—----------------------------------------------------------------------------------------------

## FAQs

### What is the main objective of clean architecture?
The main objective of clean architecture is to create software that is scalable, maintainable, and flexible. Clean architecture achieves this by creating a separation of concerns in the codebase, meaning that each component of the software has a clear responsibility and can be modified or updated without affecting other parts of the system.
### What is the difference between clean architecture and traditional layered architecture?
Traditional layered architecture organizes code into different layers, with each layer responsible for a specific aspect of the software. Clean architecture takes this a step further by enforcing a strict dependency rule, where all code dependencies must point inward. This means that the innermost layers of the software contain the most important business logic, while the outer layers handle infrastructure concerns like UI or database access.
### How does clean architecture help with software maintainability?
Clean architecture enforces a separation of concerns, which makes it easier to maintain and modify software over time. Since each component of the software has a clear responsibility, changes can be made to one part of the system without affecting others. This makes it easier to fix bugs, add new features, or update existing functionality without breaking the rest of the software.
### Is clean architecture compatible with microservices?
Yes, clean architecture is compatible with microservices. In fact, many microservices architectures use a form of clean architecture to organize their code. 
Clean architecture and microservices are two approaches that can be combined to create a scalable and maintainable software system. Clean architecture focuses on the separation of concerns and the independence of the business logic from external dependencies. On the other hand, microservices architecture is an approach to building a software system by breaking it down into smaller, independent services that can be developed and deployed separately.
By combining these two approaches, developers can create a software system that is modular and easy to maintain. The microservices architecture allows for easy scaling and independent deployment of each service, while clean architecture ensures that each service has a clear separation of concerns and is easy to understand and modify. Additionally, the use of clean architecture principles within each microservice ensures that the internal architecture of each service is also maintainable and scalable.

### Can I use clean architecture with any programming language or framework?
Yes, clean architecture is language and framework-agnostic. You can use clean architecture with any programming language or framework, as long as you follow the core principles of the architecture. The key is to create a separation of concerns and enforce a strict dependency rule, regardless of the specific tools or technologies you use.
### Is it possible to combine clean architecture and event-driven architecture when designing and building a software system?
Yes, clean architecture and event-driven architecture can be combined to create a scalable and maintainable system that can handle a high volume of events and data. Event-driven architecture is a software architecture pattern where the production, detection, and consumption of events guide the design and implementation of the system. It allows applications to respond to events in real-time, making it ideal for use in systems that require a high level of responsiveness and scalability.
Clean architecture, on the other hand, is an architectural pattern that emphasizes the separation of concerns and the use of layers to promote flexibility and maintainability in software development. By separating the concerns of the system and defining clear boundaries between layers, clean architecture makes it easier to modify and maintain code over time.
By combining these two architectures, event-driven applications can be built with a clear separation of concerns and a flexible, maintainable codebase. This makes it easier to add new features, change business logic, and scale the system as needed. Additionally, the use of clean architecture in event-driven systems can help ensure that the system remains organized and understandable as it grows in complexity.


### Why is clean architecture considered complicated
Clean Architecture is considered complicated by some because it is a design approach that emphasizes separation of concerns, loose coupling, and the use of interfaces to decouple high-level policies from low-level details. This can require a significant investment of time and effort upfront, particularly in large or complex projects, as it involves breaking down a system into its component parts and carefully defining the interactions between them.
Furthermore, Clean Architecture involves a lot of abstraction and can be quite abstract in itself, making it challenging for developers to grasp initially. It requires a deep understanding of design principles and architectural patterns, as well as a willingness to challenge existing assumptions and approaches to software development.
However, while Clean Architecture may seem complicated at first, its benefits are significant. By using this approach, developers can create systems that are more modular, flexible, and maintainable over time. It also enables developers to build software that is more testable, as the code is more isolated and less dependent on external dependencies.
Overall, while Clean Architecture may be considered complicated by some, it is a powerful tool for building high-quality, robust software systems, and its benefits make it well worth the investment of time and effort required to learn and apply it effectively.

### Additional resources
Check out the following links for more information with regards to microservices:
- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Blog post by Uncle Bob
- [A quick introduction to clean architecture](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/) - freeCodeCamp
- [The Clean Architecture — Beginner’s Guide](https://betterprogramming.pub/the-clean-architecture-beginners-guide-e4b7058c1165) - Article by Bharath