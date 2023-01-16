---
sidebar_position: 3
sidebar_label: Onion Architecture
title: Onion Architecture - What is it?
description: Onion architecture is a software architecture pattern that consists of several concentric layers of parts of an application that interact with each other towards the core or domain of the software system. 
keywords: [onion architecture, hexagonal architecture, layered architecture, software design pattern, software architecture, software architecture paradigm]
---

# Onion Architecture

The Onion Architecture is a software architecture pattern that consists of several concentric layers that aim to improve separation of concerns and loose coupling. Its seen as a way to improve the quality of a software system so its easier to understand, maintain, test and change. 

## What is Onion Architecture exactly?

Essentially, the Onion Architecture places the core domain logic at the centre of the "Onion", and then creates layers above this core to represent the other aspects of an application that are required, but ensuring separation of concern and loose coupling between them.  

There are different versions of how an onion architecture should look like, but eseentially:
- Centre of the Onion is the domain model
- First layers are the domain services
- Second layer are teh application services (coordination of teh domain services)
- Third layer is then split into 4 components:
> - Infrastructure
> - User Interface
> - APIs
> - Database

Of course, there are other variations to this perspective, but ultimately, its about separating the code and software into modules that have high cohesion and loose coupling. 

To learn more about Onion Architecture, see links below:

- [Onion Architecture - Let’s slice it like a Pro](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423)
- [Software Architecture — The Onion Architecture](https://medium.com/@shivendraodean/software-architecture-the-onion-architecture-1b235bec1dec)
- [The Onion Architecture : part 1](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Onion Architecture aka Clean Architecture](https://www.linkedin.com/pulse/onion-architecture-aka-clean-santosh-poojari/?trk=articles_directory)