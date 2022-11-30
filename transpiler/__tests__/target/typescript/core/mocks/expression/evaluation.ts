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
