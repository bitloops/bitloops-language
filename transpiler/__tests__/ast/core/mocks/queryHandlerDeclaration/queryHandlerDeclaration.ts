import { FileUtil } from '../../../../../src/utils/file.js';
import { QueryHandlerDeclarationBuilder } from '../../builders/query/queryHandlerBuilder.js';
import { ExecuteBuilderDirector } from '../../builders/execute/executeDirector.js';
import { ParameterBuilderDirector } from '../../builders/ParameterBuilderDirector.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';

export const validQueryHandlerCases = [
  {
    description: 'QueryHandler declaration without error',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/queryHandlerDeclaration/getByIdQueryHandler.bl',
    ),
    expected: new QueryHandlerDeclarationBuilder()
      .withIdentifier('GetCustomerQueryHandler')
      .withParameterList(
        new ParameterListBuilderDirector().buildParams([
          new ParameterBuilderDirector().buildIdentifierParameter(
            'customerRepo',
            'CustomerReadRepoPort',
          ),
        ]),
      )
      .withExecute(
        new ExecuteBuilderDirector().buildQueryExecuteWithRepo({
          identifierOK: 'CustomerReadModel',
          identifierError: 'ApplicationErrors.CustomerNotFound',
        }),
      )
      .build(),
  },
];
