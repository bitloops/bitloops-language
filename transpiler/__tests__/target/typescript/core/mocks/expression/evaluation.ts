import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { EvaluationBuilderDirector } from '../../builders/evaluation.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';

import { EntityEvaluationBuilderDirector } from '../../builders/evaluation.js';

export const VALID_EVALUATION_TEST_CASES = [
  {
    description: 'Simple struct expression with one field',
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('PersonStruct', [
      new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
        'message',
        'Hello, World!',
      ),
    ]),
    output: "{ message:'Hello, World!'} ",
  },
  {
    description: 'Nested Struct expression with one field',
    evaluation: new EvaluationBuilderDirector().buildStructEvaluation('OuterStruct', [
      new EvaluationFieldBuilderDirector().buildEvaluationField(
        'outer',

        new ExpressionBuilderDirector().buildEvaluationExpression(
          new EvaluationBuilderDirector().buildStructEvaluation('MessageStruct', [
            new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
              'message',
              'Hello, World!',
            ),
          ]),
        ),
      ),
    ]),
    output: "{ outer: { message:'Hello, World!'} }",
  },
];

export const VALID_ERROR_EVALUATION_TEST_CASES = [
  {
    description: 'Error evaluation with no arguments',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'DomainErrors.InvalidTitleError',
    ),
    output: 'new DomainErrors.InvalidTitleError()',
  },
  {
    description: 'Error evaluation with arguments',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'DomainErrors.InvalidTitleError',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('response'))
          .build(),
        new ArgumentNodeBuilder()
          .withExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildIdentifierExpression('result'),
              'message',
            ),
          )
          .build(),
      ]),
    ),
    output: 'new DomainErrors.InvalidTitleError(response,result.message)',
  },
  {
    description: 'Application Error evaluation with one argument',
    evaluation: new EvaluationBuilderDirector().buildErrorEvaluation(
      'ApplicationErrors.InvalidTitleError',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('title'))
          .build(),
      ]),
    ),
    output: 'new ApplicationErrors.InvalidTitleError(title) ',
  },
];

export const VALID_BUILTIN_CLASS_EVALUATION_TEST_CASES = [
  {
    description: 'UUID with an id argument',
    evaluation: new EvaluationBuilderDirector().buildBuiltInClassEvaluation(
      'UUIDv4',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('id'))
          .build(),
      ]),
    ),
    output: 'new Domain.UUIDv4(id)',
  },
  {
    description: 'UUID with a member dot expression argument',
    evaluation: new EvaluationBuilderDirector().buildBuiltInClassEvaluation(
      'UUIDv4',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildIdentifierExpression('whatever'),
              'id',
            ),
          )
          .build(),
      ]),
    ),
    output: 'new Domain.UUIDv4(whatever.id)',
  },
];

export const VALID_ENTITY_EVALUATION_TEST_CASES = [
  {
    description: 'Entity evaluation with field list',
    entityEvaluation: new EntityEvaluationBuilderDirector().buildEntityEvaluationWithFieldList(
      'TodoEntity',
      'name',
      'superMarketList',
    ),
    output: "TodoEntity.create({name: 'superMarketList'})",
  },
];
