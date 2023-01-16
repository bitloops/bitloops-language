---
sidebar_position: 1
sidebar_label: Layered Architecture
title: Layered Architecture - What is it?
description: Layered architecture is a software architecture pattern that promotes the separation of similar components intolayers of functionality that are independent from each other, and each performing a specific role for the application. 
keywords: [hexagonal architecture, onion architecture, layered architecture, software design pattern, software architecture, software architecture paradigm]
---

# Layered Architecture

Layered architecture a software architectural pattern composed of four separate horizontal layers that function together as a single unit of software. A layer is a logical separation of components or code that are similar and placed in the same layer. 

## What exactly is layered architecture?

This software architecture pattern basically breaks down the architecture of an application into 4 layers:
1. Presentation
2. Application 
3. Domain 
4. Infrastructure

### Presentation Layer
This layer includes all of the code that manages user interactions with the software system. It is basically all the code required to create a mobile app or website. This includes the HTML, CSS, images, etc. that make the presentation of the application to the end user

### Application Layer
This layers handles all of the coordination of tasks and services that need to be done. Its basically like a maestro that tells the orchestra what to do, but doesn't actually play any instrument. More specifically, the application doesn't do anything per se, but it tells the domain layer what and when it should do something. 

### Domain Layer
This is where all the business rules and logic is located. Here is where you'll find the algorithms, the programming compoenents, the functions, etc. Its really the heart of the application and generally what adds most value to the application itself. 

### Infrastructure Layer
Here is where you find all of the code that is used to manage data, databases, deployment and other services that are non-core and provided by 3rd party provides. 


Here are a few additional references with regards to Layered Architecture:
- [Layered Architecture](https://cs.uwaterloo.ca/~m2nagapp/courses/CS446/1195/Arch_Design_Activity/Layered.pdf)
- [Software Architecture - Layered Architecture](https://openclassrooms.com/en/courses/6397806-design-your-software-architecture-using-industry-standard-patterns/6896176-layered-architecture)
- [Software Architecture Patterns — Layered Architecture](https://priyalwalpita.medium.com/software-architecture-patterns-layered-architecture-a3b89b71a057)
