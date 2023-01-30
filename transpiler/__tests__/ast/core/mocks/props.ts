import { FieldBuilderDirector } from '../builders/fieldDirector.js';
import { IdentifierBuilder } from '../builders/identifier.js';

export const validPropsTestCases = [
  {
    description: 'Props with optional string field',
    fileId: 'testFile.bl',
    inputBLString: 'Props HelloWorldRequestProps { optional string name; }',
    variables: [
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'name',
        type: 'string',
        isOptional: true,
      }),
    ],
    identifier: new IdentifierBuilder().withPropsName('HelloWorldRequestProps').build(),
  },
  {
    description: 'Props with string field',
    fileId: 'testFile.bl',
    inputBLString: 'Props HelloWorldRequestProps { string name; }',
    variables: [
      new FieldBuilderDirector().buildPrimitiveField({
        name: 'name',
        type: 'string',
        isOptional: false,
      }),
    ],
    identifier: new IdentifierBuilder().withPropsName('HelloWorldRequestProps').build(),
  },
  {
    description: 'Multiline Props with 2 fields',
    fileId: 'testFile.bl',
    inputBLString: `
    Props HelloWorldRequestProps { 
      string name; 
      optional string phone;
    }`,
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
    identifier: new IdentifierBuilder().withPropsName('HelloWorldRequestProps').build(),
  },
  {
    description: 'Props with optional UUIDv4 field',
    fileId: 'testFile.bl',
    inputBLString: 'Props HelloWorldRequestProps { optional UUIDv4 id; }',
    variables: [
      new FieldBuilderDirector().withBuiltinClassTypeField({
        name: 'id',
        type: 'UUIDv4',
        isOptional: true,
      }),
    ],
    identifier: new IdentifierBuilder().withPropsName('HelloWorldRequestProps').build(),
  },
];

export const validMultiplePropsTestCases = [
  {
    description: '2 Props with optional string field ',
    fileId: 'testFile.bl',
    inputBLString: 'Props HelloWorldRequestProps { string name; } Props TodoProps { string todo; }',

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
      new IdentifierBuilder().withPropsName('HelloWorldRequestProps').build(),
      new IdentifierBuilder().withPropsName('TodoProps').build(),
    ],
  },
];

export const errorCases = [
  {
    description: 'Props with error in parsing',
    fileId: 'testFile.bl',
    inputBLString: 'Props HelloWorldRequestProps{ string[][] 64; }',
  },
];
