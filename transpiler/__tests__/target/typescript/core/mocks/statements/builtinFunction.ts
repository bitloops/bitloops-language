import { BuiltInFunctionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { BuiltinFunctionStatementBuilderDirector } from '../../builders/statement/builtinFunctionDirector.js';

type TestCase = {
  description: string;
  builtinFunction: BuiltInFunctionNode;
  output: string;
};

//  # | {"buildInFunction":{"applyRules":[{"name":"TooLongStringRule","arguments":[{"value":"props.name","type":"variable"}]}]}} | const res = Domain.applyRules([new Rules.TooLongStringRule(props.name),]);if (res) return fail(res); | @bitloops-auto-generated |
export const VALID_BUILTIN_FUNCTION_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'test builtin function statement',
    builtinFunction: new BuiltinFunctionStatementBuilderDirector().buildApplyRules([
      {
        ruleIdentifier: 'TooLongStringRule',
        argumentListNode: new ArgumentListDirector().buildArgumentListWithArgs([
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildIdentifierExpression('props'),
              'name',
            ),
          ),
        ]),
      },
    ]),
    output:
      'const res = Domain.applyRules([new Rules.TooLongStringRule(props.name),]);if (res) return fail(res);',
  },
];
