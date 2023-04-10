import { FieldBuilderDirector } from '../builders/fieldDirector.js';
import { QueryDeclarationBuilder } from '../builders/query/queryDeclarationBuilder.js';

export const validQueryTestCases = [
  {
    description: 'Query with fields',
    fileId: 'testFile.bl',
    inputBLString: 'Query GetCustomerByIdQuery { string id; }',
    expected: new QueryDeclarationBuilder()
      .withVariables({
        fields: [
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'id',
            type: 'string',
            isOptional: false,
          }),
        ],
      })
      .withIdentifier('GetCustomerByIdQuery')
      .build(),
  },
  {
    description: 'Query with no fields',
    fileId: 'testFile.bl',
    inputBLString: 'Query GetCustomerByIdQuery { }',
    expected: new QueryDeclarationBuilder().withIdentifier('GetCustomerByIdQuery').build(),
  },
];
