import { DTOIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { FieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { FieldBuilderDirector } from '../builders/field.js';

export const VALID_DTO_TEST_CASES = [
  {
    description: 'DTO with optional field and primitive type',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildOptionalPrimitiveField('todo', 'string')])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('TodoDTO').build(),
    output: 'export interface TodoDTO { todo?: string; }',
  },
  {
    description: 'DTO with required field and primitive type',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string')])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('HelloDTO').build(),
    output: 'export interface HelloDTO { name: string; }',
  },
  {
    description: 'DTO with multiple fields',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([
        new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string'),
        new FieldBuilderDirector().buildOptionalPrimitiveField('numOfTeachers', 'int32'),
      ])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('ClassDTO').build(),
    output: 'export interface ClassDTO { name: string; numOfTeachers?: number; }',
  },
  {
    description: 'DTO with array field type',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildRequiredArrayField('name', 'string')])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('ClassDTO').build(),
    output: 'export interface ClassDTO { name: string[]; }',
  },
  {
    description: 'DTO with array field type double dimension',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([
        new FieldBuilderDirector().buildRequiredArrayFieldDoubleDimension('name', 'string'),
      ])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('ClassDTO').build(),
    output: 'export interface ClassDTO { name: string[][]; }',
  },
  {
    description: 'DTO with empty fields',
    fieldListNode: new FieldListNodeBuilder().build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('EmptyDTO').build(),
    output: 'export interface EmptyDTO { }',
  },
  {
    description: 'DTO with different primitive types',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([
        new FieldBuilderDirector().buildRequiredPrimitiveField('name1', 'int32'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name2', 'int64'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name3', 'double'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name4', 'uint32'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name5', 'uint64'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name6', 'sint32'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name7', 'sint64'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name8', 'fixed32'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name9', 'fixed64'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name0', 'sfixed32'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('name10', 'sfixed64'),
      ])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('FullDTO').build(),
    output:
      'export interface FullDTO' +
      '{ name1: number; name2: number; name3: number; name4: number; name5: number;' +
      'name6: number; name7: number; name8: number; name9: number; name0: number; name10: number; }',
  },
];

export const VALID_TWO_DTOS_TEST_CASES = [
  {
    description: 'DTOs with different fields',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildOptionalPrimitiveField('todo', 'bool')])
      .build(),
    secondFieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('hello', 'uint64')])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('TodoDTO').build(),
    secondDTOIdentifierNode: new DTOIdentifierNodeBuilder().withName('HelloDTO').build(),
    output: 'export interface TodoDTO { todo?: boolean; }',
    secondOutput: 'export interface HelloDTO { hello: number; }',
  },
];
