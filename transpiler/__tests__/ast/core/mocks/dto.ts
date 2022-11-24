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
  {
    description: 'DTO with required field containing primitive type',
    fileId: 'testFile.bl',
    inputBLString: 'DTO HelloWorldRequestDTO { string name; }',
    variables: [
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'name',
        type: 'string',
        isOptional: false,
      }),
    ],
    identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  },
  {
    description: 'DTO with both optional and required fields',
    fileId: 'testFile.bl',
    inputBLString: 'DTO HelloWorldRequestDTO {string name; optional string phone;}',
    variables: [
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'name',
        type: 'string',
        isOptional: false,
      }),
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'phone',
        type: 'string',
        isOptional: true,
      }),
    ],
    identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  },
  {
    description: 'DTO with both optional fields',
    fileId: 'testFile.bl',
    inputBLString: 'DTO HelloWorldRequestDTO {optional string name; optional string phone;}',
    variables: [
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'name',
        type: 'string',
        isOptional: true,
      }),
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'phone',
        type: 'string',
        isOptional: true,
      }),
    ],
    identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  },
  {
    description: 'DTO with identifier field',
    fileId: 'testFile.bl',
    inputBLString: 'DTO GetByIdTodoResponseDTO {   TodoReadModel name; }',
    variables: [
      new FieldBuilderDirector().buildIdentifierTypeField({
        name: 'name',
        identifier: 'TodoReadModel',
        isOptional: false,
      }),
    ],
    identifier: new IdentifierBuilder().withDTOName('GetByIdTodoResponseDTO').build(),
  },
];

export const validMultipleDTOSTestCases = [
  {
    description: '2 DTOs with optional field containing array type',
    fileId: 'testFile.bl',
    inputBLString: 'DTO HelloWorldRequestDTO { string name; } DTO TodoRequestDTO { string todo; }',
    variables: [
      [
        new FieldBuilderDirector().buildPrimitiveField({
          name: 'name',
          type: 'string',
          isOptional: false,
        }),
      ],
      [
        new FieldBuilderDirector().buildPrimitiveField({
          name: 'todo',
          type: 'string',
          isOptional: false,
        }),
      ],
    ],
    identifier: [
      new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
      new IdentifierBuilder().withDTOName('TodoRequestDTO').build(),
    ],
  },
];

export const errorCases = [
  {
    description: 'DTO with error in parsing',
    fileId: 'testFile.bl',
    inputBLString: 'DTO HelloWorldRequestDTO{ string[][] 64; }',
  },
];
