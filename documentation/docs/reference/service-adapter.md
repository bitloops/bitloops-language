---
sidebar_label: ServiceAdapter
title: Bitloops Language - ServiceAdapter - Basic Syntax 
description: ServiceAdapter syntax on Bitloops Language - Service Adapter...  
keywords: [bitloops, bitloops language, basic syntax, programming language, service adapter, ports and adapters, software architecture]
---

# ServiceAdapter
Service Adapter is a specific concretion of a Service Port. We can create several service adapters for one service port. This provides flexibility in changing providers easily. 
For example if we want to send an email by an external system, let say Mandrill provider, we can create a service adapter to implement this functionality (MandrillServiceAdapter). If we need to change the provider for some reason we can just implement another one to utilise another provider (e.g. SendInBlueProvider for sendinblue provider).
