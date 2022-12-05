import { FieldBuilderDirector } from '../builders/fieldDirector.js';
import { StructBuilderDirector } from '../builders/structBuilderDirector.js';

export const validStructDeclarationCases = [
  {
    description: 'Struct declaration with  primitive types',
    fileId: 'testFile.bl',
    inputBLString: 'Struct HelloWorld{ string name; int32 age; };',
    expected: new StructBuilderDirector().buildStructWithRequiredFields({
      name: 'HelloWorld',
      fields: [
        new FieldBuilderDirector().buildPrimitiveField({
          name: 'name',
          type: 'string',
          isOptional: false,
        }),
        new FieldBuilderDirector().buildPrimitiveField({
          name: 'age',
          type: 'int32',
          isOptional: false,
        }),
      ],
    }),
  },
  {
    description: 'Struct declaration with both primitive and value Objects and optional fields',
    fileId: 'testFile.bl',
    inputBLString: 'Struct HelloWorldStruct { string name ; optional Info info; };',
    expected: new StructBuilderDirector().buildStructWithRequiredNameAndOptionalInfo({
      name: 'HelloWorldStruct',
    }),
  },
  {
    description: 'Struct declaration array type',
    fileId: 'testFile.bl',
    inputBLString: 'Struct HelloWorld { string[] addresses; };',
    expected: new StructBuilderDirector().buildStructWithRequiredFields({
      name: 'HelloWorld',
      fields: [
        new FieldBuilderDirector().buildArrayField({
          name: 'addresses',
          type: 'string',
          isOptional: false,
        }),
      ],
    }),
  },
];

export const invalidStructDeclarationCases = [
  {
    description: 'Struct with wrong fields',
    fileId: 'testFile.bl',
    inputBLString: 'Struct HelloWorldStruct { qaddress address; };',
  },
];

export const validMultipleStructsTestCases = [
  {
    description: 'Struct with wrong fields',
    fileId: 'testFile.bl',
    inputBLString: 'Struct PhoneBook { string[] addresses; }; Struct HelloWorld { string world; };',
    expected: [
      new StructBuilderDirector().buildStructWithRequiredFields({
        name: 'PhoneBook',
        fields: [
          new FieldBuilderDirector().buildArrayField({
            name: 'addresses',
            type: 'string',
            isOptional: false,
          }),
        ],
      }),
      new StructBuilderDirector().buildStructWithRequiredFields({
        name: 'HelloWorld',
        fields: [
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'world',
            type: 'string',
            isOptional: false,
          }),
        ],
      }),
    ],
  },
];
