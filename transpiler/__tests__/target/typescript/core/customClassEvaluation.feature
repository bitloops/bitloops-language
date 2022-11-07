Feature: CustomClass Evaluation to Typescript target language

    Background:
        Given type is "TCustomClassEvaluation"
        And language is "TypeScript"

        Scenario Template: GetClass with a regular evaluation
        Given I have a getClass <getClass>
        When I generate the code
        Then I should see the <output> code

        Examples:
            | getClass                                                                                                                                        | output                                 |
            | {"getClass":{"regularEvaluation":{"type":"variable","value":"result"}}}                                                                         | result.constructor                     |
            | {"getClass":{"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"}]}}} | this.clientError(response).constructor |