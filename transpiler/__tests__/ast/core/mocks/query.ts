import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';
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
      .withCommandTopic(
        new ExpressionBuilderDirector().buildStringLiteralExpression(
          'Hello World.core.QUERY.GET_CUSTOMER_BY_ID',
        ),
      )
      .withIdentifier('GetCustomerByIdQuery')
      .build(),
  },
];
