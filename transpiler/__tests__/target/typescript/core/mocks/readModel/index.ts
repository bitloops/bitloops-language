import { FileUtil } from '../../../../../../src/utils/file.js';
import { FieldBuilderDirector } from '../../builders/field.js';
import { ReadModelBuilderDirector } from '../../builders/readModel.js';

export const VALID_READ_MODEL_TEST_CASES = [
  {
    description: 'Read model with two fields, one optional',
    readModel: new ReadModelBuilderDirector().buildReadModel({
      identifier: 'ClassReadModel',
      fields: [
        new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string'),
        new FieldBuilderDirector().buildOptionalPrimitiveField('numOfTeachers', 'int32'),
        new FieldBuilderDirector().buildRequiredBitloopsIdentifierTypeField('title', 'Title'),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/readModel/classReadModel.mock.ts',
    ),
  },
  {
    description: 'Read model with one required field',
    readModel: new ReadModelBuilderDirector().buildReadModel({
      identifier: 'NameReadModel',
      fields: [new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string')],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/readModel/nameReadModel.mock.ts',
    ),
  },
];
