import { DomainEventIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainEvent/DomainEventIdentifierNodeBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { BuiltInFunctionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { EvaluationBuilderDirector } from '../../builders/evaluation.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
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
        new ExpressionBuilderDirector().buildEvaluationExpression(
          new EvaluationBuilderDirector().buildDomainEventEvaluation(
            new DomainEventIdentifierNodeBuilder().withName('AccountCreatedDomainEvent').build(),
            new EvaluationFieldListNodeBuilder()
              .withEvaluationFields([
                new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
                  'name',
                  'John Doe',
                ),
              ])
              .build(),
          ),
        ),
      ),
    output: "this.addDomainEvent(new AccountCreatedDomainEvent({name: 'John Doe'}));",
  },
  {
    description: 'valid add domain event with identifier',
    builtinFunction:
      new BuiltinFunctionStatementBuilderDirector().buildAddDomainEventWithIdentifier(
        new ExpressionBuilderDirector().buildIdentifierExpression('accountEvent'),
        'account',
      ),
    output: 'account.addDomainEvent(accountEvent);',
  },
];
