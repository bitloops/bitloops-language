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
      'const res = Domain.applyRules([new DomainRules.TooLongStringRule(props.name),]);if (res) return fail(res);',
  },
  {
    description: 'valid add domain event with this identifier',
    builtinFunction:
      new BuiltinFunctionStatementBuilderDirector().buildAddDomainEventWithThisIdentifier(
        'AccountCreatedDomainEvent',
      ),
    output: 'this.addDomainEventClass(AccountCreatedDomainEvent);',
  },
  {
    description: 'valid add domain event with identifier',
    builtinFunction:
      new BuiltinFunctionStatementBuilderDirector().buildAddDomainEventWithIdentifier(
        'AccountCreatedDomainEvent',
        'account',
      ),
    output: 'account.addDomainEventClass(AccountCreatedDomainEvent);',
  },
];
