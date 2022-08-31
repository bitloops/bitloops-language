![Bitloops](https://storage.googleapis.com/wwwbitloopscom/bitloops-logo_320x80.png)
# Bitloops Language (BL): <br/> Quickly build scalable, maintainable & reliable software
Bitloops Language is a high-productivity, fourth generation (4GL), [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)/[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) focused, transpiled programming language 

<!--
Part of the Bitloops Language project, under the GPL-3.0 license
See /LICENSE for license information.
SPDX-License-Identifier: GPL-3.0-only
The GPL-3.0 license does not cover the use of Bitloops trademarks and logos
-->

<p align="center">
  <a href="#why-build-the-bitloops-language">Why?</a> |
  <a href="#language-goals">Goals</a> |
  <a href="#project-status">Status</a>
  <a href="#getting-started">
  <a href="#join-us"></a>
</p>

> ⚠️ Please keep in mind that the Bitloops Language is in its early stages
> and under very active development. Expect bugs and limitations.
> Full backward compatibility is not guaranteed before reaching v1.0.0.

* High-productivity, [fourth generation (4GL)](https://www.techopedia.com/definition/24308/fourth-generation-programming-language-4gl) transpiled programming language
* Easy to learn and get started with
* Focused on [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) and [Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) ([DDD](https://en.wikipedia.org/wiki/Domain-driven_design)/[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)) with testing as a 1st class citizen
* Add different API controllers (REST, GraphQL, gRPC) with just a few lines of code
* Modular Monolith or Microservices architecture? Both! Switch back and forth within minutes as all messages are moved through either in-memory or distributed message buses depending on your deployment choice
* Significantly reduce the amount of boilerplate code you need to write and maintain
* Ensure alignment between business and engineering with a natural ubiquitous language
* Transpiles to widely used programming languages for maximum compatibility with existing code (currently only [TypeScript](https://github.com/microsoft/TypeScript) support, Java, C#, C++ or [Carbon](https://github.com/carbon-language/carbon-lang) to follow in the future)

## Why build the Bitloops Language?

There are numerous great programming languages out there with massive and growing 
codebases and investments. However, the most common problem faced by organizations 
that build and maintain systems, with teams of developers working on them, is 
good architecture and design; Designing a complex system so that it can last through 
time and that will allow developers (existing and new joiners) to work on its codebase
with steady (or hopefully) increasing productivity. Good testing is an additional major
requirement of long lasting products which is also made possible by good architecture
and design. Unfortunately, there aren't enough knowledgeable and experienced senior 
engineers around the world to build and maintain great systems for all who need them. 
Even when a company is lucky enough to have some, it is unable to hire more 
junior engineers than the senior ones can review their work and guide in order to make 
sure the system does not degrade over time due to bad design decisions. 

The Bitloops Language is the first programming language that aims to address these issues
by making it much easier to adopt important software engineering principles and patterns
such as Domain Driven Design and Behavior Driven Development, without requiring many years
of experience to do so successfully. As a result, the work of senior engineers can be further
leveraged and the contributions of junior engineers significantly boosted. 

## Language Goals

* Reduce the learning curve needed to build and maintain great software using DDD and BDD, allowing for fast onboarding of new developers
* Make testing a more integral, collaborative, useful, and fun process
* Eliminate the need for boilerplate code
* Allow software engineers to postpone the need for a microservices architecture until it is needed strictly from a infrastructure perspective to better manage computing resources and if eventually it is needed to be able to do so within hours and not months or years. 
* Allow for the reuse of existing packages writen in the target language
* As a result of the above, significantly increase developer productivity

The Bitloops Language aims to define and retain a simplistic syntax that will be as close to human 
language and business logic as possible that will become timeless, helping adopt and use a ubiquitous 
language within each module or bounded context. Making the Bitloops Language a transpiled language 
was a core decision to achieve exactly this. By allowing oraganisations to write their business logic 
in a timeless language that can be transpiled to powerful but also changing target languages without 
burdening the users of the Bitloops Language with this task. The Bitloops Language will make sure it 
transpiles to optimized code of relevant, up-to-date, and right-for-the-task languages.

## Project status

The Bitloops Language is currently in early stages. Its transpiler has been created as a proof of concept
and is not meant to cover the full range of developer creative code writing at this stage. 

We want to better understand whether we can build a language that meets your needs, and whether we can 
gather a critical mass of interest within the DDD community and outside of it.

Currently, we have fleshed out several core aspects of the project and the language:

-   The strategy of the Bitloops Language and project.
-   Critical and foundational aspects of the language design. This
    includes designs for:
    -   Class types
    -   Inheritance
    -   Lexical and syntactic structure
    -   Code organization and modular structure
-   A prototype transpiler that can run example projects.

There are many things we want to add in the future including 

[ ] CQRS support
[ ] Event Sourcing support
[ ] Java target language
[ ] gRPC support
[ ] And many more...

If you're interested in contributing, we would love help

## Bitloops -> TypeScript Transpilation

If you are already aware of the DDD concepts (Aggregates, Value Objects, Use Cases, Controller, etc.) and know how to code in any modern programming language, it should be really easy to pick up the Bitloops Language.
It is built out of a consistent set of language constructs that should feel familiar and be easy to read and understand.

While Bitloops is an Object Oriented Language, it doesn't have a generic class. Specific Bitloops classes are build-in as follows: Aggregate, ValueObject, UseCase, RESTController, GraphQLController, GRPCController, DTO, Props, Config, OK, ApplicationError, DomainError, Error.

Bitloops Langauge code like this (11 lines):

```node
// Bitloops Language:
UseCase HelloWorldUseCase (/* Dependencies such as Repositories, Services, and Packages go here in more complex cases */) {
  // Every Bitloops UseCase must implement execute and must return OK and Error types (similar to Either)
  execute(helloWorldRequestDTO: HelloWorldRequestDTO): (OK(HelloWorldResponseDTO), Error(HelloWorldErrors.InvalidName)) {
    const { name } = helloWorldRequestDTO;
    if (name) {
      const nameResult = Name.create({name});
      return HelloWorldResponseDTO({message: `Hello, ${nameResult.name}!`});
    } else {
      return HelloWorldResponseDTO({message: 'Hello, World!'});
    }
  }
}
```
transpiles to this TypeScript code (25 lines):
```node
// TypeScript:
import { HelloWorldRequestDTO } from './HelloWorldRequestDTO';
import { XOR, yay, oops } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { HelloWorldResponseDTO } from './HelloWorldResponseDTO';
import { Name } from '../../domain/Name';
import { DomainErrors } from '../../domain/Errors';
import * as _ from 'lodash';

type Response = XOR<DomainErrors.InvalidName, HelloWorldResponseDTO>;

export class HelloWorldUseCase implements UseCase<HelloWorldRequestDTO, Promise<Response>> {
  async execute(dto: HelloWorldRequestDTO): Promise<Response> {
    const { name } = dto;
    if (!_.isNil(name)) {
      const nameResult = Name.create({ name });
      if (!nameResult.isOops()) {
        const reply = { message: `Hello, ${nameResult.value.name}!` };
        return yay(reply);
      } else {
        return oops(new DomainErrors.InvalidName(name));
      }
    } else {
      const reply = { message: 'Hello, World!' };
      return yay(reply);
    }
  }
}
```
# Are you liking what you are seeing? Don't forget to star ⭐ our repo!
