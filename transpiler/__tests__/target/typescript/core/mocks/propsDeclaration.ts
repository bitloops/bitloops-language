import { FieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { PropsNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { FieldBuilderDirector } from '../builders/field.js';
import { PropsDeclarationBuilderDirector } from '../builders/propsDeclarationDirector.js';

type TestCase = {
  description: string;
  propsDeclaration: PropsNode;
  output: string;
};

export const VALID_PROPS_DECLARATION_TEST_CASES: TestCase[] = [
  {
    description: 'Should generate a props declaration with one property',
    propsDeclaration: new PropsDeclarationBuilderDirector().buildProps(
      'NameProps',
      new FieldListNodeBuilder()
        .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string')])
        .build(),
    ),
    output: 'export interface NameProps { name: string; }',
  },
  {
    description: 'Should generate a props declaration with two properties',
    propsDeclaration: new PropsDeclarationBuilderDirector().buildProps(
      'ClassProps',
      new FieldListNodeBuilder()

        .withFields([
          new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string'),
          new FieldBuilderDirector().buildOptionalPrimitiveField('numOfTeachers', 'int32'),
        ])
        .build(),
    ),
    output: 'export interface ClassProps { name: string; numOfTeachers?: number; }',
  },
  {
    description: 'Should generate a props declaration with one optional domain uid property',
    propsDeclaration: new PropsDeclarationBuilderDirector().buildProps(
      'TodoProps',
      new FieldListNodeBuilder()
        .withFields([new FieldBuilderDirector().buildOptionalBuiltInClassField('id', 'UUIDv4')])
        .build(),
    ),
    output:
      "import { Domain } from '@bitloops/bl-boilerplate-core'; export interface TodoProps { id?: Domain.UUIDv4; }",
  },
  {
    description: 'Props with standard VO type',
    propsDeclaration: new PropsDeclarationBuilderDirector().buildProps(
      'TodoProps',
      new FieldListNodeBuilder()
        .withFields([
          new FieldBuilderDirector().buildStandardVOField('currency', 'Currency', false),
        ])
        .build(),
    ),
    output:
      "import { Domain } from '@bitloops/bl-boilerplate-core'; export interface TodoProps { currency: Domain.StandardVO.Currency.Value; }",
  },
];
