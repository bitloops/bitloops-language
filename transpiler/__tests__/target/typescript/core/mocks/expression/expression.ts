import { ExpressionBuilderDirector } from '../../builders/expression.js';

export const VALID_EXPRESSION_TEST_CASES = [
  //   {
  //     description: 'Or expression',
  //     expression: new FieldListNodeBuilder()
  //       .withFields([
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string'),
  //         new FieldBuilderDirector().buildOptionalPrimitiveField('numOfTeachers', 'int32'),
  //       ])
  //       .build(),
  //     dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('ClassDTO').build(),
  //     output: 'title > 120 || title < 5',
  //   },
  //   {
  //     description: '',
  //     expression: new FieldListNodeBuilder()
  //       .withFields([new FieldBuilderDirector().buildRequiredArrayField('name', 'string')])
  //       .build(),
  //     dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('ClassDTO').build(),
  //     output: 'title * 3 != 120 - 5 && title / 3 == 5 + 3',
  //   },
  //   {
  //     description: ' with array field type double dimension',
  //     expression: new FieldListNodeBuilder()
  //       .withFields([
  //         new FieldBuilderDirector().buildRequiredArrayFieldDoubleDimension('name', 'string'),
  //       ])
  //       .build(),
  //     dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('ClassDTO').build(),
  //     output: 'title % 3 >= 120 - 5 && title <= 500.6',
  //   },
  {
    description: 'Not expression',
    expression: new ExpressionBuilderDirector().buildNotExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
    ),
    output: '! a ',
  },
  //   {
  //     description: 'DTO with different primitive types',
  //     expression: new FieldListNodeBuilder()
  //       .withFields([
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name1', 'int32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name2', 'int64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name3', 'double'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name4', 'uint32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name5', 'uint64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name6', 'sint32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name7', 'sint64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name8', 'fixed32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name9', 'fixed64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name0', 'sfixed32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name10', 'sfixed64'),
  //       ])
  //       .build(),
  //     dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('FullDTO').build(),
  //     output: '(a && ! b) || (! a && b)',
  //   },
  //   {
  //     description: 'DTO with different primitive types',
  //     expression: new FieldListNodeBuilder()
  //       .withFields([
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name1', 'int32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name2', 'int64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name3', 'double'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name4', 'uint32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name5', 'uint64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name6', 'sint32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name7', 'sint64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name8', 'fixed32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name9', 'fixed64'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name0', 'sfixed32'),
  //         new FieldBuilderDirector().buildRequiredPrimitiveField('name10', 'sfixed64'),
  //       ])
  //       .build(),
  //     dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('FullDTO').build(),
  //     output: '(a == b) && (c >= d)',
  //   },
  //   {
  //     description: 'DTO with different primitive types',
  //     fieldListNode: new FieldListNodeBuilder(),
  //     output: '[1,2,3]',
  //   },
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
