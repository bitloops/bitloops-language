import { FileUtil } from '../../../../../../src/utils/file.js';
import { DomainServiceNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/domain-service/DomainServiceNode.js';
import { DomainServiceNodeBuilderDirector } from '../../builders/domainServiceBuilder.js';
import { ParameterBuilderDirector } from '../../../../../ast/core/builders/ParameterBuilderDirector.js';
import { PublicMethodBuilder } from '../../../../../ast/core/builders/methods/PublicMethodBuilder.js';
import { ParameterListBuilderDirector } from '../../../../../ast/core/builders/parameterListBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../../../../ast/core/builders/returnOkErrorTypeBuilderDirector.js';

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
];
