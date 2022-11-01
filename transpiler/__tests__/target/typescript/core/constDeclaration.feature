Feature: ConstDeclaration to Typescript target language

  Background:
    Given type is "TConstDeclaration"
    And language is "TypeScript"

    Scenario Template: ConstDeclaration with and without type
    Given I have a constDeclaration <constDeclaration>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | constDeclaration                                                                                                                                                                        | output                                   |
      | {"constDeclaration":{"name":"hello","type":"Hello","expression":{"struct":{"name":"StructName","fields":[{"name":"name","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"helloWorld"}}}}]}}}} | const hello: Hello = {name:'helloWorld'} |
      | {"constDeclaration":{"name":"numOfTeachers","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"25"}}}}}                                                           | const numOfTeachers = 25                 |
      | {"constDeclaration":{"name":"id","type":"UUIDv4","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"e25-453"}}}}}                                                | const id: Domain.UUIDv4 = 'e25-453'  |
