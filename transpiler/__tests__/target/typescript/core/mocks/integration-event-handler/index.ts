import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { IntegrationEventHandlerDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventHandlerBuilderDirector } from '../../builders/integrationEventHandlerNodeBuilderDirector.js';

type TIntegrationEventHandlerTestCase = {
  description: string;
  integrationEventHandler: IntegrationEventHandlerDeclarationNode;
  output: string;
};

export const contextInfo = {
  boundedContextName: 'Banking',
  moduleName: 'Banking',
};

export const VALID_INTEGRATION_EVENT_HANDLER_TEST_CASES: Array<TIntegrationEventHandlerTestCase> = [
  {
    description: 'money deposited IntegrationEventHandler',
    integrationEventHandler:
      new IntegrationEventHandlerBuilderDirector().buildIntegrationEventHandler({
        identifier: 'MoneyDepositedIntegrationHandler',
        versionName: 'v1',
        parameters: [],
        executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
          'event',
          'MoneyDepositedIntegrationEvent',
        ),
        statements: [
          new ConstDeclarationBuilderDirector().buildStringExpressionConstDeclaration(
            'email',
            'example@email.com',
          ),
          new ExpressionBuilderDirector().buildThisDependencyMethodCall(
            'commandBus',
            'send',
            new ArgumentListDirector().buildArgumentListWithIdentifierExpression('email'),
          ),
        ],
      }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/integration-event-handler/moneyDepositedIntegrationHandler.mock.ts',
    ),
  },
  {
    description: 'event handler with injected dependency',
    integrationEventHandler:
      new IntegrationEventHandlerBuilderDirector().buildIntegrationEventHandler({
        identifier: 'MoneyDepositedIntegrationHandler',
        versionName: 'v1',
        parameters: [
          new ParameterBuilderDirector().buildIdentifierParameter('emailRepo', 'IEmailRepoPort'),
        ],
        executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
          'event',
          'MoneyDepositedIntegrationEvent',
        ),
        statements: [
          new ConstDeclarationBuilderDirector().buildStringExpressionConstDeclaration(
            'email',
            'example@email.com',
          ),
          new ExpressionBuilderDirector().buildThisDependencyMethodCall(
            'commandBus',
            'send',
            new ArgumentListDirector().buildArgumentListWithIdentifierExpression('email'),
          ),
        ],
      }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/integration-event-handler/handlerWithDependency.mock.ts',
    ),
  },
];
