
Feature: CustomClass Evaluation

        Scenario Template: Custom Class is valid
        Given A valid custom class <blString> string
        When I generate the model
        Then I should get <output>
