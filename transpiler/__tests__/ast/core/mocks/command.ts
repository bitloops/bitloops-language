import { CommandDeclarationBuilder } from '../builders/command/commandDeclarationBuilder.js';
import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';
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
      .withCommandTopic(
        new ExpressionBuilderDirector().buildStringLiteralExpression(
          'Hello World.core.COMMAND.INSERT_PIN',
        ),
      )
      .withIdentifier('InsertPINCommand')
      .build(),
  },
];
