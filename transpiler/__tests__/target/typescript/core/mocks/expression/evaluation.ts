import { EvaluationBuilderDirector } from '../../builders/evaluation.js';

export const VALID_EVALUATION_TEST_CASES = [
  // {
  //   description: 'Relational expression',
  //   expression: new ExpressionBuilderDirector().buildRelationalExpression(
  //     new ExpressionBuilderDirector().buildIdentifierExpression('title'),
  //     new ExpressionBuilderDirector().buildInt32LiteralExpression(120),
  //     '>',
  //   ),
  //   output: 'title > 120',
  // },
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
