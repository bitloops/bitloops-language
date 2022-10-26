Feature: Class Instantiation to Typescript target language

  Background:
    Given type is "TClassInstantiation"
    And language is "TypeScript"

    Scenario Template: Class Instantiation happy path to Typescript
    Given I have a class instantiation object <classInstantiation>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | classInstantiation                                                                                                                                                            | output                          |
      | {"classInstantiation":{"className":"Person","argumentDependencies":[{"value":"name","type":"variable"},{"value":"5","type":"int32"},{"value":"helloWorld","type":"string"}]}} | new Person(name,5,'helloWorld') |
      | {"classInstantiation":{"className":"Cat","argumentDependencies":[]}}                                                                                                          | new Cat()                       |
      | {"classInstantiation":{"className":"Dog"}}                                                                                                                                    | new Dog()                       |
      | {"classInstantiation":{"className":"Cucumber","argumentDependencies":[{"value":"name","type":"variable"}]}}                                                                   | new Cucumber(name)              |

