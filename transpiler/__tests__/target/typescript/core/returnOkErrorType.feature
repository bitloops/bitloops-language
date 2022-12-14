Feature: OkError Return Type to Typescript target language

  Background:
    Given type is "TOkErrorReturnType"
    And language is "TypeScript"

    Scenario Template: Return OK Error type success to Typescript
    Given I have a return type <return-type>
    When I generate the code
    Then I should see the <output> code

    Examples:
      # Auto format deletes the extra space after the pipe while it shouldn't
      | return-type                                                                                        | output                                                                             |
      | {"ok":"Name","errors":["DomainErrors.InvalidName"]}                                                | Either<Name, DomainErrors.InvalidName>                                                |
      | {"ok":"Name","errors":["DomainErrors.InvalidName", "Unexpected"]}                                  | Either<Name, DomainErrors.InvalidName \| Unexpected>                                  |
      | {"ok":"void","errors":["DomainErrors.EmailAlreadyExistsError", "DomainErrors.UsernameTakenError"]} | Either<void, DomainErrors.EmailAlreadyExistsError \| DomainErrors.UsernameTakenError> |
      | {"ok":"Name","errors":[]}                                                                          | Either<Name, never>                                                                   |
      | {"ok":"Name"}                                                                                      | Either<Name, never>                                                                   |
      | {"ok":"void","errors":[]}                                                                          | Either<void, never>                                                                   |
      | {"ok":"UUIDv4","errors":[]}                                                                        | Either<Domain.UUIDv4, never>                                                          |

    Scenario Template: Return OK Error type unsuccessful
    Given I have a return type <return-type>
    When I generate the code
    Then I should see the <error>

    Examples:
      # Auto format deletes the extra space after the pipe while it shouldn't
      | return-type                                                                                    | error                                     |
      | {"errors":["DomainErrors.InvalidName", "Unexpected"]}                                          | Return okError type must have ok property |
      | {"ok":"","errors":["DomainErrors.EmailAlreadyExistsError", "DomainErrors.UsernameTakenError"]} | Return okError type must have ok property |
      | {"ok":"","errors":[]}                                                                          | Return okError type must have ok property |

# BL to model test
# (OK(HelloWorldResponseDTO), Errors(DomainErrors.InvalidName)) => {"ok":["HelloWorldResponseDTO"],"error":["DomainErrors.InvalidName"]}
# (OK(HelloWorldResponseDTO), Errors(DomainErrors.EmailAlreadyExistsError | DomainErrors.UsernameTakenError)) => {"ok":["HelloWorldResponseDTO"],"error":["DomainErrors.EmailAlreadyExistsError", "DomainErrors.UsernameTakenError"]}
# (OK(HelloWorldResponseDTO)) => {"ok":["HelloWorldResponseDTO"]}