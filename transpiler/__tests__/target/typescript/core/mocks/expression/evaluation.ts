import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { EvaluationBuilderDirector } from '../../builders/evaluation.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';

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
      'DomainErrors.InvalidTitleError',
      new ArgumentListDirector().buildArgumentListWithArgs([
        new ArgumentNodeBuilder()
          .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('title'))
          .build(),
      ]),
    ),
    output: 'new ApplicationErrors.InvalidTitleError(title) ',
  },

  //   new ArgumentListDirector().buildArgumentListWithArgs([
  //     new ArgumentNodeBuilder()
  //       .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('now'))
  //       .build(),
  //     new ArgumentNodeBuilder()
  //       .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(34))
  //       .build(),
  //   ]),
  // ),
  // output: 'this.GameEntity.start(now,34)',

  // | {"errorEvaluation":{"name":"ApplicationErrors.InvalidTitleError","argumentDependencies":[{"value":"title","type":"variable"}]}}    | new ApplicationErrors.InvalidTitleError(title)      | [{"className": "index", "classType": "ApplicationErrors", "default": false, "type": "relative", "value": "ApplicationErrors"}] |
];

// export const VALID_TWO_DTOS_TEST_CASES = [
//   {
//     description: 'DTOs with different fields',
//     fieldListNode: new FieldListNodeBuilder()
//       .withFields([new FieldBuilderDirector().buildOptionalPrimitiveField('todo', 'bool')])
//       .build(),
//     secondFieldListNode: new FieldListNodeBuilder()
//       .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('hello', 'uint64')])
//       .build(),
//     dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('TodoDTO').build(),
//     secondDTOIdentifierNode: new DTOIdentifierNodeBuilder().withName('HelloDTO').build(),
//     output: 'export interface TodoDTO { todo?: boolean; }',
//     secondOutput: '(a == b) && (c >= d) ',
//   },
// ];
