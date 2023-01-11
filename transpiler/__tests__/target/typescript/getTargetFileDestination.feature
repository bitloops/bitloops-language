Feature: Get target file and destination for class

    Scenario Template: Missing bounded context
    Given I am sending an invalid bounded context value <boundedContext>
    When I call the function with bounded context <boundedContext>, module <module>, class type <classType>, class name <className>, and language <targetLanguage>
    Then I should get an error saying that "Bounded context is required"

    Examples:
      | boundedContext | module | classType | className | targetLanguage | path                                            | filename     |
      | empty          | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
      | null           | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
      | undefined      | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
      | space          | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |

    Scenario Template: Missing module
    Given I am sending an invalid module value <module>
    When I call the function with bounded context <boundedContext>, module <module>, class type <classType>, class name <className>, and language <targetLanguage>
    Then I should get an error saying that "Module is required"

    Examples:
      | boundedContext | module    | classType | className | targetLanguage | path                                            | filename     |
      | Hello World    | empty     | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
      | Hello World    | null      | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
      | Hello World    | undefined | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
      | Hello World    | space     | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |

    Scenario Template: Unsupported target language
    Given I have a language called <targetLanguage>
    When I call the function
    Then I should get an error saying that <targetLanguage> is unsupported

    Examples:
      | targetLanguage |
      | Java           |
      | JavaScript     |
      | Scala          |
      | Ruby           |
      | Perl           |
      | PHP            |
      | C++            |
      | C              |
      | C#             |
      | Go             |
      | Lua            |
      | Ada            |
      | Cobol          |
      | Fortran        |
      | Rust           |
      | Python         |
      | Carbon         |
      | Swift          |
      | Kotlin         |
      | Groovy         |
      | Julia          |
      | Elixir         |
      | FSharp         |
      | VisualBasic    |
      | ObjectiveC     |
      | Dart           |
      | Haskell        |
      | Racket         |
      | Clojure        |
      | Erlang         |
      | Elm            |
      | OCaml          |
      | Pascal         |
      | Prolog         |
      | Scheme         |
      | Smalltalk      |
      | Tcl            |
      | VBScript       |

  Scenario: Invalid class type
    Given I am sending an invalid class type "InvalidClassType"
    When I call the function with the invalid class type
    Then I should get an error saying that "Class type InvalidClassType is not supported"

    Scenario Template: Supported target language and class type
    Given I have a bounded context called <boundedContext>, a module <module>, a class type <classType>, a class name <className>, and a language <targetLanguage>
    When I call the function
    Then I should get a target path called <path>
    Then I should get a filename called <filename>

    Examples:
      | boundedContext | module              | classType    | className            | targetLanguage | path                                                           | filename                |
      | Hello World    | core                | Props        | NameProps            | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/                | NameProps.ts            |
      | hello  World   | iam                 | Props        | NameProps            | TypeScript     | ./src/bounded-contexts/hello-world/iam/domain/                 | NameProps.ts            |
      | Hello World    | Async Notifications | ValueObject | Name                 | TypeScript     | ./src/bounded-contexts/hello-world/async-notifications/domain/ | Name.ts                 |
      | Hello World    | Invoices            | RootEntity | Member               | TypeScript     | ./src/bounded-contexts/hello-world/invoices/domain/            | Member.ts               |
      | Hello World    | Core                | Controller  | HelloWorldController | TypeScript     | ./src/bounded-contexts/hello-world/core/driving-adapters/      | HelloWorldController.ts |
      | Hello World    | core                | UseCase     | HelloWorldUseCase    | TypeScript     | ./src/bounded-contexts/hello-world/core/application/           | HelloWorldUseCase.ts    |


# | boundedContext | module | classType | className | targetLanguage | path                                            | filename     |
# | empty          | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
# | null           | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
# | undefined      | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |
# | space          | core   | Props     | NameProps | TypeScript     | ./src/bounded-contexts/hello-world/core/domain/ | NameProps.ts |