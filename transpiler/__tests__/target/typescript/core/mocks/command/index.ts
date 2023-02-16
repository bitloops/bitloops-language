import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { FieldBuilderDirector } from '../../builders/field.js';

export const VALID_COMMAND_TEST_CASES = [
  {
    description: 'Command with one field',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([
        new FieldBuilderDirector().buildRequiredPrimitiveField('email', 'string'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('pin', 'string'),
      ])
      .build(),
    commandIdentifierNode: new IdentifierNodeBuilder().withName('InsertPINCommand').build(),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/command/insertPINCommand.mock.ts',
    ),
  },
];
