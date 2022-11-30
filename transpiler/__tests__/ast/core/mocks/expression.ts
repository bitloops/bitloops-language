import { FieldBuilderDirector } from '../builders/fieldDirector.js';
import { IdentifierBuilder } from '../builders/identifier.js';

export const validDTOTestCases = [
  {
    description: 'DTO with optional field containing array type',
    fileId: 'testFile.bl',
    inputBLString: 'DTO HelloWorldRequestDTO{ optional string[][] name; }',
    variables: [
      new FieldBuilderDirector().buildDoubleArrayField({
        name: 'name',
        type: 'string',
        isOptional: true,
      }),
    ],
    identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  },
];
