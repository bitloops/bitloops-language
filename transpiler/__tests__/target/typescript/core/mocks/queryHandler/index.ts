import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { ArgumentListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { QueryHandlerBuilderDirector } from '../../builders/queryHandlerBuilderDirector.js';

export const VALID_QUERY_HANDLER_TEST_CASES = [
  {
    description: 'Get Customer By Id query handler',
    queryHandler: new QueryHandlerBuilderDirector().buildQuery({
      identifier: 'GetCustomerByIdQueryHandler',
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter(
          'customerRepo',
          'CustomerReadRepoPort',
        ),
      ],
      returnType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypeBitloopsIdentifier(
        'CustomerReadModel',
        ['ApplicationErrors.CustomerNotFoundError'],
      ),
      executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
        'query',
        'GetCustomerByIdQuery',
      ),
      statements: [
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'requestId',
          new ExpressionBuilderDirector().buildMemberDotExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('query'),
            'id',
          ),
        ),
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'customer',
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildMemberDotExpression(
                new ExpressionBuilderDirector().buildThisExpression(),
                'customerRepo',
              ),
              'getById',
            ),
            new ArgumentListNodeBuilder()
              .withArguments([
                new ArgumentNodeBuilder()
                  .withExpression(
                    new ExpressionBuilderDirector().buildIdentifierExpression('requestId'),
                  )
                  .build(),
              ])
              .build(),
          ),
        ),
        new ReturnStatementBuilderDirector().buildReturnOK(
          new ExpressionBuilderDirector().buildIdentifierExpression('customer'),
        ),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/queryHandler/GetCustomerByIDQueryHandler.mock.ts',
    ),
  },
];
