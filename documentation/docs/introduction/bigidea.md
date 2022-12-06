---
sidebar_position: 3
---

# 💡The Bitloops (Big Idea) Vision

So why did we decide to build Bitloops? What’s the ultimate vision behind Bitloops? 

Below is a detailed description of why seven engineers decided to leave their cushy jobs and build Bitloops. It describes the vision along with some of the expected features, benefits and value proposition.

## Why? Revolutionize developer productivity
Whenever we speak to people working in Product & Tech, the number one issue is always: “we are unable to release new features quickly”. No matter who you speak to, this is the number one cause of concern, anxiety, employee churn and tension between teams. 

To understand this issue better, its important to distinguish developer productivity at the start of a project, and developer productivity once an application reaches a certain size or complexity.In general, developer productivity is not an issue when starting a new project. When there is no code, software developers (adjusted for experience level of course), are able to create a new feature very quickly. They simply think about the problem a bit, write out some code, try to run it, debug it, and soon enough, the feature is up and running. In fact, a good software developer could even take that code, and add 2 or 3 more features to it at a relatively quick pace. 

However, once a developer gets past those 4 or 5 initial features, or they hire a couple of people to help out, they realize just how much of a mess the source code is, and how difficult it is to add new features. The new hires don’t understand the source code, and in fact, even the original software developer doesn’t understand how or why some code is written in a certain way, or why they’re getting a specific error or behavior that was not expected. 

The truth is that for 99% of companies out there, developer productivity falls dramatically as applications become larger and more complex. The Bitloops team discussed at lengths the possible root causes, and also spoke to friends and (ex-) colleagues across the world working in Product & Tech, and identified several reasons why this happens:
- Larger / more complex applications require more resources to manage all the details, causing a slow-down in communication and decision making
- With additional resources, the feature vision is idealized by 1 person, but implemented by another, and the communication between these two individuals may go through several people, leading to unclear requirements
- Resources are hired and onboarded without proper training or access to documentation that allows them to understand the system adequately
- Documentation is mostly out-of date given the increasing priorities and need to ship features faster
- The increasing backlog of priorities leads to poor or no refactoring, which leads to ever increasing technical debt
- The strongly decreasing average age of a developer, given the strong increase in interest in this industry in the past 10 years, which leads to a significantly lower average experience level
- Poor coding practices and a lack of understanding of industry best practices and methodologies
- Badly written and/or frequently changing business requirements 


Subsequently, through several internal discussions, and over 100 chats/interviews with developers across the world (thank you all so much for your time and feedback), we basically came to the realization that the best way to solve this issue was to ensure applications where designed as best as possible (given the knowledge available at the time of design), as well as flexible and maintainable as possible to allow for iterations, changes and extensions as quickly as possible. 

Of course, companies that want to improve developer velocity can and should improve many other aspects relating to the software development process, including documentation, training, recruitment, mentoring and communication flow. However, if they do all this, and then end up designing poorly structured software architectures, or writing bad code, they’ll end up with the same problem: poor developer productivity 

## Give Developers what they want

During our discussions with several developers, it also became very clear that software engineers today are very frustrated with how software development is managed across organizations. In essence, developers feel:
- Undervalued by business as they have no idea about anything technology related
- Overworked with increasing number of feature requirements, when Business does not understanding the difficulty in implementing said features 
- Bored as most of their time is spent in meetings, debugging code, waiting for test or clarifying requirements with Business, and not in actuallying thinking and solving problems

The culmination of these issues is that developers feel unproductive, and in fact, a [StackOverflow report](https://stackoverflow.blog/2022/03/17/new-data-what-makes-developers-happy-at-work/#:~:text=Similarly%2C%20the%20inverse%20of%20these,the%20absence%20of%20growth%20opportunities.) in March 2022 clearly shows that feeling unproductive at work was number one (45%) among the factors that cause unhappiness - even above salary - amongst software developers. 

Of course, improving developer productivity alone will not make all developers happy, but it most certainly will contribute to greater self esteem, greater appreciation by other stakeholders and a general improvement in developer happiness, which ultimately leads to more productive developers. 


## The big idea! 
Given all this, the Bitloops team started idealizing a tool that would empower developers to build applications that could grow in size and complexity, but would remain understandable, maintainable and flexible. 

The vision is that you start building your application, with the limited information you have at the beginning, but do so in a structured way that allows you to easily refactor, change and improve the code base as you learn more about your domain. Moreover, when you hire additional developers, it should be relatively easy for them to understand your source code, understand the tests, and start contributing ASAP with new features. 

During our research we also understood that a major pain point most companies go through during their growth is the need to move from a monolith to a microservices architecture. Most applications start off as a simple monolith, and if designed well end up becoming a modular monolith where the code is segmented into individual feature modules that allow several teams to work concurrently on the same application. Subsequently, as an application scales and becomes more complex, there is normally a need to move towards a microservices architecture so that specific features can be scaled independently, and new features can be quickly added. This transition is particularly hard (and costly), if the system has not been adequately designed and coded. We wanted to build a system that would decrease coupling, increase cohesion and drive adequate separation of concerns to make it very easy (maybe with just a couple of clicks) to convert a modular monolith into a microservices architecture. 

After long deliberations, we realized that to achieve all this we needed a higher-level language that was easy to write, read and change. Moreover, the language needed to be specific enough to drive developers to follow certain patterns that would provide the structure and clarity required, but flexible enough to allow creativity and refactoring to flourish. 

And this is how Bitloops Language was born! A high-productivity, 4th generation programming language that drives developers to build well designed code and high-quality software

## Bitloops Benefits
There are several benefits in using the Bitloops: it simplifies programming, translates into performante languages, creates boilerplate code, reduces probability of bugs, enables transition from modular monolith to microservices architecture, offers integrated backend services, deploys to production with a single command and lots more. Let's go over how each of these benefits emerges.

### 🙌 Simplifies programming
As a higher-level language, Bitloops Language is easy to read, write and change. It follows the object-oriented programming paradigm, but goes a step further and drives developers to think about their domain in terms of value objects, entities and aggregates. 

Leveraging best practices in software design such as domain-driven design, Bitloops Language requires developers to define their objects in specific ways that ensure encapsulation and separation of concern. 

Furthermore, following best practices in software architecture such as layered or hexagonal architecture, the Bitloops Language drives developers to design the domain logic separately from the application layer, which drives loose coupling and high cohesion, two other important factors in software development. 

All in all, Bitloops Language is simply easier to read and understand, which makes it very powerful for onboarding new team members and making changes to the code base. 

### ✍🏽 Transpiles into other languages
Every programming language has its pros and cons. In general, the harder the language is to learn and write, the harder it is to change, but the more performante (and therefore cheaper to run) it is. Languages that are easier to read and write are generally easier to change, but performance can sometimes be negatively affected (there are exceptions of course). 

Bitloops is a transpiled language, meaning it transplites (translates) into other programming languages that run on a server. Right now we offer TypeScript as the output language, however, we do aim to offer other options such as C++ or Java in the future. 

Bitloops will not be the best language for every single software requirement, but it is a very good solution for any software that has complex business logic and frequently changing requirements such as consumer apps or Software-as-a-Service. In fact, with Bitloops developers can finally have their cake and eat it as it provides the ease of use (write, read, change), as well as the performance of a low-level language.

### 🏗️ Creates boilerplate code
Developers love writing code. It's all about creativity, problem solving, creating something new and helping people do things better or faster. At the same time, developers are engineers, and engineers are pragmatic and they don’t want to reinvent the wheel each time. Nothing annoys developers more than having to continuously write boilerplate code such as a logging framework, data access layer or other standard and repetitive code. Not only is this time consuming, boring and low value add, each boilerplate code needs its own maintenance, documentation and testing.

Bitloops helps you maximize your developer (team) focus on the core problem by standardizing as much as possible, but giving developers the ability and flexibility to adapt this boilerplate code if necessary (more relevant the more experienced you are). By automatically creating boilerplate code, which is common code used across many different parts of the application, Bitloops removes the pain of building and maintaining duplicate and superfluous code. 

Boilerplate code is necessary, and is normally seen as “infrastructural-style” code that supports the domain logic in doing what it needs to do. It normally doesn’t change frequently (if at all) and can be reused (and should be reused, not rewritten) wherever it is needed. 

### 🐛 Reduces probability of bugs
One activity developers, in general, do not appreciate is debugging. Yes, it is necessary, and yes it's actually a great way to improve your skills as a developer, but often bugs occur due to minor classification mistakes, or errors in repeated code that is hard to identify. 
Software bugs are essentially errors or faults in an application and cause unintended or unexpected behavior. The root cause is varied such as poor requirements, lack of communication or poor documentation, however many times it's simply due to human mistakes, programming errors or too much complexity in the software design and/or code. 

By guiding developers to follow certain patterns and structures, and in a way standardizing the code development process, Bitloops Language reduces the probability of bugs appearing in a system drastically. In addition, given Bitloops encourages developers to define and write their code into independent modules or “bounded contexts”, each piece of code can be better witten, less complicated and easier to test. 

Finally, there is the benefit of using the automatically generated boilerplate code, which is tried, tested and continuously maintained. This ensures that bugs have a much harder time creeping into systems. 

Essentially, with Bitloops, developers end up producing much fewer bugs, meaning they spend less time debugging low-value issues, and more time focusing on the core domain and on solving the problem at hand. 

### 🧰 Enables modular monolith to microservices architecture transition
It is very rare for a greenfield project/application to be microservices-based. It is much more common for companies to want to transition an application from a monolithic architecture to a microservices architecture. Normally this is done by extracting modules out of the monolith and converting them into a service. This can be complicated, costly and take a long time to implement. 

However, starting off with a microservices architecture for new projects is definitely an overkill. The complexity and scale does not warrant such a complicated architecture, and it is much more costly to build and maintain - something new projects are extremely wary of. 

The ideal solution is to be able to build an application as a monolith (ideally as a modular monolith), and, when the time comes, easily, cost-effectively and with minimum disruption to ongoing services, separate specific services so they can grow and scale independently. 

Bitloops offers precisely this benefit. It guides developers to build software in a modular perspective that ensures the code is flexible, maintainable and “modular”. This in turn allows Bitloops to offer the ability to transition your application from a modular monolith into a microservices architecture. 

Developers benefit from the speed, low-cost and ease of setting up a monolith to begin with, but then have the benefit of being to quickly and at almost no additional cost, convert modules into microservices, all from the same platform. 


### 🎛️ Offers integrated backend services
We strongly believe that software developers should focus on writing high-value code, solving new problems, and that reusing high-quality, tried and tested code should be greatly encouraged and adopted. 

Therefore, as part of its core offering, Bitloops aims to offer several backend services that greatly speed up developer velocity, particularly when setting up new projects. This includes services that are commonly used such as:
Authentication / authorization: process of verifying (or registering for first time users) user’s ID before giving them access to the requested content
Database management (realtime): the process of maintaining sorting, storing, and retrieving essential information.
Storage & hosting: easily store your images, files and videos, as well as host your website
Push notifications, messaging and routing: manage all of the realtime notifications and messaging required by your application 

In essence, Bitloops aims to offer all the nifty services Backend-as-a-Service platforms offer, and all nicely integrated with the Bitloops code. 

Some of these services have already been developed, but need to be integrated into the Bitloops Language. Do let us know what you value the most!

### 🏭 Deploys to production with a single command
Finally, we also aim to offer cloud hosting services through a single command line, allowing developers to quickly deploy their application to production. 

Most developers are not keen on running, managing and scaling server infrastructure, as it is complex and time-consuming. Moreover, it generally requires specialized DevOps engineers, and the additional resource cost is not easily saved given how competitive cloud services are. 

Nevertheless, Bitloops will always offer a Bring-your-own-Cloud solution, so you can start off with the hosted service, and, once your application has scaled to millions of users, consider managing the infrastructure yourself. You’ll be able to select from various options, and even deploy to your own cloud of course. 
 

## Conclusions
Bitloops has the potential to become a very powerful developer tool, one that can revolutionize how software is built, maintained and extended. Our own team is increasingly motivated and surprised by the ability Bitloops Language has of simplifying complex applications. 

It offers tremendous practical benefits, and allows individual developers to become much better software engineers, and teams of developers to become significantly more productive (a significant competitive advantage). 

We are only at the beginning of the Bitloops journey, but we have learnt and achieved so much working through the various “bibles” of software development (see this list of books), learning about the best practices and methodologies, talking to hundreds of developers as well as viewing countless videos online from amazing developers

## Where to next?

⏭️ [Explore the Quick Start example to get an idea of Bitloops’ potential](https://bitloops.com/docs/bitloops-language/category/getting-started)
