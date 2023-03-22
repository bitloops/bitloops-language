Feature: getClassesBLStrings
Returns an array of objects containing each Bitloops Language class found in the string with it's name, type, and string information

  Scenario: Empty string sent
    Given I am sending an empty string
    When I call the function
    Then I should get an empty array "[]"

  Scenario Template: No classes found in string
    Given I am sending a string <string> that doesn't contain any Bitloops classes
    When I call the function
    Then I should get an empty array "[]"

  Examples:
  |                                       string                                 |
  |   This is a random string with no classes const hello = () { this and that } |
  |         class RandomClass { constructor() {} } const aMethodCall = () => {}; |

  Scenario: Class found in string
    Given I am sending a string that contains one Bitloops class
      """
      ["Props NameProps {  string name;} class NotCare { constructor() {}} const randomMethod = () => {}",
      "[{\"className\":\"NameProps\",\"classType\":\"Props\",\"classContents\":\"Props NameProps { string name; }\"}]"]
      """
    When I call the function
    Then I should get a populated array with the expected class

  Scenario: Multiple classes found in string
    Given I am sending a string that contains multiple Bitloops classes
      """
      ["Props NameProps {  string name;}ValueObject Name {  const regName = /^[a-zA-Z ]{2,30}$/;  isInvalidName(name: string): bool {    return !regName.test(name);  }  create(props: NameProps): (OK(Name), Error(DomainErrors.InvalidName)) {    if (isInvalidName(props.name)) {      return new DomainErrors.InvalidName(props.name);    } else {      return new Name(props);    }  }}DomainError InvalidName(name: string) {  message: `${name} is an invalid name`,  errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',}  class NotCare { constructor() {}} const randomMethod = () => {}",
      "[{\"className\":\"NameProps\",\"classType\":\"Props\",\"classContents\":\"Props NameProps { string name; }\"},{\"className\":\"Name\",\"classType\":\"ValueObject\",\"classContents\":\"ValueObject Name { const regName = /^[a-zA-Z ]{2,30}$/; isInvalidName ( name: string ) : bool { return !regName.test ( name ) ; } create ( props: NameProps ) : ( OK ( Name ) , Error ( DomainErrors.InvalidName ) ) { if ( isInvalidName ( props.name ) ) { return new DomainErrors.InvalidName ( props.name ) ; } else { return new Name ( props ) ; } } }\"},{\"className\":\"InvalidName\",\"classType\":\"DomainError\",\"classContents\":\"DomainError InvalidName ( name: string ) { message: `${ name } is an invalid name`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', }\"}]"]
      """
    When I call the function
    Then I should get a populated array with the expected classes
