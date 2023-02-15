import { FileUtil } from '../../../../../src/utils/file.js';
import { CommandHandlerDeclarationBuilder } from '../../builders/command/commandHandlerBuilder.js';
import { ExecuteBuilderDirector } from '../../builders/execute/executeDirector.js';
import { ParameterBuilderDirector } from '../../builders/ParameterBuilderDirector.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';

export const validCommandHandlerCases = [
  {
    description: 'CommandHandler declaration without error',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/commandHandlerDeclaration/withdrawMoneyCommandHandler.bl',
    ),
    expected: new CommandHandlerDeclarationBuilder()
      .withIdentifier('WithdrawMoneyCommandHandler')
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
