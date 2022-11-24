import { DTOIdentifierNodeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { FieldListNodeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
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
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('FinalDTO').build(),
    output: 'export interface FinalDTO { }',
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
