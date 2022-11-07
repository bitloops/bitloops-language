Feature: CustomClass Evaluation to Typescript target language

    Background:
        Given type is "TCustomClassEvaluation"
        And language is "TypeScript"

        Scenario Template: Custom Class evaluation
        Given I have a custom class evaluation <customClassEvaluation>
        When I generate the code
        Then I should see the <output> code

        Examples:
            | customClassEvaluation                                                                                                                                        | output                                 |
            | {"customClass":{"className":"UUIDv4","argumentDependencies":[{"value":"id","type":"variable"}]}}                                                             | UUIDv4(id)                     |
            | {"customClass":{"className":"UUIDv4","argumentDependencies":[{"value":"whatever.id","type":"variable"}]}}                                                    | UUIDv4(whatever.id)                     |
