![Bitloops](https://storage.googleapis.com/bitloops-github-assets/bitloops-language-cover-oct22-v2.png)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbitloops%2Fbitloops-language.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbitloops%2Fbitloops-language?ref=badge_shield)
<p align="center">
  <a href="https://bitloops.com/docs/bitloops-language/category/quick-start">Quick Start</a> |
  <a href="#What-are-the-benefits-of-using-Bitloops-Language?">Benefits</a> |
  <a href="#why-build-the-bitloops-language">Why?</a> |
  <a href="#language-goals">Goals</a> |
  <a href="#project-status">Status</a>
  <a href="https://discord.gg/vj8EdZx8gK">Discord</a> |
  <a href="https://github.com/bitloops/bitloops-language/discussions">GitHub Discussions</a> |
  <a href="https://github.com/bitloops/bitloops-language/issues">GitHub Issues</a> |
  <a href="https://github.com/bitloops/bitloops-language/blob/main/CONTRIBUTING.md">Contributing</a>
</p>

## 🗞 Build well-designed high-quality software (faster, much faster)

Bitloops Language (BL) is a transpiled, high-productivity, fourth generation, [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)/[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) focused programming language. BL has been built to empower any software developer to build high-quality and well designed software, particularly applications that have complex, and frequently changing, business requirements.

<!--
Part of the Bitloops Language project, under the GPL-3.0 license
See /LICENSE for license information.
SPDX-License-Identifier: GPL-3.0-only
The GPL-3.0 license does not cover the use of Bitloops trademarks and logos
-->

> ⚠️ Please keep in mind that the Bitloops Language is in its early stages
> and under very active development. Expect bugs and limitations.
> Full backward compatibility is not guaranteed before reaching v1.0.0.

&nbsp; 

## Quick Start

The best and fastest way to understand how Bitloops Language helps you write clean code and great software is to follow the instructions below. With this tutorial, you will run and execute a Bitloops ToDo App, learn how Bitloops works, and see the output files in TypeScript and appreciate how the Bitloops Language works. 

### 1 - Install the Transpiler
Bitloops still hasn't created binaries, so the best way to install and run the transpiler is to install the Bitloops Language CLI as a global npm package. Copy the following and run it in your IDE:

```console
npm install -g @bitloops/bitloops-language-cli
```

Alternatively, you can use yarn: 

```console
yarn global add @bitloops/bitloops-language-cli
```

### 2 - Clone the ToDo App example repo
The Bitloops [ToDo App](https://github.com/bitloops/bitloops-language/tree/main/examples/todo/bl-source) is readily available for cloning. You can extract the files following the link or clone it using the command beloe:

  ```console
  git clone https://github.com/bitloops/bitloops-language.git
  ```

### 3 - Run the Bitloops Transpiler
The next step is to transpile the ToDo App code from Bitloops Language Code into TypeScript code. Transpile comes from the word Transcompile, and means the translation of code from one programming language to another. 

  ```console
  bl transpile -s bitloops-language/examples/todo/bl-source/ -t output
  ```

  or

  ```console
  bitloops-language transpile
  ```

### 4 - Go into the output directory
Once the transpilation has concluded, you need to go into the folder into which the transpilation was run. If you followed the instructions above, you should only need to type the following:

  ```console
  cd output
  ```
### 5 - Install the ToDo App depepdencies
In order for the ToDo App to work, you'll need to install the required npm packages. Use the following commands:

```console
npm install
```

or

```console
yarn install
```

### 5 - Run an instance of MongoDB
For the Bitloops ToDo App to run, you'll need MongoDB installed on your system. If you already have an MongoDB service installed, then proceed to step 5.4. 
If you don't have MongoDB installed on your system, then we recommend you follow these easy steps to run MongoDB through Docker:

5.1 Install Docker using this [link](https://www.docker.com/). If you already have Docker installed, move to the next step. 

5.2 Launch Docker on your system. The Docker service normally starts when booting a system, but you might want to confirm this before moving to the next step.

5.3 Install MongoDB in Docker using the following command.

```console
docker pull mongo
```

5.4 Start the MongoDB container

  ```console
  docker run -d --name mongo -p 27017:27017 mongo
  ```


### 6 - Run the Bitloops ToDo App
The final step is to execute the TypeScript backend code and run the Bitloops ToDo App. Use one of the following commands:
  
```console
npm run start:dev
```

or

```console
yarn start:dev
```

### 7 - Create tasks!
Start sending requests to the Todo app using [Postman](https://www.postman.com/) or [curl](https://curl.se/), or any other way you prefer!

7.1. Example using curl

```console
curl -X POST localhost:5001/api/todo/ -H "Content-Type: application/json" -d '{"title": "My first todo"}'
```

&nbsp; 
&nbsp; 
  
----

## What are the benefits of using Bitloops Language?

* High-productivity, [fourth generation (4GL)](https://www.techopedia.com/definition/24308/fourth-generation-programming-language-4gl) transpiled programming language
* Easy to learn and get started with
* Focused on [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) and [Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development) ([DDD](https://en.wikipedia.org/wiki/Domain-driven_design)/[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development))
* Testing is treated as a 1st class citizen
* Add different API controllers (REST, GraphQL, gRPC) with just a few lines of code
* Modular Monolith or Microservices architecture? Both! Switch back and forth within minutes as all messages are moved through either in-memory or distributed message buses depending on your deployment choice
* Significantly reduce the amount of boilerplate code you need to write and maintain
* Ensure alignment between business and engineering with a natural ubiquitous language
* Transpiles to widely used programming languages for maximum compatibility with existing code (currently only [TypeScript](https://github.com/microsoft/TypeScript) support, Go, Java, C#, C++ or maybe even Rust or [Carbon](https://github.com/carbon-language/carbon-lang) to follow in the future)

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

* Reduce the learning curve needed to build and maintain great software using DDD and BDD, allowing many more software developers around the world to adopt these important principles
* Allow organizations to have to rely less on developer discipline and more in a structured process
* Make testing a more integral, collaborative, useful, and fun process
* Put the focus on the domain and automate everything else as much as possible
* Make domain logic timeless, platform & (target) language independent
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

* The strategy of the Bitloops Language and project.
* Critical and foundational aspects of the language design. This
    includes designs for:
  * Class types
  * Inheritance
  * Lexical and syntactic structure
  * Code organization and modular structure
* A prototype transpiler that can run example projects is a few days away.
* We are currently writing up documentation to release along with the first version of the transpiler.

There are many things we want to add in the future including

[ ] CQRS support
[ ] Event Sourcing support
[ ] Java target language
[ ] gRPC support
[ ] And many more...

If you're interested in contributing, we would love help!
  
----

## Bitloops -> TypeScript Transpilation

If you are already aware of the DDD concepts (Aggregates, Value Objects, Use Cases, Controller, etc.) and know how to code in any modern programming language, it should be really easy to pick up the Bitloops Language.
It is built out of a consistent set of language constructs that should feel familiar and be easy to read and understand.

While Bitloops is an Object Oriented Language, it doesn't have a generic class. Specific Bitloops classes are build-in as follows: ValueObject, Entity, Root Entity, UseCase, RESTController, GraphQLController, GRPCController, DTO, Props, Config, OK, ApplicationError, DomainError, Error etc.

Bitloops Language code like this (11 lines):

```node
// Bitloops Language:
Rule TitleOutOfBoundsRule(title: string) throws DomainErrors.TitleOutOfBoundsError {
  isBrokenIf(title.length > 150 OR title.length < 4);
}

Props TitleProps {
  string title;
}

ValueObject TitleVO {
  constructor(props: TitleProps): (OK(TitleVO), Errors(DomainErrors.TitleOutOfBoundsError)) {
    applyRules(TitleOutOfBoundsRule(props.title));
  }
}
```

transpiles to this TypeScript code (28 lines):

```node
// TypeScript:
import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './errors';

export class TitleOutOfBoundsRule implements Domain.IRule {
  constructor(private title: string) {}

  public Error = new DomainErrors.TitleOutOfBounds(this.title);

  public isBrokenIf(): boolean {
    return this.title.length > 150 || this.title.length < 4;
  }
}
                                                            
export namespace Rules {
    export class TitleOutOfBounds extends TitleOutOfBoundsRule {}                                             
}

interface TitleProps {
  title: string;
}

export class TitleVO extends Domain.ValueObject<TitleProps> {
  get title(): string {
    return this.props.title;
  }

  private constructor(props: TitleProps) {
    super(props);
  }

  public static create(props: TitleProps): Either<TitleVO, DomainErrors.TitleOutOfBounds> {
    const res = Domain.applyRules([new Rules.TitleOutOfBounds(props.title)]);
    if (res) return fail(res);
    return ok(new TitleVO(props));
  }
}
```

# Like what you are seeing? Don't forget to star ⭐ our repo
