---
sidebar_position: 6
sidebar_label: Event-Driven Architecture
title: Event Driven Architecture - What is it?
description: An event-driven architecture uses events to trigger and manage communication between microservices that work together to form an application. Its a modern softwrae design pattern that improves information flow. 
keywords: [event-driven architecture, eda, microservices, software design pattern, software architecture, events, stream of events, event subscription, event posting, kafka, software architecture paradigm]
---

# Event-Driven Architecture

Event-driven architecture is a software architecture pattern that uses events to trigger and manage communication between microservices, and is common in modern applications. 

## But what is EDA exactly?

Applications that are built with this software architecture are required to create and consume events to:
1. Instruct other parts of the systems of what and when to do something
2. Understand when it should do something, and when it should do it

This type of software architecture manages the changes of state of objects and classes so that the entire application relies on these state changes to know if, when and what to do next. 

## How does it work?

There are primarily two models:
1. Pub/sub model means publish and subscribe respectively, and basically, when an event is published, it sends the event to each service that is subscribed to that event. After an event has been received, it is not replayed, so new subscribers do not see old events

2. Event streaming: in this instance, events are "published" to a log and any other service can read those events. The events must be published in a very strict order, otherwise it would create caos. With this approach, services that are created or "connected" at a later stage can replay past events in their specific order