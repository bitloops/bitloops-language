Feature: CustomClass Evaluation to Typescript target language

    Background:
        Given type is "TBuiltInClassEvaluation"
        And language is "TypeScript"

        Scenario Template: Custom Class evaluation
        Given I have a custom class evaluation <customClassEvaluation>
        When I generate the code
        Then I should see the <output> code

        Examples:
            | customClassEvaluation                                                                                                                                         | output                                 |
            | {"builtInClass":{"className":"UUIDv4","argumentDependencies":[{"value":"id","type":"variable"}]}}                                                             | new Domain.UUIDv4(id)                  |
            | {"builtInClass":{"className":"UUIDv4","argumentDependencies":[{"value":"whatever.id","type":"variable"}]}}                                                    | new Domain.UUIDv4(whatever.id)         |
