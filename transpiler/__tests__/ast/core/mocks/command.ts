import { CommandDeclarationBuilder } from '../builders/command/commandDeclarationBuilder.js';
import { FieldBuilderDirector } from '../builders/fieldDirector.js';

export const validCommandTestCases = [
  {
    description: 'Command with fields',
    fileId: 'testFile.bl',
    inputBLString: 'Command InsertPINCommand { string email; string pin; }',
    expected: new CommandDeclarationBuilder()
      .withVariables({
        fields: [
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'email',
            type: 'string',
            isOptional: false,
          }),
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'pin',
            type: 'string',
            isOptional: false,
          }),
        ],
      })
      .withIdentifier('InsertPINCommand')
      .build(),
  },
];
