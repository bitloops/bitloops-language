import { TReadModel } from '../../../../src/types.js';
import { FieldBuilderDirector } from '../builders/fieldDirector.js';
import { ReadModelBuilder } from '../builders/readModelBuilder.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TReadModel;
};

export const validReadModelDeclarationCases: Array<TestCase> = [
  {
    description: 'most trivial read model declaration',
    fileId: 'testFile.bl',
    inputBLString: `
ReadModel TodoReadModel {
  string id;
  string title;
  optional bool completed;
}`,
    expected: new ReadModelBuilder()
      .withIdentifier('TodoReadModel')
      .withField(
        new FieldBuilderDirector().buildPrimitiveField({
          type: 'string',
          name: 'id',
          isOptional: false,
        }),
      )
      .withField(
        new FieldBuilderDirector().buildPrimitiveField({
          type: 'string',
          name: 'title',
          isOptional: false,
        }),
      )
      .withField(
        new FieldBuilderDirector().buildPrimitiveField({
          type: 'bool',
          name: 'completed',
          isOptional: true,
        }),
      )
      .build(),
  },
  {
    description: 'read model declaration with struct array field',
    fileId: 'testFile.bl',
    inputBLString: `
ReadModel PersonReadModel {
  string id;
  string name;
  optional PhoneNumber[] phoneNumbers;
}`,
    expected: new ReadModelBuilder()
      .withIdentifier('PersonReadModel')
      .withField(
        new FieldBuilderDirector().buildPrimitiveField({
          type: 'string',
          name: 'id',
          isOptional: false,
        }),
      )
      .withField(
        new FieldBuilderDirector().buildPrimitiveField({
          type: 'string',
          name: 'name',
          isOptional: false,
        }),
      )
      .withField(
        new FieldBuilderDirector().buildArrayIdentifierField({
          identifier: 'PhoneNumber',
          name: 'phoneNumbers',
          isOptional: true,
        }),
      )
      .build(),
  },
];
