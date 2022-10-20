Feature: Create Todo
I should be able to create new todos

  Scenario Template: Valid Todo Created
    When I create a todo with <title>
    Then I should get an OK result

    Examples:
      | title |
      | Buy milk |
      | Buy 3 eggs |
      | Buy bread |

  Scenario Template: Invalid todo title during creation
    When I try to create a todo with invalid <title>
    Then I should get a DomainErrors.TitleOutOfBoundsError error

    Examples:
      | title |
      || # empty string
      | Tod | # too short
      | Very long todo that is more than 150 characters long and is just too long to be ok. Need to set some boundaries and 150 is a number as good as any yes? | # too long
