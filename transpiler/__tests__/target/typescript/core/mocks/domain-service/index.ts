import { FileUtil } from '../../../../../../src/utils/file.js';
import { DomainServiceNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/domain-service/DomainServiceNode.js';
import { DomainServiceNodeBuilderDirector } from '../../builders/domainServiceBuilder.js';
import { ParameterBuilderDirector } from '../../../../../ast/core/builders/ParameterBuilderDirector.js';
import { PublicMethodBuilder } from '../../../../../ast/core/builders/methods/PublicMethodBuilder.js';
import { ParameterListBuilderDirector } from '../../../../../ast/core/builders/parameterListBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../../../../ast/core/builders/returnOkErrorTypeBuilderDirector.js';
import { PrivateMethodBuilder } from '../../../../../ast/core/builders/methods/PrivateMethodBuilder.js';
import { BitloopsPrimaryTypeDirector } from '../../../../../ast/core/builders/bitloopsPrimaryTypeDirector.js';
import { StatementBuilderDirector } from '../../builders/statement/statementDirector.js';
import { PublicMethodBuilderDirector } from '../../builders/methods/publicMethodBuilderDirector.js';

type TDomainServiceHandlerTestCase = {
  description: string;
  domainService: DomainServiceNode;
  output: string;
};

export const contextInfo = {
  boundedContextName: 'Banking',
  moduleName: 'Banking',
};

export const VALID_DOMAIN_SERVICE_TEST_CASES: Array<TDomainServiceHandlerTestCase> = [
  {
    description: 'Simple Domain Service with a public method',
    domainService: new DomainServiceNodeBuilderDirector().buildDomainServiceWithoutPrivateMethods(
      'MarketingNotificationService',
      [
        new ParameterBuilderDirector().buildIdentifierParameter(
          'notificationTemplateRepoPort',
          'NotificationTemplateReadRepoPort',
        ),
      ],
      [
        new PublicMethodBuilder()
          .withIdentifier('getNotificationTemplateToBeSent')
          .withParameters(
            new ParameterListBuilderDirector().buildParams([
              new ParameterBuilderDirector().buildIdentifierParameter('account', 'AccountEntity'),
            ]),
          )
          .withReturnType(
            new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
              'NotificationResponse',
            ),
          )
          .build(),
      ],
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-service/domainService.mock.ts',
    ),
  },
  {
    description: 'Simple Domain Service with public and private methods',
    domainService:
      new DomainServiceNodeBuilderDirector().buildDomainServiceWithPublicPrivateMethods(
        'MarketingNotificationService',
        [
          new ParameterBuilderDirector().buildIdentifierParameter(
            'notificationTemplateRepoPort',
            'NotificationTemplateReadRepoPort',
          ),
        ],
        [
          new PublicMethodBuilder()
            .withIdentifier('getNotificationTemplateToBeSent')
            .withParameters(
              new ParameterListBuilderDirector().buildParams([
                new ParameterBuilderDirector().buildIdentifierParameter('account', 'AccountEntity'),
              ]),
            )
            .withReturnType(
              new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
                'NotificationResponse',
              ),
            )
            .build(),
        ],
        [
          new PrivateMethodBuilder()
            .withIdentifier('isTemplateCorrect')
            .withParameters(new ParameterListBuilderDirector().buildParams([]))
            .withPrimaryReturnType(
              new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'),
            )
            .build(),
        ],
      ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-service/domainServiceWithPrivateMethod.mock.ts',
    ),
  },
  {
    description: 'Domain Service with public method that calls repo',
    domainService: new DomainServiceNodeBuilderDirector().buildDomainService(
      'MarketingNotificationService',
      [
        new ParameterBuilderDirector().buildIdentifierParameter(
          'notificationTemplateRepoPort',
          'NotificationTemplateReadRepoPort',
        ),
      ],
      [
        new PublicMethodBuilderDirector().buildMethodWithStatementsAndVoidReturnType({
          methodName: 'getNotificationTemplateToBeSent',
          statements: [
            new StatementBuilderDirector().buildConstDeclarationThisMethodCallExpression({
              constDeclarationIdentifier: 'notificationTemplate',
              thisIdentifier: 'notificationTemplateRepoPort',
              methodCallIdentifier: 'get',
            }),
            new StatementBuilderDirector().buildConstDeclarationIdentifierExpression(
              'newNotificationTemplate',
              'notificationTemplate',
            ),
          ],
        }),
      ],
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-service/domainServiceWithRepoCall.mock.ts',
    ),
  },
];
