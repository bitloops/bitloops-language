![Bitloops](https://storage.googleapis.com/bitloops-github-assets/github-readme-image.png)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fbitloops%2Fbitloops-language.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fbitloops%2Fbitloops-language?ref=badge_shield)
<p align="center">
  <a href="https://bitloops.com/docs/bitloops-language/category/quick-start">Quick Start</a> |
  <a href="https://github.com/bitloops/bitloops-language#-what-are-the-benefits-of-using-bitloops-language">Benefits</a> |
  <a href="https://github.com/bitloops/bitloops-language#%EF%B8%8F-why-build-the-bitloops-language">Why?</a> |
  <a href="https://github.com/bitloops/bitloops-language#-language-goals">Goals</a> |
  <a href="https://github.com/bitloops/bitloops-language#-project-status">Project Status</a> |
  <a href="https://discord.gg/vj8EdZx8gK">Discord</a> |
  <a href="https://github.com/bitloops/bitloops-language/discussions">GitHub Discussions</a> |
  <a href="https://github.com/bitloops/bitloops-language/issues">GitHub Issues</a> |
  <a href="https://github.com/bitloops/bitloops-language/blob/main/CONTRIBUTING.md">Contributing</a>
</p>

## 🚀 Build better software faster, much faster

Bitloops Language (BL) is a high-productivity, fourth generation programming language that has been designed and built by incorporating software development best practices and design methodologies such as [DDD](https://bitloops.com/docs/bitloops-language/learning/domain-driven-design), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [Layered/Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/). 

The Bitloops Language guides and empowers any software developer to write clean code and build high-quality & well designed software. This is particularly relevant for applications that have complex, and frequently changing business requirements. Through Bitloops, developers can build software using principles such as separation of concerns, loose coupling, high cohesion and command query responsibility segregation (CQRS), which ensure systems are easier to understand, maintain and change. 

With Bitloops Language, developers are able to:
1. **Write clean code** in an intuitive and structured approach
2. Follow **best practices** to ensure the code and software can be easily understood by other developers
3. Create objects with **high cohesion and loose coupling** between each other
4. **Separate the busienss logic** from the **technical aspects** which leads to more **robust and flexible systems**
5. **Focus on the core domain** or problem, and not worry about boilerplate code

In essence, software developers can focus on what they do best: **solving problems!** With Bitloops Language develoeprs write code that will allow other developers (and even themselves in 6 months) to easily understand and build on top of that code.  

<!--
Part of the Bitloops Language project, under the GPL-3.0 license
See /LICENSE for license information.
SPDX-License-Identifier: GPL-3.0-only
The GPL-3.0 license does not cover the use of Bitloops trademarks and logos
-->

&nbsp; 

> ⚠️ Please keep in mind that the Bitloops Language is in its early stages
> and under very active development. Expect bugs and limitations.
> Full backward compatibility is not guaranteed before reaching v1.0.0.

&nbsp; 

## 👨‍💻  Quick Start

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

macOS / Linux
  ```console
  bl transpile -s bitloops-language/examples/todo/bl-source/ -t output
  ```
Windows
  ```console
  bl transpile -s bitloops-language\examples\todo\bl-source\ -t output
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

### 6 - Run an instance of MongoDB
For the Bitloops ToDo App to run, you'll need MongoDB installed on your system. If you already have an MongoDB service installed, then proceed to step 5.4. 
If you don't have MongoDB installed on your system, then we recommend you follow these easy steps to run MongoDB through Docker:

6.1 Install Docker using this [link](https://www.docker.com/). If you already have Docker installed, move to the next step. 

6.2 Launch Docker on your system. The Docker service normally starts when booting a system, but you might want to confirm this before moving to the next step.

6.3 Install MongoDB in Docker using the following command.

```console
docker pull mongo
```

6.4 Start the MongoDB container

  ```console
  docker run -d --name mongo -p 27017:27017 mongo
  ```


### 7 - Run the Bitloops ToDo App
The final step is to execute the TypeScript backend code and run the Bitloops ToDo App. Use one of the following commands:
  
```console
npm run start:dev
```

or

```console
yarn start:dev
```

### 8 - Create tasks!
Start sending requests to the Todo app using [Postman](https://www.postman.com/) or [curl](https://curl.se/), or any other way you prefer!
Here is an example using curl

```console
curl -X POST localhost:5001/api/todo/ -H "Content-Type: application/json" -d '{"title": "My first todo"}'
```

&nbsp;
&nbsp;
  
----

## 👏 What are the benefits of using Bitloops Language?

* Software you'll be proud of! Well designed and written, easy to understand and follow!
* High productivity by focusing on the core domain/problem, having less boilerplate code to build, manage and debug and more quickly being able to develop new features 
* Easy to learn and intuitive syntax 
* Learn about key software development best practices, patterns and methodologies such as [Domain-Driven Design (DDD)](https://bitloops.com/docs/bitloops-language/learning/domain-driven-design), [Behavior-Driven Development (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development), [Test-Driven Development (TDD)](http://agiledata.org/essays/tdd.html) and [Layered / Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
* Testing is treated as a 1st class citizen in the software development process
* Add different API controllers (REST, GraphQL, gRPC) with just a few lines of code
* Switch between Modular Monolith or Microservices architecture within minutes as all messages are moved through either in-memory or distributed message buses depending on your deployment choice
* Significantly reduce the amount of boilerplate code you need to write, maintain and debug
* Improved alignment between business and engineering with a natural ubiquitous language
* Ability to transpiles to widely used programming languages for maximum compatibility with existing code (currently [TypeScript](https://github.com/microsoft/TypeScript) support, Go, Java, C#, C++ or maybe even Rust or [Carbon](https://github.com/carbon-language/carbon-lang) to follow in the near future)


## 🤷‍♀️ Why build the Bitloops Language?

There are numerous great programming languages out there with massive and growing
codebases and investments. However, the most common problem faced by organizations
that build and maintain systems, with teams of developers working on them, is
good architecture and design; 

Designing a complex system so that it can last through
time and will allow developers (existing and new joiners) to work on its codebase
with steady (or hopefully) increasing productivity is very difficult. 

Good testing is an additional major requirement of long lasting products which is also made possible by good architecture
and design. Unfortunately, there aren't enough knowledgeable and experienced senior
engineers around the world to build and maintain great systems for all who need them.
Even when a company is lucky enough to have some, it is unable to hire more
junior engineers than the senior ones can review their work and guide in order to make
sure the system does not degrade over time due to bad design decisions.

The Bitloops Language is the first programming language that aims to address these issues
by making it much easier to adopt important software engineering principles and patterns
such as [Domain-Driven Design](https://bitloops.com/docs/bitloops-language/learning/domain-driven-design) and Behavior-Driven Development, without requiring many years
of experience to do so successfully. As a result, the work of senior engineers can be further
leveraged and the contributions of junior engineers significantly boosted.


## 🥅 Language Goals

Every software engineer has a common goal: we want to write better code and build better software, and we want to do this faster! 

However, this can only be achieved with significant and continuous dedication, learning and experience, which takes a lot of time. Bitloops wants to significantly reduce the time it takes a developer to start building high-quality software, and we have built the Bitloops Language that already incorporates many of the software development best practices and design methodologies. 

Ultimately, Bitloops' goals are to:

* Increase developer productivity significantly, not only at the start of a project, but for the entire lifecycle!
* Reduce the time and cost to build new features and products, even on large / complex projects
* Reduce the learning curve (specifically of DDD, BDD and Layered/Hexagonal Architecture) needed to build and maintain great software
* Empower many more software developers to learn & adopt these important principles and best practices
* Reduce the dependency on developer discipline during  the code development process, with a structured process
* Make testing a more integral, collaborative, useful, and fun process
* Put the focus on the domain and automate everything else as much as possible
* Make domain logic timeless as well as platform & language independent
* Eliminate the need for boilerplate code & enable the reuse of existing packages writen in any language
* Empower software engineers to postpone the need for a microservices architecture until it is strictly needed from a infrastructure perspective to better manage computing and engineering resources (reduce intial costs! 💰💰💰) 
* Allow systems to be converted from a modular monolith to a microservices architecture in hours, not months

The Bitloops Language aims to define and retain a simplistic syntax that will be as close to human
language and business logic as possible that will become timeless, helping adopt and use a ubiquitous
language within each module or bounded context. 

Making the Bitloops Language a transpiled language was a core decision to achieve exactly this. By allowing oraganisations to write their business logic
in a timeless language that can be transpiled to powerful but also changing target languages without
burdening the users of the Bitloops Language with this task. The Bitloops Language will make sure it
transpiles to optimized code of relevant, up-to-date, and right-for-the-task languages.


## 📌 Project status

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

- [ ] CQRS support
- [ ] Event Sourcing support
- [ ] Java target language
- [ ] gRPC support
- [ ] And many more...

If you're interested in contributing, we would love help!
  
----

## 🏗 Bitloops -> TypeScript Transpilation

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

## ❓ Questions

For questions and support please use our official [Discord channel](https://discord.gg/vj8EdZx8gK). Feel free to join if you're looking to learn more about software development design patterns.

## 🙌 Contributing

We are a small team on a mission to democratize well-designed code and high-quality software, and we'll take all the help we can get! If you'd like to get involved, please check out our [Contribution Guidelines](https://github.com/bitloops/bitloops-language/blob/main/CONTRIBUTING.md) to learn how and where we could use your help. We aim to identify **good-first-issues** so you can quickly start contributing and learning. 

## 🐛 Issues 

Please make sure to read our [Reporting Issues](https://github.com/bitloops/bitloops-language/blob/main/.github/SECURITY.md) guidelines before opening an issue. Issues not conforming to the guidelines may be closed immediately.
   
    
## 💙Community support & staying in touch

For general help using Bitloops Language, please use one of these channels:

- 🗺 Community: [Discord](https://discord.gg/vj8EdZx8gK) \(For live discussion with the Community and Bitloops team\)
- 💬 Forum: [Discussions](https://github.com/bitloops/bitloops-language/discussions) \(For deeper conversations about features, connectors, or problems\)
- 🙌 Contributions: [GitHub](https://github.com/bitloops/bitloops-language) \(Bug reports, Contributions\)
- 📯 Demonstrations: [One-to-One Discussion](https://calendly.com/bitloops/30min?month=2022-11) \(Live informal 30-minute video call sessions with the Bitloops team\)
- 📚 Documentation: [Bitloops Docs](https://bitloops.com/docs/bitloops-language/category/introduction) \(All available documentation regarding Bitloops Language. We're working hard on releasing more!)
- 🌐 Website: [www.bitloops.org](https://bitloops.org/bitloops-language) \(The official Bitloops website with additional information and documentation)

## 📑 License

Bitloops Language has a GNU General Public License v3.0. See the [LICENSE](https://github.com/bitloops/bitloops-language/blob/main/LICENSE) file for licensing information.


## 🧑‍🚀 Recruitment

Bitloops is always looking for great people to contribute to the Bitloops Language and Platform. If you're keen on joining a team that wants to radically improve how software is built going forward, then send your CV + Cover Letter (very important) + GitHub Profile to: recruitment@bitloops.com

## 🌟 Like what you are seeing? Show us your appreciation!

<p align="center">
    <img src="https://storage.googleapis.com/bitloops-github-assets/star-us.gif">
