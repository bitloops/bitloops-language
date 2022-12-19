---
sidebar_position: 2
sidebar_label: Domain Driven Design
title: Domain Driven Design - What is it and how to apply it?
description: Domain driven design is a software development approach that focuses on the core, value adding activities of an application, empowering software engineers to build robust, maintainable and flexible software.
keywords: [domain driven design, ddd, bounded context, ubiquitous language, context mapping, Eric Evans]
---

# Domain-Driven Design


## Introduction
Domain-Driven Design (DDD) is a software development approach or methodology that focuses on developing a deep and thorough understanding of a domain (think business problem), and creating a model that maps out the processes and rules of said domain. 

It's important to clarify up-front that DDD is not about programming languages, infrastructure technologies or software architecture. DDD is simply a set of patterns and good practices that enables the development of software. More specifically, DDD was envisaged to support development teams in understanding complex domains, and simplifying the subsequent development of systems that adequately map that domain. In fact, DDD is based on Eric Evan’s book “Domain Driven Design: Tackling Complexity in Software”, which, as per the title, is precisely targeting complex systems.  
&nbsp; 

### What is Domain-Driven Design?

The ultimate goal of DDD is to model software that domain experts understand and agree with. This essentially builds a strong, consistent and reliable communication channel between all stakeholders, and more specifically between domain experts (business specialists) and software engineers (Product & Tech). 

In order to achieve this, DDD is generally thought of from 2 perspectives:

1. **Strategic: this refers to a higher level modeling of the domain by using a ubiquitous language, breaking up a system into bounded contexts and clearly defining the context maps, ensuring the entire team/organization is aligned.** 

2. **Tactical: this is commonly referred to as the building blocks of DDD as it is a bit more spec- ific in nature and helps engineers more clearly define these rules and processes. This includes entities, Value Objects, Services, Repositories, etc. which we explain further below.**
&nbsp; 

### Why learn Domain-Driven Design?
DDD is not an easy methodology to learn. There are several components which we describe below, and the learning curve is quite steep. Moreover, given it is a development methodology only works if the entire organization is behind it, requiring buy-in from several stakeholders. 

If you’re working in a complex domain with significant “messy” logic that needs to be well organized, then DDD is likely to be an interesting solution. Knowing if your system is or will be complex enough to warrant DDD is very tricky and more of an art than a science. In fact, Vaugh Vernon, another DDD guru, developed a scorecard (nicely described in his book “Implementing Domain-Driven Design”) that helps users identify the level of complexity of an application and determine if it's worth applying DDD or not. 

However, the trouble with complexity is that it’s not easily defined given its relative to each person, domain and situation. We intuitively know what complexity is, but quantifying is a lot harder. Moreover, software systems today are more like living and evolving organisms that can easily and quickly take on additional complexity, so it's important to take this into account as well. 

Given Domain-Driven Design is all about managing complexity, and complexity is increasingly a part of our lives (software development included), learning how to manage complexity is definitely something everyone can benefit from. Moreover, we at Bitloops are reducing the learning curve and making it much easier to learn and implement DDD whilst building software - so much so, that we actually believe most projects would benefit from starting their application with a DDD mindset, and evolve their understanding of DDD as their application evolves. It's certainly better than not trying. 


### What is “Domain” in DDD?
A domain is the heart of any organization, and consequently critical in defining the software the organization uses to execute its mission. If you look up “domain” in the dictionary, it states that it is a sphere of knowledge, which means it's the set of rules, requirements, processes and guidelines that define how an organization interacts with its customers, partners, suppliers and any other relevant stakeholders.  Simply put, it's the area of knowledge around which the application revolves.  

This concept may seem intuitive to most, however, it is critical to clearly appreciate the importance of having a clear understanding across the organization of the domain. Only through this clarity will it be possible to create a domain model example for a specific industry or company. 

Having clarity of a domain will facilitate the design of robust domain models, together with the other principles mentioned below. A robust domain model has several benefits:
- Improves communication across the organization
- Allows systems to be easily managed and maintained
- Enables faster development of new features, extensions and improvements / iterations

Domain models must focus on a specific business operational domain, and should align with the business model, strategies and business processes. 

For example, two car insurance companies operating in a specific country are very likely to have 2 very different domain models. They have different strategies, business models and processes. One might be focusing on the direct to consumer model, and the other relies on insurance agents. Just this difference is enough to completely change their domain models. 

Another important principle to consider is the isolation of domain models between each other. DDD focuses on ensuring separation between business logic and technological aspects, however, it is equally important to ensure domain models are reusable and that there are no duplicate implementations of the same domain model. This can only be achieved by ensuring domain models are loosely coupled with other layers, allowing for easier maintenance, testing and versioning. 
 

&nbsp;  
&nbsp;  
  
## Strategic: Building a Domain Model
In order to accurately build a domain model, it's crucial to first understand that domain, which can only be done with a common language. Subsequently, it is necessary to separate the model into adequate modules and define how they integrate with each other. 

Explaining 4 key components of DDD is necessary:
- Domain / Subdomains
- Ubiquitous Language
- Bounded Contexts
- Context Maps



### Domains and Subdomains
As described above, the concept of a domain can be very broad and sometimes it's easier to break it up into smaller parts called subdomains. 

This is easier said than done because finding these subdomains is not always immediately clear. Nevertheless, identifying these separate parts brings tremendous value to the product development and management. Essentially, there are 3 types of subdomains, and each has a different priority level:
- Core Domains
- Supporting Domains
- Generic Domains

Whilst all subdomains are important for the overall success of a project, each will require different amounts of effort, and the quality required of each will differ. It's also interesting to note that specific subdomains may be considered supporting subdomain in 1 organization, but considered core or even generic in another. The key thing to understand is the context in which that subdomain is being used. 


#### Core Domain

The most important domain of a project are the core domains. This is what makes a product unique, and generally what adds the most value to the users. This is normally the domain with the highest priority, greatest effort, best resources and the domain in which the organization needs to really excel at.

Small projects may have only 1 core domain, whilst larger, more complex projects may have several core domains.  
 

#### Supporting Domain

A supporting domain, as the name suggests, is  a domain the supports the execution of the project, but is not critical. This type of domain does require some customization or specialization depending on the project and organization, but is not something unique to that project. 

In many instances, supporting domains are built taking existing solutions, and tweaking them to fit the needs of the project or organization


#### Generic Domain

A generic subdomain is any domain that can be easily outsourced or provided by a standard solution in the market. It does not contain any special features, nor is it unique to an organization. It is required for the project to work, but there are probably a number of solutions that could be considered. 


### Ubiquitous Language

This is quite possibly the most important aspect to DDD. If teams & organizations are able to agree and adopt a ubiquitous language for their product development, then the investment in learning and implementing DDD will be worth it. 

A Ubiquitous Language is essentially all the terms and words used to define the domain model, and is generally created through collaboration with domain experts. This language is then used by all team members when discussing activities related to the team’s application. 
Using the same terminology improves communication and cohesion between technical and non-technical team members, as well as reduces misunderstandings and errors. In fact, nouns and common verbs of a domain are frequently used to name classes and services respectively, which makes the code easier to read and understand. 


### Bounded Context

If life were simple, we could model a domain using one ubiquitous language and a single model. However, the world is more complicated than that, and for the exception of very small and simple projects, most businesses have complex business rules and overlapping processes. In order to solve this, we generally break up a domain (core, supporting or generic) into distinct parts, each having its own dialect of the ubiquitous language. This dividing of the domain into smaller parts that are somewhat independent of each other and have clearly defined boundaries are called bounded contexts. 
 
 
A Bounded Context is a conceptual boundary that contains parts of an application that fit into a specific model. This is typically a subsystem or the work of a specific team, and revolves around a specific business domain. In fact, very often, teams are split according to bounded contexts, each of them specializing in their own domain expertise and logic. 
The reason bounded contexts are created is that groups related components & concepts, and significantly reduces the possibility of ambiguity as some of these could have similar meanings without a clear context. 
It is important to note though that whilst a bounded context represents discrete entities, they do contain both unrelated and shared concepts between them, and we use context maps to define the relationships between these bounded contexts for those shared concepts. 
For example, outside of a Bounded Context, the term “delivery” could mean two very different things: either a delivery route or an object being delivered. By defining a boundary and context, you can determine its meaning

'''
Bounded contexts should be thought of as black boxes that operate in their own world and don’t need or care about how other parts of the system work. This doesn’t mean bounded contexts don’t speak to each other, it only means that you should design the process of retrieving and processing data from other bounded contexts in specific ways such as repositories or domain services (discussed below) and not implement cross-db stored procedures to retrieve specific data. 
'''
 

### Context Mapping

Once bounded contexts are defined, the next pertinent step is to define how these bounded contexts interact between them. Teams need to communicate and work together on features, and having clarity on the boundaries, as well as the collaboration expectations will greatly improve speed and quality of development. 

When defining these relationships, it is prudent to take into consideration how to build robust, flexible relationships that empower developers and don’t limit them. These are some of the most relevant considerations:
- Anti-corruption layer: a downstream bounded context implements a layer that translates data or objects that come from a higher level (upstream) bounded context, so that it supports the internal model
- Conformist: downstream (child) bounded contexts conform and adopt to upstream (parent) bounded contexts, which places the responsibility on the downstream bounded context in meeting the requirements specified by the upstream bounded context
- Customer/supplier: Upstream bounded contexts supplies downstream bounded contexts with a service and downstream bounded contexts simply act as a customer, determining requirements and requesting changes to the upstream bounded context to meet their needs
- Shared kernel: there are situations where bounded contexts overlap, and it's not possible to simply assign it to a specific bounded context. In this case, the relationship requires that both bounded contexts be continuously in sync when changes are required. This type of relationship should be avoided as it will likely lead to issues


> **_Kernel:_** Sometimes, contexts share common code, and this is referred to as the kernel. The kernel is accessible by both contexts, but the respective teams need to be collaborative when making changes to ensure there are no unintended side effects. It helps if you have automatic testing and continuous integration. The easiest solution is to avoid kernels, or have them as simple as possible.

&nbsp;  
&nbsp;  


## Tactically: Implementing DDD
Once a domain model has been defined, the next logical step is to proceed to its implementation, following practices and patterns that can most adequately translate the domain model into domain logic and ultimately into code. 

As clarified above, a key DDD consideration is the definition of bounded contexts that separate or delineate business logic into cohesive and manageable modules. The same concept applies to the actual software development process: there is a need to isolate the domain from other aspects related to code or infrastructure. 

Code that is written to solve domain problems or logic is only a fraction of the entire codebase that is required to get an application working. And, it is imperative that this code not be intertwined with code that solves or manages other functionality. By separating domain logic from all other functionality (as well as clearly separating those functionalities into their individual parts), reduces confusion in large and complex systems. 

To achieve this, the original DDD thinkers propose a layered architecture as a way to separate different functionalities. More specifically, the layered architecture suggests splitting the code base into 4 layers:
- **User Interface:** This layer is responsible for presenting information to the user and interpreting user commands
- **Application Layer:** Coordinates and orchestrates the activities of the application. This layer does not contain any business logic and it does not hold any state of business objects, only state of an application task’s progress 
- **Domain Layer:** Contains information, rules and logic about the business domain. This layer holds the state of business objects, however, the persistence of the business objects and possibly their state is delegated to the infrastructure layer
- **Infrastructure Layer:** Provides communication between layers, implements persistence for business objects, contains supporting libraries for the user interface layer, and acts as a supporting library for all the other layers. 


Essentially, the idea is that each layer only depends on the components within that layer, or components of any layer beneath it by calling their public interfaces. Lower layers can only communicate upwards by something called [Inversion of Control (IoC)](https://martinfowler.com/bliki/InversionOfControl.html).
 

This goal to segregate an application into different tiers empowers developers to build robust, maintainable and flexible systems. However, there are different subsets of layered architectures, and each has their own pros and cons. The common theme across all of them is the need to partition the application into layers or components, and then develop a design for each component that is cohesive, ensuring the domain model code is concentrated in the domain layer or component. 

In fact, Alistair Cockburn realized in 2005 that the user interface and the database interact with the application in very similar ways and that by defining ports and adaptors, the application could become “agnostic” to these external components, reducing even further the entanglement and scattering of business logic across layers / components, which would further increase the systems’ robustness and flexibility. This insight created the [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/), which marries very well with DDD, and one which is used to describe many of the components below


### User Interface
Irrespective of the software architecture choice, something that is consistent is the existence of a user interface. This is normally responsible for displaying information to the user and interpreting the user’s commands. The “user” may be a human on a desktop or mobile device, or another computer system that interacts with this system.  

User interfaces need to manage communication between the users and the application layer. These adaptors take input data from the user, repackage it so it can be inserted into the use cases and services. The outputs from the use cases and services are then repackaged again in a form that is convenient to display back to the user, or send to another server/device.
 
 
#### Controllers
A controller is a user-facing API that parses requests, triggering domain logic and then presenting back the result to the client in a http format. Generally you create one controller per use case and is normally considered part of the UI layer, however, there are some that believe it is better placed in the application layer. 

Essentially, a controller is servicing requests from the UI, and by separating the code required to execute this request, the less “complicated” the application services are. Moreover, these controllers can be used repeatedly across the application if required. 



#### Data Transfer Objects (DTOs)
A DTO is a special type of class that represents data that comes from external applications. This object carries data between processes and defines the contract between two services (an API and the client for example). There are two types of DTOs:

1. **Request DTO:** input data sent by a user, following the agreed contract to make a valid request
2. **Response DTO:** output data returned to a user, following the agreed contract and data sent by the request DTO

From a DDD perspective, DTO's help maintain the separation between Application and UI layers, and protect internal data structure changes. For example, when there is a change to an internal data model (such as renaming a value object or splitting tables), these can still be mapped to match the corresponding DTO to ensure compatibility. Therefore, Domain Objects are used in the domain and service layers and DTO's are used in the presentation layer.

Another point to note is that DTOs should be data-oriented and not object-oriented, meaning they should not have any modeling attached to them and simply send data from one place to another. Adding any type of logic or modeling to a DTO can cause confusion and bugs in the future. 

> **Advanced note:** the concept of a Local DTO exists in situations where you want to decouple internal modules properly. For example, if you’re querying from one module to another and you want to ensure clear separation between these modules so there can be no “spillage”, then a local DTO may be justified. The only caveat is that it increases the need to manage additional data mapping. 



### Application Layer
This layer is responsible for managing and orchestrating all the services and steps required to execute the commands requested by the client. 

From a user perspective, the Application Layer orchestrates the navigation between UI screens or interactions between other systems. In general, the application layer does not perform business logic, however it can perform non-business related validation on user input, before sending it to the domain layer. Therefore, the application layer doesn’t have any business or domain related logic, nor data access logic. It also doesn’t hold any state of an object or a use case, but it can manage the state of a user session or progress of a service. 



#### Application Services

Within the Application Layer there are application services that orchestrate the steps required to fulfill operations triggered by users/systems. These application services are sometimes called workflow service, use cases or interactors.

The idea is that these application services manage the communication between the entire application, connecting the user interface, the domain logic and even the infrastructure to work as one. They are responsible for retrieving input data from outside of the domain, returning information or data due to a specific action or “listens” for events and decides what it needs to trigger based on each event. 

Essentially, application services are responsible for ensuring that what should happen does happen by orchestrating all the communication that is feed in and out of a system 

It is important to note that there are services in the domain, infrastructure and application layers, but each has their own task and responsibility. 


#### Commands and Queries
 
There are two types of operations that application services execute: 
1. **Commands**
2. **Queries** 

Commands change systems by changing data, and it generally indicates user intent. Operations such as create, update and delete are commands as they change the state of an object. 

Queries retrieve information from the system without making any change. It does not write to a database, file or interact with any third party API). This operation reads data by signaling the user's intention to find something and provide a description. 

Following these operations, a pattern has emerged called CQRS (command and query responsibility segregation) which advocates for the strict separation between your command and query operations. In essence, it declares that commands should only update data and queries should only read data. The benefits are improved performance, scalability, security and flexibility as the system is better able to evolve over time and prevents update commands from causing merge conflicts at the domain level. 
 
#### Side effects 
Side effects are common features of complex applications. A function calls another one, which calls another and so forth, leading to a deep nesting where the intended and unintended consequences become unclear. The unintended effects in the third or fourth tier operations become the side effects, which can lead to errors and bugs in the system. 
 
 
#### Ports

Ports are a key component of the Hexagonal Architecture, as they abstract the technology details that business logic does not care about. In fact, the proper use of Ports can make applications extremely robust and versatile as they’re able to switch between technologies with ease. 

Basically, Ports are interfaces that define what has to be done, without explaining how that should be done (this is left to the adaptors as it may be used by several different systems). 

In addition, Ports abstract database access, technology details, invasive libraries, I/O operations and even legacy code from the core domain. This greatly simplifies the description of the domain itself, making it more robust. 

An interesting analogy is to think about USB Ports. All computers have them, and they allow communication with a computer/laptop. The device that connects to it (a mouse, screen, hard-drive, phone, etc.) has a USB adaptor so that it can communicate through the USB port to the computer. The same principle applies to Ports and Adapters in the Hexagonal Architecture pattern. 
 
 
 
#### Factories

Whenever a system needs to create a new object, it is good practice to use a Factory. Factories are objects with a single responsibility:  create other objects.

Factories are particularly useful when you need to create entire and large aggregates, or complex value objects. The reason is that it provides encapsulation. By creating an interface, the assembly complexity is simplified, centralized and can be more easily changed or improved. 
There are other benefits in using factories versus constructors:
Naming: Factories allow you to given new, meaningful names to the new objects created
Polymorphism: a constructor will only every create the exact same type of object, however a factory can return a different subclass
Coupling: by using factory methods, you’re more likely to code using interface than implementation, which embeds flexibility into your code


### Domain Layer

The whole objective of domain-driven design is to isolate and model the domain with code, in a way that remains flexible, robust, maintainable and performant. This is the focus of the domain layer where all business domain concepts, use cases and business rules are represented. 

The domain layer is essentially the heart of a business application, and should be clearly isolated from the other layers of the application. This is where domain objects are defined, and where the behavior and state of these business entities are encapsulated. 

A key component of domain logic are the business rules. These define what data is valid, what constraints need to be applied and how/if this changes depending on the context. A business object may be treated differently if the context is different. These business rules also define how data is transformed, what decisions need to be taken and what needs to be done next (workflow). 

The key to building a great domain layer is of course clearly defining the domain model. Poor modeling will lead to an anemic domain model that translates into a poorly defined domain layer, and you end up with a large amount of business logic scattered (and duplicated) across the application, infrastructure and even user interface layers. 
Once a high-quality domain model has been created, the next step is to implement it using the most appropriate objects and elements, which are described below. 

#### Domain Objects

Domain objects are objects from the business specific area that represent something meaningful to the domain expert. DOs are mostly represented by entities and value objects. 

#### Entities
 
Entities represent concepts in the domain problem that have a unique identity (which does not change over time) and have a life cycle. Entities are composed of value objects and relation to other entities. As in the case of value objects, they are responsible for hiding and protecting its internal state from being “invalid”. This is often called protecting invariants in wise DDD books. Basically it means that methods in our entity class should make sure that the execution of the given operation is allowed in its current state and that the result of such execution is in accordance with business rules.
 
Entity should push as much behavior as possible to value objects and other entities it is composed of. It should “orchestrate” them and update its state based on the results. Sometimes entities must use domain services to perform some business logic. In such cases, we usually pass domain service reference to an entity method that needs it.  

#### Value objects


Value objects are the basic building blocks of any domain model and define important concepts in the business domain. Value objects are immutable and replaceable, and unlike entities, have no lifecycle. The lack of value objects may indicate that the entities are overloaded with responsibilities.


#### Aggregates

Aggregate is the most powerful tactical pattern but also the hardest to get right. As bounded contexts divide our application into smaller areas focused on certain business capabilities, aggregates divide bounded contexts into smaller groups of classes, where each group represents concepts closely related to each other that work together.

With this pattern we should decompose large models into smaller clusters of domain objects.A group of connected value objects and entities form an aggregate. 

Within each aggregate, there should be one class that is a gateway to functionality offered by thee entire aggregate is called the aggregate root. 

Aggregates form a transactional consistency boundary, which means changes to an aggregate should be persisted in one database transaction or the whole state change should be rolled back.


> **Encapsulation:_** a term used frequently to describe good, clean code, but what does it mean?
Encapsulation means grouping or bundling everything which is internal to a specific class such as data, methods, restrictions inaccessible to other classes, functions or services. Nothing else within a system (or outside it), need to know how a class manages its internal data and state. 


#### Aggregate Design Guidelines
In order to create aggregates, it's important to understand and follow a few guidelines:

1. **Keep them as small as possible:** Because aggregates are retrieved and stored as a whole, the smaller they are, the less data is used

2. **Create an Aggregate ID:** If aggregates store their aggregate root ID in a value object, then you can reference the aggregate via the value object. This simplifies aggregate consistency boundaries as it makes it almost impossible to change the stage of one aggregate from another. In essence, you want to avoid bidirectional relationships between aggregates.

3. **Only change a single aggregate during a transaction:** Avoid (sometimes its not possible) to only change one aggregate inside a single transaction. You should ideally use domain events and eventual consistency for operations that cut across several aggregates. Again, by doing this you avoid unintentional side effects. 

4. **Implement optimistic locking:** one of the key principles and benefits of aggregates is to enforce business invariants and ensure consistency. Therefore it is best to use optimistic locking when saving aggregate to prevent data loss. 


#### Events (Domain & Integration)
 
Events allow systems to be designed with an event driven architecture, which allows for reducing coupling between components. Generally, events represent an important business event in the domain and are represented with specific ubiquitous language. They are also used in a publish-subscribe manner to trigger other commands or services. 

Events can be considered:
1. **Domain events:** used within a specific bounded context and can reference domain objects, and are commonly used to synchronize state of different aggregates or subscribe to events in the application services and perform infrastructure related tasks
2. **Integration events:** are events used to synchronize between bounded contexts, particularly useful when building microservices. These events cannot reference domain objects, usually contain only identifiers of all aggregates which changed state and should use simple types so other systems are able to interpret them. These events are part of the published (not ubiquitous language), meaning changes could impact external systems. 


#### Domain Invariants 

Domain invariants are the policies and conditions that must always be met in a specific context. They basically determine what is possible and what is prohibited in the context. 

These invariants need to be enforced by the objects themselves, in particular when applicable to entities and aggregate roots. Examples of invariants are:
- Balance cannot be less than $0
- Age cannot be less than 18 or greater than 150
- Items out of stock cannot be sold

In essence, if the domain has rules such as these, then they need to be applied and a domain object should not exist with following said rules. 

 
#### Domain Errors

Ideally, errors are prevented rather than handled, but we live in a complex world and need to be realistic. Errors will happen and they should form an intrinsic part of the domain model and domain layer. 

The beauty of a high-quality domain model, and subsequently a well-defined domain layer is that it is much easier to detect errors during the use of the application, and return an explicit error type, rather than throwing the session and not returning an error. 

Complex domains with many rules and different contexts, will consequently generate many errors that are not exceptions, but simply part of the business logic. When an instance occurs that is contrary to a defined rule, then an error can be returned to the user so it can be handled accordingly. This allows error handling and tracing much easier, which means it's also possible to continuously improve the application and performance. 

In fact, to take it one step further, given the clear separation between application, user interface and domain, anything processed in the application or domain layer should never throw an HTTP exception or statuses given it doesn’t have the context (if you’ve followed the pattern correctly). A more suitable solution is to create domain errors with clear error A better approach is to create custom error classes with appropriate error descriptions.

> **Note:** it is important to distinguish between domain errors and exceptions. There are situations where exceptions happen that are outside of our control, and it is best to throw these exceptions to not risk and security concerns. Moreover, if these exceptions are not thrown, it could allow the system to run in an incorrect state which could have unexpected (and most likely unwanted) consequences. 

#### Domain Services

When multiple entities or value objects have a shared responsibility, we aim to create a domain service that encapsulates domain logic and represents business concepts. Normally, domain services represent a rule or policy and do not have a state nor an identity.

Domain services execute their tasks by orchestrating entities and value objects and are triggered either through a dependency injection container (from the application layer), or through passing an instance of the domain service to the entity in the domain layer. For example, a domain service can subscribe to specific domain events and perform its tasks when that event happens.

Alternatively, domain services can represent a contract for external service, protecting our domain model from external influences

### Infrastructure Layer
The final layer is the infrastructure layer which is used to separate the core business domain from the technical implementation. This layer is responsible for encapsulating technology such as the implementation of databases, storing and retrieving messages, events, entities, I/O services to access external resources and other framework related code. 

As mentioned above, lower layers do not initiate actions on layers above them, only the other way around. Therefore, the infrastructure layer receives requests from the domain and doesn’t have any knowledge about the domain it's serving. Infrastructure layers should be domain agnostic. 

A common example to explain the infrastructure layer is the sending of an email. If an action is initiated by an application service in the application layer to send a message, that request is sent to a message-sending interface in the infrastructure layer and the message is sent. However, the fact that there is this decoupling allows you to change how the message is sent. It could be email, fax or another other option. Moreover, you greatly simplify the application layer by not having to explain how to send a message, but simply defining that a message needs to be sent. 

The elegance of DDD is that by separating the infrastructure layer, you’re isolating a very volatile layer (the infrastructure layer), from the more stable domain layer. It's possible to swap technological components / infrastructure services quite easily, which can improve performance or reduce costs significantly. In fact, the anticorruption-layer (ACL) pattern is frequently used in this layer to ensure clear separation between the two. 

At its core, the infrastructure layer has adaptors, repositories (similar to databases), persistence models and many other services. 

#### Adapters

Adapters allow systems to interact with external systems by receiving, storing and providing data when requested. Think of persistence, sending emails or messages, requesting 3rd party APIs or message brokers. They are essentially the implementation code for ports (mentioned above) to the outside world. They “adapt” depending on the external user and can also be used to interact with different domains inside an application to reduce coupling between two modules. 

Every adaptor requires a port through which the interaction with an application can take place using a specific technology. The number of adapters possible is almost unlimited and really dependent on the use cases. A REST controller for example is a type of adapter that allows clients to interact with a system. 


#### Repositories

A repository is where all the code is placed that handles operations over aggregates (entities and value objects). It basically performs the task of an intermediary between the domain model and the data mapping. It should be part of the ubiquitous language and reflects business concepts. 

Accessing data should be done through specific logic and functionality, and repositories define, centralize and encapsulate that logic and functionality. This is another example of isolating and abstracting code that would otherwise complicate and obscure the domain logic. This decoupling ensures that the technology and infrastructure used to access databases is outside of the domain model. 


#### Data Access Objects (DAOs)
DAOs go hand in hand with repositories and basically define the relationship between relational databases and the application. More specifically, it encapsulates how the CRUD (create, retrieve, update, delete) operations are executed. 

Another way to think about DAOs is that they define the workers that actually go and execute the operations, while the repositories provide the interface for the application to access those operations. 

#### Persistence
Entities, Aggregates and Value Objects have data modeled so it includes domain logic (business rules). This data and logic, in its raw form, may not be in the ideal shape to be saved to a database, or may required changes depending on the type of database selected. 

Given this, a persistence model is required that can create the desired shape to be best represented in a particular database. 
And, following the key philosophy of DDD which is the separation of concerns and simplifying as much as possible the domain layer, this persistence models should be managed by the infrastructure layer and be of no concern to the domain layer. 

There are various possible models and optimizations that can be implemented for different purposes including object-relational mapping (ORM), schemas, read/write models (CQRS) or even custom models. 

As applications grow, so does the data and there may be a need to make changes to the database to improve performance, security or data integrity. This redesign can only be possible if there is a segregation between the domain layer and the persistence model. In fact, you could even consider changing databases altogether, something that is highly unlikely in systems that do not have this segregation. 

A key note to consider is that separating domain and persistence models does require some effort, and Bitloops Language aims to reduce the effort required, nevertheless the pros and cons should be considered. 
 


## DDD: Benefits & Challenges
Domain-Driven Design does have a steep learning curve, however, the benefits greatly compensate for the investment required to learn and implement it. Moreover, tools such as Bitloops support developers in building the DDD way in a smoother, quicker and more intuitive way. 

In the past DDD was considered suitable for only complex projects, however, it is much easier to learn how to implement DDD in less complex projects, and be prepared when the project does become complex. 
 
 
### Benefits
DDD provides many benefits such as:
- Clear communication across all teams - particularly important for complex systems and large organizations
- Clarity of the domain model which ensure better and closer alignment with business goals and objectives
- Ability to manage complexity more effectively and efficiently by involving more resources (non-technical as well as technical that don’t have the “history”) in product development
- Providing scalability options
- Clearer code with self-descriptive class & function names through the ubiquitous language
- Delineation of potential microservice candidates with the identification of bounded contexts and context maps
- Robustness through the separation of concerns and the segregation of architectural components
- Improved flexibility as the system can be manipulated, improved or extended with ease given the structural design and object-oriented structure


### Challenges
Domain-Driven Design is not easy to implement and does present some challenges, namely:
- This collection of patterns requires conscious effort by the entire team to learn and understand
- Experienced and knowledgeable domain experts are crucial to develop and model the domain model 
- There isn’t a clear framework for how to apply it [something Bitloops is correcting]
- As with any activity that provides long-term benefits to a software developer, it takes time, experience and practice
- Experience is required to be practical - there are clearly deviations that should be considered at appropriate times, and refactored when necessary
- DDD focuses on solving domain complexities and is therefore probably inappropriate for highly technical projects
- Whilst DDD is not suitable for all projects, it increasingly makes sense to apply DDD across many more projects and not only complex projects given the benefit of tools such as Bitloops
 

 
## Other DDD complimentary patterns

### DDD &  Service Oriented Architecture
Given how DDD encourages developers to partition systems into separate, cohesive and loosely coupled elements, it's only natural that it supports design principles that depend on this architecture. 

Service oriented architecture (SOA) is a design pattern upon which software is built based on business processes, and the application layer is designed around services. Each service communicates with other services using a common language, and each individual service can be monitored separately. In essence, with SOA, the services are the most important aspect of the system. 

### Domain-Driven Design Microservices

Domain-driven design, as described in detail above, is all about building a structured and well defined system that best models a business domain. This means breaking a system into specific parts and separating business logic from technical requirements, and even breaking up these into smaller modules that work well together. 

Microservices are small services that do a particular function or solve a particular business problem. Building microservices is a software development technique (a variant of service-oriented architecture) that structures an application as a collection of services that are loosely coupled, meaning they can be managed and deployed independently, which give teams much wanted freedom and flexibility. 

Given these two descriptions, it's easy to see how DDD and Microservices could be a good match. And indeed, if you do think about your system and decompose it into microservices, you are able to define these microservices into specific domains, and take advantage of many of the domain-driven principles that help build robust and flexible systems. 

There are many variants in terms of how DDD is applied with microservices, but the common theme is to build a domain model for each microservice, and have its own database. This allows the microservice (and the team) to choose the best implementation for their domain. 

### DDD and Event-Driven Architecture

Similar to SOA, DDD is a great way to implement event-driven architectures. The benefits of building a system the DDD way with clear separation of concern, command query segregation and creation of clearly defined domain objects, will empower the development of an event-driven architecture.

Event-driven architecture is a software development paradigm that focuses on producing, detecting (or listening), consuming and reacting to events. Events are basically triggers for the next service or function to be executed, and the entire system can be based on events triggering the required business steps. 


### Object Oriented Programming (OOP)

OOP is a style of programming that considers the Objects as the central figure of a program, and it’s a very important concept when designing and implementing the domain layer. Understanding of concepts such as inheritance, encapsulation and polymorphism is critical to building comprehensive and robust domain models. 

Most domain elements (more specifically entities and value objects in DDD) have both state (attributes) and behavior (methods of operations), and they should match real-world objects. And, just like in the real world, these objects need to work closely together with other elements such as services, repositories or factories, as well as being able to be traced, audited, rolled-back, etc. however, they need to do so in a well structured manner so as to not confuse, overcomplicate and overwhelm the domain logic. 

This is where DDD comes to the rescue to provide an elegant design to manage all of these elements in a well structured way, and why concepts such as dependency injection and aspect oriented programming are also important to learn in order to properly minimize tight coupling, better define modules and enhance how cross-cutting elements operate throughout the application. 
 
 
### Dependency Injection (DI)

The concept of dependency injection is exactly what the name infers: it’s about supplying (injecting) a resource (data, service, repository, etc.) that a function or piece of code requires. This is yet again an example of how to simplify your domain logic and domain layer, by removing the configuration and dependency code out of a domain object. 

An application will always have software that depends on other resources to complete its intended purpose, and it needs to know where its located, how to access it and how to communicate with it.

The greatest advantages of dependency injection is the ability to run unit tests more efficiently and to improve the general reusability of code. This is particularly important in larger and complex applications. The only disadvantage is that when troubleshooting, the bug may be located in code that has been separated from the domain and application layer. 

Nevertheless, dependency injection supports a cleaner and more loosely coupled system by not overcomplicating code. For example, an entity can reference a repository through a dependency injection. 
 

### Aspect Oriented Programming (AOP)

As mentioned before, anything that is not business essential, clutters code or makes it less understandable, should be removed from the domain and application layer. This is where AOP comes into play as it manages all behaviors or requirements that are not key to the business to be managed and executed. 

Whilst most programming paradigms encourage some sort of partitioning of systems into manageable parts or modules, there are always some aspects that cannot be separated as they’re precisely necessary across multiple components or modules of a system. Therefore, these services are generally called cross-cutting or horizontal concerns, and need to be managed in a specific way. 

These requirements are normally services such as logging, auditing or state change tracking. Adding these requirements into the domain code would increase coupling or reduce modularity, and consequently decrease the quality of the system design. AOP helps reduce this tangling and scattering of code across the codebase. 

### Behavior-Driven Development (BDD)

The development of a domain model, and the creation of clear domain and application layers allows for a much better understanding and representation of the behaviors one expects from an application. This is where BDD plays a very intersecting role with DDD. 

Behavior-driven development focuses on the behavioral aspects of a system. If use cases and business logic is developed taking into account the expected behaviors, and what to do during exceptions, then it is possible to build better and more valuable systems. After all, domain objects are simply a representation and encapsulation of state and behavior, so the creation of these domain objects can benefit greatly from the use of BDD concepts. 

The other great benefit is that BDD takes applications one step closer towards test-driven development, which is another software development practice that makes systems more flexible, more robust and allow for faster development. 


## Bitloops -> Simplifying DDD

Domain-Driven Design is a powerful concept that has changed (and will continue to change) how software systems are designed and built. Its principles are universal and can (and should) be learnt by domain experts, modelers, software architects, testers (QA), product managers and of course, developers. 

Teams that are trained in the principles, methodologies and patterns of DDD will apply the domain first, infrastructure second philosophy, and build systems are better reflect the core business goals and objectives

### DDD Programming Language

The first thing to clarify is that DDD is not a programming language or toolkit. It is essentially a methodology of understanding complex problems and designing domain models that can best be reflected with code. 

However, there are specific technical concepts and tools that ensure the implementation of the domain model in code follows best practices. These concepts and tools can easily be forgotten or not identified, so it would be extremely helpful if there were a developer tool that guided developers into building software that does ensure adequate separation of concerns, high cohesion and loose coupling. 

This developer platform could even support other software development best practices such as BDD or TDD by using use cases and behavior to more accurately model the domain and expected outcomes. Moreover, a platform such as this could take it to the next level and also support developers in building the required technical infrastructure in the best way possible such as repositories, controllers, ports and adaptors. 

The easy and intuitive implementation of these concepts and tools during the software development process will make these systems easier to understand, change and maintain. These applications will also be auditable and testable, which means new features and products, or refactoring to improve performance, can be executed with confidence. 

This is where Bitloops comes in as it has been designed and developed to help developers build systems that follow, support and actually encourages the usage of specific tools that reflect best practices in design and software development such as DDD, BDD, TDD, Layered / Hexagonal Architecture and SOLID principles. 


## Conclusion
Domain-driven design is clearly a valid and well-thought-out way to manage the development of software for complex projects. Without implementing DDD, or other design patterns and methodologies, large and complex projects will very quickly become impossible to manage, leading to long and expensive development cycles, which ultimately lead a company to become uncompetitive. 

DDD does have a steep learning curve and, in the past, was viewed as only suitable for large enterprises. However, given the increased complexity of standard projects, as well as the natural complexity of technology in general, learning DDD will no doubt improve every developer's ability to build better code. 

There is no doubt that learning and implementing DDD (or other software design best practices) will improve the quality of the software of an application, and we at Bitloops are keen to not only provide developers with the insights and learnings to build better software, but also the tools to implement these best practices as effectively as possible.
