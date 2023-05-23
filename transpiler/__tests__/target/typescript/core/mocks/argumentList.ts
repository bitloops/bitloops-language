import { ArgumentListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ArgumentDirector } from '../builders/argument.js';
import { ArgumentListDirector } from '../../../../../src/ast/core/intermediate-ast/directors/argumentList.js';
import { ExpressionBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';

type TestCase = {
  description: string;
  argumentList: ArgumentListNode;
  output: string;
};

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
  {
    description: 'a string and an identifier argument',
    argumentList: new ArgumentListDirector().buildArgumentListWithArgs([
      new ArgumentDirector().buildArgument(
        new ExpressionBuilderDirector().buildStringLiteralExpression('UncleBob'),
      ),
      new ArgumentDirector().buildArgument(
        new ExpressionBuilderDirector().buildIdentifierExpression('person'),
      ),
    ]),
    output: "('UncleBob',person)",
  },
  {
    description: 'a string, a number argument and a variable argument',
    argumentList: new ArgumentListDirector().buildArgumentListWithArgs([
      new ArgumentDirector().buildArgument(
        new ExpressionBuilderDirector().buildStringLiteralExpression('UncleBob'),
      ),
      new ArgumentDirector().buildArgument(
        new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
      ),
      new ArgumentDirector().buildArgument(
        new ExpressionBuilderDirector().buildIdentifierExpression('person'),
      ),
    ]),
    output: "('UncleBob',42,person)",
  },
];
