import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';

import { EntityEvaluationBuilderDirector } from '../../builders/evaluation.js';

import { NameNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import {
  EvaluationBuilderDirector,
  EvaluationFieldListBuilerDirector,
} from '../../builders/evaluation.js';

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
  {
    description: 'Entity evaluation with one argument',
    evaluation: new EntityEvaluationBuilderDirector().buildEntityEvaluationWithFieldList(
      'TodoEntity',
      'name',
      'superMarketList',
    ),
    output: "TodoEntity.create({name: 'superMarketList'})",
  },
  {
    description: 'DTO evaluation',
    evaluation: new EvaluationBuilderDirector().buildDTOEvaluation(
      new NameNodeBuilder().withName('AddCourceDTO').build(),
      new EvaluationFieldListBuilerDirector().buildEvaluationFieldListWithOneVariableField(
        'course',
        'Math',
      ),
    ),
    output: "AddCourceDTO({course: 'Math'})",
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
