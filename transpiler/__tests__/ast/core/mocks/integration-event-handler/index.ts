import { FileUtil } from '../../../../../src/utils/file.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';
import { IntegrationEventHandlerBuilder } from '../../builders/integration-event/IntegrationEventHandlerBuilder.js';
import { IntegrationEventParameterBuilder } from '../../builders/IntegrationEventParameterBuilder.js';
import { BoundedContextModuleBuilderDirector } from '../../../setup/builders/boundedContextModuleBuilderDirector.js';
import { StatementDirector } from '../../builders/statement/statementDirector.js';

export const validIntegrationEventHandlersTestCases = [
  {
    description: 'Integration event handler with one service as dependency',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/integration-event-handler/handlerWithOneDep.bl',
    ),
    expected: new IntegrationEventHandlerBuilder()
      .withIdentifier('MoneyDepositedIntegrationEventHandler')
      .withParameters(
        new ParameterListBuilderDirector().buildParameterListWithOneParameter({
          parameterIdentifier: 'commandBus',
          parameterType: 'ICommandBus',
        }),
      )
      .withHandleMethod({
        statements: [
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildThisMemberExpressionOutOfVariables(
              'commandBus',
              'send',
            ),
            new ArgumentListBuilderDirector().buildArgumentList(['command']),
          ),
          new StatementDirector().buildEmptyReturnOK(),
        ],
        parameter: new IntegrationEventParameterBuilder()
          .withValue('event')
          .withIntegrationTypeIdentifier('MoneyDepositedIntegrationEvent')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'banking',
              moduleName: 'banking',
            }),
          )
          .build(),
      })
      .withDefaultBusDependencies()
      .build(),
  },
  {
    description: 'Integration event handler with no dependencies',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/integration-event-handler/handlerWithNoDeps.bl',
    ),
    expected: new IntegrationEventHandlerBuilder()
      .withIdentifier('MoneyDepositedIntegrationEventHandler')
      .withParameters(new ParameterListBuilderDirector().buildParams([]))
      .withHandleMethod({
        statements: [
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildThisMemberExpressionOutOfVariables(
              'commandBus',
              'send',
            ),
            new ArgumentListBuilderDirector().buildArgumentList(['command']),
          ),
          new StatementDirector().buildEmptyReturnOK(),
        ],
        parameter: new IntegrationEventParameterBuilder()
          .withValue('event')
          .withIntegrationTypeIdentifier('MoneyDepositedIntegrationEvent')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'banking',
              moduleName: 'banking',
            }),
          )
          .build(),
      })
      .withDefaultBusDependencies()
      .build(),
  },
];
