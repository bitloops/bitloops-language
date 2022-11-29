import { ExpressionBuilderDirector } from '../../builders/expression.js';

export const VALID_EXPRESSION_TEST_CASES = [
  {
    description: 'Relational expression',
    expression: new ExpressionBuilderDirector().buildRelationalExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('title'),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(120),
      '>',
    ),
    output: 'title > 120',
  },
  {
    description: 'Or expression',
    expression: new ExpressionBuilderDirector().buildORExpression(
      new ExpressionBuilderDirector().buildRelationalExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('title'),
        new ExpressionBuilderDirector().buildInt32LiteralExpression(120),
        '>',
      ),
      new ExpressionBuilderDirector().buildRelationalExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('title'),
        new ExpressionBuilderDirector().buildInt32LiteralExpression(5),
        '<',
      ),
    ),
    output: 'title > 120 || title < 5',
  },
  {
    description: 'And expression',
    expression: new ExpressionBuilderDirector().buildANDExpression(
      new ExpressionBuilderDirector().buildRelationalExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('title'),
        new ExpressionBuilderDirector().buildInt32LiteralExpression(120),
        '>',
      ),
      new ExpressionBuilderDirector().buildRelationalExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('title'),
        new ExpressionBuilderDirector().buildFloatLiteralExpression(5.42),
        '<',
      ),
    ),
    output: 'title > 120 && title < 5.42',
  },
  {
    description: 'Equality expression',
    expression: new ExpressionBuilderDirector().buildEqualityExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('isValid'),
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
    ),
    output: 'isValid == true',
  },
  {
    description: 'AdditiveExpression',
    expression: new ExpressionBuilderDirector().buildAdditiveExpression(
      new ExpressionBuilderDirector().buildFloatLiteralExpression(5.42),

      new ExpressionBuilderDirector().buildAdditiveExpression(
        new ExpressionBuilderDirector().buildFloatLiteralExpression(5.42),
        new ExpressionBuilderDirector().buildFloatLiteralExpression(5.42),
        '-',
      ),
    ),
    output: '5.42 + 5.42 - 5.42',
  },
  {
    description: 'Not expression',
    expression: new ExpressionBuilderDirector().buildNotExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
    ),
    output: '! a ',
  },
  {
    description: 'Array of integers',
    expression: new ExpressionBuilderDirector().buildArrayLiteralExpression(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
      new ExpressionBuilderDirector().buildInt32LiteralExpression(3),
    ),
    output: '[1,2,3]',
  },
  {
    description: 'Array of strings',
    expression: new ExpressionBuilderDirector().buildArrayLiteralExpression(
      new ExpressionBuilderDirector().buildStringLiteralExpression('joe'),
      new ExpressionBuilderDirector().buildStringLiteralExpression('doe'),
    ),
    output: "['joe','doe']",
  },
  // TODO Add more assignment tests cases, when member dot(& this) is completed
  {
    description: 'Assign a variable something new',
    expression: new ExpressionBuilderDirector().buildAssignmentExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('day'),
      new ExpressionBuilderDirector().buildStringLiteralExpression('friday'),
    ),
    output: "day = 'friday'",
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
