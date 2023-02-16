import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { DomainEventHandlerBuilderDirector } from '../../builders/domainEventHandler.js';
import { DomainEventHandlerDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';

type TDomainEventHandlerTestCase = {
  description: string;
  domainEventHandler: DomainEventHandlerDeclarationNode;
  output: string;
};

export const contextInfo = {
  boundedContextName: 'Banking',
  moduleName: 'Banking',
};

export const VALID_DOMAIN_EVENT_HANDLER_TEST_CASES: Array<TDomainEventHandlerTestCase> = [
  {
    description: 'sendEmail DomainEventHandler',
    domainEventHandler: new DomainEventHandlerBuilderDirector().buildDomainEventHandler({
      identifier: 'SendEmailAfterMoneyDepositedHandler',
      parameters: [],
      executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
        'event',
        'MoneyDepositedToAccountDomainEvent',
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
      'transpiler/__tests__/target/typescript/core/mocks/domain-event-handler/sendEmailHandler.mock.ts',
    ),
  },
  {
    description: 'event handler with injected dependency',
    domainEventHandler: new DomainEventHandlerBuilderDirector().buildDomainEventHandler({
      identifier: 'SendEmailAfterMoneyDepositedHandler',
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter('emailRepo', 'IEmailRepoPort'),
      ],
      executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
        'event',
        'MoneyDepositedToAccountDomainEvent',
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
      'transpiler/__tests__/target/typescript/core/mocks/domain-event-handler/handlerWithDependency.mock.ts',
    ),
  },
];
