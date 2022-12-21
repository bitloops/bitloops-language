import { ArgumentListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentListDirector } from '../builders/argumentList.js';

type TestCase = {
  description: string;
  argumentList: ArgumentListNode;
  output: string;
};

// | [{"value": "helloWorld", "type": "string" }]                                                                            | ('helloWorld')         |
// | [{"value": "42", "type": "int32" }]                                                                                     | (42)                   |
// | [{"value": "person", "type": "variable" }]                                                                              | (person)               |
// | [{"value": "person", "type": "variable" }, {"value": "UncleBob", "type": "string" }]                                    | (person,'UncleBob')    |
// | [{"value": "string", "type": "string" }, {"value": "42", "type": "int32" }, {"value": "children", "type": "variable" }] | ('string',42,children) |
export const VALID_ARGUMENT_LIST_TEST_CASES: Array<TestCase> = [
  {
    description: 'a string argument',
    argumentList: new ArgumentListDirector().buildStringLiteralArgumentList('helloWorld'),
    output: "('helloWorld')",
  },
  {
    description: 'a number argument',
    argumentList: new ArgumentListDirector().buildIntegerLiteralArgumentList(42),
    output: '(42)',
  },
  {
    description: 'a variable argument',
    argumentList: new ArgumentListDirector().buildArgumentListWithIdentifierExpression('person'),
    output: '(person)',
  },
];
