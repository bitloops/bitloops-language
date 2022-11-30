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
  {
    description: 'Assign a variable something new',
    expression: new ExpressionBuilderDirector().buildAssignmentExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('day'),
      new ExpressionBuilderDirector().buildStringLiteralExpression('friday'),
    ),
    output: "day = 'friday'",
  },
  {
    description: 'Assign to this props(old thisDeclaration)',
    expression: new ExpressionBuilderDirector().buildAssignmentExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildThisExpression(),
        'props',
      ),
      new ExpressionBuilderDirector().buildIdentifierExpression('newProps'),
    ),
    output: 'this.props = newProps',
  },
  {
    description: 'Assignment to this.props.name',
    expression: new ExpressionBuilderDirector().buildAssignmentExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          'props',
        ),
        'name',
      ),
      new ExpressionBuilderDirector().buildStringLiteralExpression('joe'),
    ),
    output: "this.props.name = 'joe'",
  },
  {
    description: 'This expression',
    expression: new ExpressionBuilderDirector().buildThisExpression(),
    output: 'this',
  },
  {
    description: 'Expression with parenthesis',
    expression: new ExpressionBuilderDirector().buildParenthesizedExpression(
      new ExpressionBuilderDirector().buildANDExpression(
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
    ),
    output: '(title > 120 && title < 5.42)',
  },
  {
    description: 'Member dot expression with this',
    expression: new ExpressionBuilderDirector().buildMemberDotExpression(
      new ExpressionBuilderDirector().buildThisExpression(),
      'props',
    ),
    output: 'this.props',
  },
  {
    description: 'Member dot expression 2 levels deep',
    expression: new ExpressionBuilderDirector().buildMemberDotExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildThisExpression(),
        'props',
      ),
      'name',
    ),
    output: 'this.props.name',
  },
  {
    description: 'this.props.name to String()',
    expression: new ExpressionBuilderDirector().buildToStringExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          'props',
        ),
        'name',
      ),
    ),
    output: 'this.props.name.toString()',
  },
  {
    description: 'Simple variable toString(',
    expression: new ExpressionBuilderDirector().buildToStringExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('cat'),
    ),
    output: 'cat.toString()',
  },
  {
    description: 'Get class of variable',
    expression: new ExpressionBuilderDirector().buildGetClassExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('result'),
    ),
    output: 'result.constructor',
    // TODO Add test when method call is completed | this.clientError(response).constructor  |
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
