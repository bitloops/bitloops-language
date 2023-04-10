---
sidebar_position: 2
sidebar_label: Hexagonal Architecture
title: "Hexagonal Architecture: Building Modular & Testable Software Systems"
description: Learn how to create software systems that are modular, testable, and easy to maintain, by separating the application core from the external interfaces. Whether you're a developer, architect, or project manager, this comprehensive review will equip you with the knowledge and insights you need to design software that meets your business requirements and exceeds your users' expectations. 
keywords: [hexagonal architecture, onion architecture, layered architecture, software design pattern, software architecture, software architecture paradigm]
---

# ⬢⬡ Hexagonal Architecture
Software architecture refers to the fundamental design principles and structures that govern the development of a software system. It is the blueprint that outlines how different components of a software system will interact with one another and how the system will be organized. Effective software architecture is crucial for creating systems that are scalable, maintainable, and flexible, and that meet the needs of users and stakeholders.

Hexagonal Architecture, also known as Ports and Adapters Architecture, is a type of software architecture that emphasizes the separation of concerns and the decoupling of the application core from external components such as user interfaces, databases, and external services. The central idea behind Hexagonal Architecture is to build a system that is flexible and adaptable to changes in external components while maintaining a clear and well-defined core logic.

The core components of Hexagonal Architecture are the:
1. **Application Core:** Contains the business logic of the application
2. **Ports and Adapters:** Handles the communication between the core and external components. 
    2.1 - **Adapters:** Responsible for translating data between the application core and external systems
    2.2 - **Ports:** Define the interfaces that external systems can use to interact with the application core.

The advantages of Hexagonal Architecture include increased testability, maintainability, and flexibility. By separating the application core from external components, it becomes easier to test the core logic in isolation and to make changes to the system without affecting other components. 

This architecture also promotes the use of clean code, which is easy to understand, modify, and maintain. The flexibility of Hexagonal Architecture allows for the easy addition or removal of external components without affecting the core logic of the application, making it an excellent choice for complex software systems.


## What is Hexagonal Architecture exactly?

In general, every software system has and depends on broadly 2 major external systems:
1. The interface (mobile app, website, etc.)
2. The infrastructure (servers, database, non-core services, etc.)

Hexagonal Architecture is a software architecture pattern that emphasizes the separation of concerns and the decoupling of the application core from external components such as user interfaces, databases, and external services. 

The central idea behind Hexagonal Architecture is to build a system that is flexible and adaptable to changes in external components while maintaining a clear and well-defined core logic. It was introduced by Alistair Cockburn in 2005 and has since gained popularity in the software development community.

At the heart of Hexagonal Architecture is the idea that the core of the application should be independent of external systems and concerns. In practice, this means that the core of the application should be designed as a set of interfaces or ports that define the behavior of the system, without any implementation details. 

These interfaces can then be implemented by adapters that provide specific functionality, such as interacting with a database, a user interface, or an external API. The adapters are responsible for translating between the core interfaces and the specific implementation details of the external system.

To implement Hexagonal Architecture, developers typically define a set of core interfaces or ports that represent the behavior of the system. These might include interfaces for interacting with the business logic of the system, interfaces for handling user input, and interfaces for interacting with external systems. 

The core interfaces are then implemented by one or more adapter layers, which provide specific implementations for each interface. For example, an adapter layer might provide an implementation of the interface for interacting with a database, or an implementation of the interface for interacting with a user interface.

Overall, Hexagonal Architecture provides a flexible and adaptable way to build software systems that are easy to maintain and modify over time. By separating the core behavior of the system from external systems and concerns, and by defining a set of interfaces that represent the behavior of the system, developers can build software systems that are robust, maintainable, and adaptable to changing business needs.

The characteristics of a software system using Hexagonal Architecture include:
- Separation of concerns
- Decoupling of components
- Clear definition of boundaries between components
- Modularity
- Testability
- Maintainability

The separation of concerns ensures that each component of the application is responsible for a specific functionality, while the decoupling of components ensures that changes in one component do not affect others. 

The clear definition of boundaries between components ensures that the application is modular and easy to understand, test, and maintain. 

The modularity of the application allows for easy addition or removal of components, while the testability and maintainability ensure that the application remains stable and easily changeable over time.

Therefore, the Hexagonal Architecture encourages software developers to focus on their core application, so specifically the busienss logic that is unique to their domain, and create ports and adaptors that connect that application to any number and type of external systems, be it User Interface or infrastructure. 


## What are the main advantages of Hexagonal Architecture?
Hexagonal Architecture offers a number of advantages over other architecture patterns including:
- **Separation of concerns and Clean Code**
- **Testability & Maintainability** 
- **Flexibility & Adaptability**
- **Reduced Coupling & increased Cohesion**

### Separation of Concerns & Clean Code
This is achieved through the clear separation of your domain specific code and knowledge from external components. This separation or modularity not only allows each component to be responsible for a specific functionality, you're able to modify to switch that component with relative ease. This leads to clean, well-organized code that is easy to understand, modify, and maintain.

### Testability & Maintainability 
Through the separation of components and modules, it becomes easier to test the core logic in isolation and to make changes to the system without affecting other components. This makes the system more robust, allowing it to be easily maintained and updated over time, and it reduces the likelihood of introducing bugs or errors into the system. Moreover, you're able to reuse code more frequently, and onboarding new team members is much much faster!  

### Flexibility & Adaptability
The architecture allows for the easy addition or removal of external components without affecting the core logic of the application, making it an excellent choice for complex software systems. This means that the system can be easily adapted to changing requirements or external systems, without requiring significant changes to the core logic. In essence, this allows for the implementation of the application to be easily swapped out or modified as needed, without affecting the core behavior of the system. For example, if a database needs to be changed, it is relatively easy to swap out the database adapter without changing any of the core interfaces or business logic. Similarly, if a new external system needs to be integrated, a new adapter layer can be added to implement the necessary interfaces.

### Reduced Coupling & increased Cohesion
The use of well-defined interfaces between modules or bounded contexts (see [DDD](https://bitloops.com/docs/bitloops-language/learning/domain-driven-design) for more info) ensures that services are loosely coupled and can be changed independently of each other. 

This promotes cohesion between modules and business logic code, making the system easier to understand and modify. The result is a system that is more robust, easier to maintain, and better suited to complex software systems.

All of these advantages are particularly powerful because:
- You can change user interface fairly quickly, reaching new customers quicker
- You can change infrastructure providers efficiently, saving costs or optimizing performance
- Change database or other infrastrucutre risks with ease
- Adapt to new technology fairly quickly
- Reduces the complexity of the application code itself as the integration with interface and infrastructure is abstracted into the ports and adapters



## Hexagonal Architecture & Domain-Driven Design (DDD)
[Domain-Driven Design](https://bitloops.com/docs/bitloops-language/learning/domain-driven-design) (DDD) is an approach to software development that emphasizes the importance of the domain model in the design of software systems. 

The core principles of DDD include:
- **Separation of Concerns**
- *The Ubiquitous Language**
- **Focus on the domain model**

The goal of DDD is to build software systems that are closely aligned with the business needs of the organization, and that are easier to understand, maintain, and modify over time.

Hexagonal Architecture and DDD are highly compatible and work well togetheR: 
- Hexagonal Architecture provides a framework for building systems that are modular, testable, and maintainable
- DDD provides a set of principles and practices for building systems that are closely aligned with the needs of the business

Together, these two approaches can help to create software systems that are highly flexible, adaptable, and robust.

One of the key advantages of using Hexagonal Architecture with DDD is the **ability to separate the domain logic from external components**, such as databases and user interfaces. This separation of concerns allows developers to focus on building a clear and well-defined domain model, without being distracted by the technical details of external components. This, in turn, makes it easier to test the domain logic in isolation, and to modify the system without affecting other components.

Another advantage of using Hexagonal Architecture with DDD is the **ability to define clear and well-defined interfaces between components**. This promotes loose coupling between components, making the system more flexible and adaptable. The use of a ubiquitous language, as recommended by DDD, further enhances this loose coupling by ensuring that all components of the system share a common understanding of the domain model and its associated terminology.

Overall, the combination of Hexagonal Architecture and DDD can help to** create software systems that are highly modular, testable, maintainable, and closely aligned with the needs of the business**. By separating the domain logic from external components, defining clear interfaces between components, and using a ubiquitous language, developers can build systems that are highly flexible, adaptable, and robust, while still maintaining a clear focus on the needs of the organization.


## What about the higher initial setup costs?
There are indeed some higher initial setup costs when working with Hexagonal Architecture and DDD, however, if you're building something that could have a commercial use in the future, this initial cost (which Bitloops is reducing considerably) is well worth it. 

Moreover, there is even the argument that if you're building something for fun / learning, then even more of a reason to learn how to do it the right way.

The truth is, Hexagonal Architecture is well-suited for building and maintaining complex software systems due to its modularity, flexibility, and adaptability. Complex software systems can be challenging to design, implement, and maintain, but the use of Hexagonal Architecture can help to mitigate these challenges, and significantly reduces future development and maintaince costs.

One of the key advantages of using Hexagonal Architecture for complex software systems is the ability to break the system down into smaller, more manageable components. This makes it easier to understand and modify the system over time, and can also help to reduce the risk of errors or bugs being introduced into the system. Additionally, the separation of concerns provided by Hexagonal Architecture can help to reduce the complexity of the system, making it easier to reason about and test.

There are several case studies that demonstrate the successful implementation of Hexagonal Architecture in complex software systems, particularly in large organizations that have several teams working in parallel on different parts of the system. Through Hexagonal Architecture and DDD, it is possible to break the system down into smaller, more manageable components for individual teams to work on, making it easier to test and maintain the system over time, as well as allow for easy integration with external systems.

Overall, the use of Hexagonal Architecture can help to make complex software systems more manageable, adaptable, and robust. It will significantly reduce the cost to manage and extend software in the future. 

## To Recap

If you're a software developer working on a complex software system, consider using Hexagonal Architecture as your software architecture framework. This approach can help you break down your system into smaller, more manageable components, making it easier to understand and maintain over time. Additionally, by separating the core logic of the system from external components, you can make your system more adaptable and flexible, making it easier to integrate with external systems or adapt to changing business needs.

The benefits of Hexagonal Architecture are clear: better separation of concerns, clean code, improved testability and maintainability, increased flexibility and adaptability, and reduced coupling and increased cohesion. By embracing these principles, you can build software systems that are more robust, maintainable, and adaptable, even as your business needs and external systems change. So don't hesitate to consider Hexagonal Architecture for your next project and see the benefits for yourself.


### Additional resources
You can learn more about Hexagonal Architecture here:

- [Hexagonal architecture (software)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) - Wikipedia
- [The Pattern: Ports and Adapters (‘’Object Structural’’)](https://alistair.cockburn.us/hexagonal-architecture/) - Article by Alistair Cockburn
- [Hexagonal Architecture, there are always two sides to every story](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c) - Article by Pablo Martinez