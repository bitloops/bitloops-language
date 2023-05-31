import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ArgumentListDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { DomainEventHandlerBuilderDirector } from '../../builders/domainEventHandler.js';
import { DomainEventHandlerDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { EvaluationBuilderDirector } from '../../builders/evaluation.js';

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
          'publish',
          new ArgumentListDirector().buildArgumentListWithIdentifierExpression('email'),
        ),
      ],
      returnOkType: 'void',
      returnErrorType: 'DomainErrors.SendEmailError',
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event-handler/sendEmailHandler.mock.ts',
    ),
  },
  {
    description: 'event handler with injected dependency',
    domainEventHandler:
      new DomainEventHandlerBuilderDirector().buildDomainEventHandlerWithoutErrors({
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
            'publish',
            new ArgumentListDirector().buildArgumentListWithIdentifierExpression('email'),
          ),
        ],
        returnOkType: 'void',
      }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event-handler/handlerWithDependency.mock.ts',
    ),
  },
  {
    description: 'sendEmail DomainEventHandler with domain service',
    domainEventHandler:
      new DomainEventHandlerBuilderDirector().buildDomainEventHandlerWithoutErrors({
        identifier: 'SendEmailAfterMoneyDepositedHandler',
        parameters: [],
        executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
          'event',
          'MoneyDepositedToAccountDomainEvent',
        ),
        statements: [
          new ConstDeclarationBuilderDirector().buildConstDeclaration(
            'marketingNotificationService',
            new ExpressionBuilderDirector().buildEvaluationExpression(
              new EvaluationBuilderDirector().buildDomainServiceEvaluation(
                'MarketingNotificationDomainService',
                new ArgumentListDirector().buildArgumentListWithArgs([
                  new ArgumentNodeBuilder()
                    .withExpression(
                      new ExpressionBuilderDirector().buildThisMemberDotExpression('repo'),
                    )
                    .build(),
                ]),
              ),
            ),
          ),
          new ConstDeclarationBuilderDirector().buildConstDeclaration(
            'emailToBeSentInfoResponse',
            new ExpressionBuilderDirector().buildMethodCallExpression(
              new ExpressionBuilderDirector().buildMemberDotExpression(
                new ExpressionBuilderDirector().buildIdentifierExpression(
                  'marketingNotificationService',
                ),
                'getNotificationTemplateToBeSent',
              ),
              new ArgumentListDirector().buildArgumentListWithArgs([
                new ArgumentNodeBuilder()
                  .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('user'))
                  .build(),
              ]),
            ),
          ),
          new ExpressionBuilderDirector().buildThisDependencyMethodCall(
            'commandBus',
            'publish',
            new ArgumentListDirector().buildArgumentListWithIdentifierExpression(
              'emailToBeSentInfoResponse',
            ),
          ),
        ],
        returnOkType: 'void',
      }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event-handler/handlerWithDomainService.mock.ts',
    ),
  },
];
