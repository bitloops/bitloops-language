---
sidebar_position: 2
sidebar_label: Hexagonal Architecture
title: Hexagonal Architecture - What is it?
description: Hexagonal architecture is a software architecture pattern derived from the layered architecture that explains how software systems should be designed and built to allow for maximum flexibility, adaptability and robustness. 
keywords: [hexagonal architecture, onion architecture, layered architecture, software design pattern, software architecture, software architecture paradigm]
---

# Hexagonal Architecture

The hexagonal architecture is a software architecture pattern, sometimes referred to as the ports and adapters architecture, that aims at creating loosely coupled systems that are more flexible, adaptable and robust. 

## What is Hexagonal Architecture exactly?

Every software system has and depends on broadly 2 external systems:
1. The interface (mobile app, website, etc.)
2. The infrastructure (servers, database, non-core services, etc.)

Therefore, the Hexagonal Architecture encourages software developers to focus on their core application, so specifically the busienss logic that is unique to their domain, and create ports and adaptors that connect that application to any number and type of external systems, be it User Interface or infrastructure. 

This is particularly powerful because:
- You can change user interface fairly quickly, reaching new customers quicker
- You can change infrastructure providers efficiently, saving costs or optimizing performance
- Change database or other infrastrucutre risks with ease
- Adapt to new technology fairly quickly
- Reduces the complexity of the application code itself as the integration with interface and infrastructure is abstracted into the ports and adapters

There are indeed some cons such as higher initial setup costs, and is most likely only a consideration for applications that aim to have commercial use. 

You can learn more about Hexagonal Architecture here:

- [Hexagonal architecture (software)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))
- [The Pattern: Ports and Adapters (‘’Object Structural’’)](https://alistair.cockburn.us/hexagonal-architecture/)
- [Hexagonal Architecture, there are always two sides to every story](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c)