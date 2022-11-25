Feature: Struct to Typescript target language

  Background:
    Given type is "TStructEvaluation"
    And language is "TypeScript"

    Scenario Template: Struct success to Typescript object
    Given I have a struct <struct>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | struct                                                                                                                                                                                                                                                    | output                                 |
      | {"struct":{"name":"StructName","fields": [{"name":"name","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}},{"name":"age","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"5"}}}}]}}             | {name:'test',age:5}                    |
      | {"struct":{"name":"StructName","fields":[{"name":"name","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}},{"name":"age","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"5"}}}}]}}              | {name:'test',age:5}                    |
      | {"struct":{"name":"StructName","fields":[{"name":"name","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}]}}                                                                                                            | {name:'test'}                          |
      | {"struct":{"name":"StructName","fields":[]}}                                                                                                                                                                                                              | {}                                     |
      | {"struct":{"name":"StructName","fields":[{"name":"age","expression":{"evaluation":{"regularEvaluation":{"type":"int64","value":"35"}}}}]}}                                                                                                                | {age:35}                               |
      | {"struct":{"name":"StructName","fields":[{"name":"price","expression":{"evaluation":{"regularEvaluation":{"type":"double","value":"24.99"}}}},{"name":"discount","expression":{"evaluation":{"regularEvaluation":{"type":"float","value":"4.50"}}}}]}}    | {price:24.99,discount:4.5}             |
      # float/double 4.50 -> becomes 4.5
      | {"struct":{"name":"StructName","fields":[{"name":"isActive","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}},{"name":"isCancelled","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}}}]}} | {isActive:true,isCancelled:false}      |
      | {"struct":{"name":"StructName","fields":[{"name":"John","expression":{"classInstantiation":{"className":"Person","argumentDependencies":[{"value":"name","type":"variable"},{"value":"5","type":"int32"},{"value":"helloWorld","type":"string"}]}}}]}}    | {John:new Person(name,5,'helloWorld')} |

    Scenario Template: Nested Struct success to Typescript object
    Given I have a struct <nested_struct>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | nested_struct                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | output                                                                                       |
      | {"struct":{"name":"StructName","fields":[{"name":"test","expression":{"struct":{"name":"StructName2","fields":[{"name":"hello","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"world!"}}}}]}}}]}}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | {test:{hello:'world!'}}                                                                      |
      | {"struct":{"name":"StructName","fields":[{"name":"NestedTest","expression":{"struct":{"name":"StructName2","fields":[{"name":"Lorem","expression":{"classInstantiation":{"className":"Person","argumentDependencies":[{"value":"name","type":"variable"},{"value":"5","type":"int32"},{"value":"helloWorld","type":"string"}]}}},{"name":"Ipsum","expression":{"classInstantiation":{"className":"Person","argumentDependencies":[{"value":"name","type":"variable"},{"value":"25","type":"int32"},{"value":"HelloWorld!","type":"string"}]}}}]}}}]}}                                                                                                                                                                                                                                 | {NestedTest:{Lorem:new Person(name,5,'helloWorld'),Ipsum:new Person(name,25,'HelloWorld!')}} |
      | {"struct":{"name":"StructName","fields":[{"name":"Vehicles","expression":{"struct":{"name":"StructName","fields":[{"name":"Cars","expression":{"struct":{"name":"StructName","fields":[{"name":"VW","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}},{"name":"BMW","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}}},{"name":"Tesla","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}]}}},{"name":"Scooters","expression":{"struct":{"name":"StructName","fields":[{"name":"SYM","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}},{"name":"Beverly","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}}}]}}}]}}}]}} | {Vehicles:{Cars:{VW:true,BMW:false,Tesla:true},Scooters:{SYM:true,Beverly:false}}}           |

# TODO test nested structs, not a prio for first release
