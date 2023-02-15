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
      'transpiler/__tests__/ast/core/mocks/queryHandlerDeclaration/withdrawMoneyQueryHandler.bl',
    ),
    expected: new QueryHandlerDeclarationBuilder()
      .withIdentifier('WithdrawMoneyQueryHandler')
      .withParameterList(
        new ParameterListBuilderDirector().buildParams([
          new ParameterBuilderDirector().buildIdentifierParameter(
            'accountRepo',
            'AccountWriteRepoPort',
          ),
        ]),
      )
      .withExecute(
        new ExecuteBuilderDirector().buildCommandExecuteWithRepo(
          'ApplicationErrors.AccountNotFound',
        ),
      )
      .build(),
  },
];
