import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { IntegrationEventHandlerDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventHandlerBuilderDirector } from '../../builders/integrationEventHandlerNodeBuilderDirector.js';
import { IntegrationEventParameterNodeBuilderDirector } from '../../builders/IntegrationEventParameterNodeBuilderDirector.js';

type TIntegrationEventHandlerTestCase = {
  description: string;
  integrationEventHandler: IntegrationEventHandlerDeclarationNode;
  output: string;
};

export const contextInfo = {
  boundedContextName: 'marketing',
  moduleName: 'marketing',
};

export const VALID_INTEGRATION_EVENT_HANDLER_TEST_CASES: Array<TIntegrationEventHandlerTestCase> = [
  {
    description: 'money deposited IntegrationEventHandler',
    integrationEventHandler:
      new IntegrationEventHandlerBuilderDirector().buildIntegrationEventHandler({
        identifier: 'MoneyDepositedIntegrationHandler',
        versionName: 'v1',
        parameters: [],
        executeParameter:
          new IntegrationEventParameterNodeBuilderDirector().buildIntegrationEventParameter({
            parameterName: 'event',
            integrationTypeIdentifier: 'MoneyDepositedIntegrationEvent',
            boundedContextName: 'banking',
            moduleName: 'banking',
          }),
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
        executeParameter:
          new IntegrationEventParameterNodeBuilderDirector().buildIntegrationEventParameter({
            parameterName: 'event',
            integrationTypeIdentifier: 'MoneyDepositedIntegrationEvent',
            boundedContextName: 'banking',
            moduleName: 'banking',
          }),
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
  {
    description: 'event handler with integration event from package dependency',
    integrationEventHandler:
      new IntegrationEventHandlerBuilderDirector().buildIntegrationEventHandler({
        identifier: 'MoneyDepositedIntegrationHandler',
        versionName: 'v1',
        parameters: [
          new ParameterBuilderDirector().buildIdentifierParameter('emailRepo', 'IEmailRepoPort'),
        ],
        executeParameter:
          new IntegrationEventParameterNodeBuilderDirector().buildIntegrationEventParameter({
            parameterName: 'event',
            integrationTypeIdentifier: 'UserRegisteredIntegrationEvent',
            boundedContextName: 'bitloops',
            moduleName: 'authNestPassport',
          }),
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
      'transpiler/__tests__/target/typescript/core/mocks/integration-event-handler/handlerWithEventFromPackage.mock.ts',
    ),
  },
];
