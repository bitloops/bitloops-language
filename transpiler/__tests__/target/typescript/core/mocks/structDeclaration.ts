import { StructIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Struct/StructIdentifierNodeBuilder.js';
import { FieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldListNode.js';
import { IdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { FieldBuilderDirector } from '../builders/field.js';
import { FieldListBuilderDirector } from '../builders/fieldList.js';

type TValidTestCases = {
  description: string;
  name: IdentifierNode;
  fields: FieldListNode;
  output: string;
};

export const VALID_STRUCT_DECLARATION_TEST_CASES: TValidTestCases[] = [
  {
    description: 'A valid struct declaration with array and string',
    name: new StructIdentifierNodeBuilder().withName('MyStruct').build(),
    fields: new FieldListBuilderDirector().withFields([
      new FieldBuilderDirector().buildRequiredArrayField('myArray', 'string'),
      new FieldBuilderDirector().buildRequiredPrimitiveField('myString', 'string'),
    ]),
    output: 'export type MyStruct = { myArray: string[]; myString: string; };',
  },
  {
    description: 'A valid struct declaration with array and UUID',
    name: new StructIdentifierNodeBuilder().withName('MyStruct').build(),
    fields: new FieldListBuilderDirector().withFields([
      new FieldBuilderDirector().buildRequiredArrayField('myArray', 'string'),
      new FieldBuilderDirector().buildOptionalBuiltInClassField('myUUID', 'UUIDv4'),
    ]),
    output: `import { Domain } from '@bitloops/bl-boilerplate-core';
              export type MyStruct = { myArray: string[]; myUUID?: Domain.UUIDv4; };`,
  },
];
