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
    description: 'Simple struct expression with one field',
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
