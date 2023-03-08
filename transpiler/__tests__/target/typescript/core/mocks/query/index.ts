import { FieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { FieldBuilderDirector } from '../../builders/field.js';

export const VALID_QUERY_TEST_CASES = [
  {
    description: 'Query with one field',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('id', 'string')])
      .build(),
    queryIdentifierNode: new IdentifierNodeBuilder().withName('GetCustomerByIdQuery').build(),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/query/getCustomerByIdQuery.mock.ts',
    ),
  },
];
