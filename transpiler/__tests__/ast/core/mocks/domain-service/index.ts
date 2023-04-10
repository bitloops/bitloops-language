import { ErrorIdentifiersNodeBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/ErrorIdentifiersNodeBuilderDirector.js';
import { BitloopsPrimaryTypeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { DomainServiceBuilder } from '../../builders/domain-service/domainServiceBuilder.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { PublicMethodBuilder } from '../../builders/methods/PublicMethodBuilder.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';
import { ReturnOkErrorTypeBuilder } from '../../builders/returnOkErrorType.js';
import { StatementDirector } from '../../builders/statement/statementDirector.js';

export const validDomainServiceTestCases = [
  {
    description: 'DomainService with a public method',
    fileId: 'domain-service-with-no-methods',
    inputBLString: `DomainService MarketingNotificationDomainService (repoPort: NotificationTemplateReadRepoPort) {
        public getNotificationTemplateToBeSent(account: AccountEntity): (OK(NotificationTemplateInput), Errors()) {
            return NotificationTemplateInput({ emailOrigin : 'marketing@bitloops.com', notificationTemplate : notificationTemplate });
        }
    }`,
    expectedValue: new DomainServiceBuilder()
      .withIdentifier('MarketingNotificationDomainService')
      .withParameterList(
        new ParameterListBuilderDirector().buildParameterListWithOneParameter({
          parameterIdentifier: 'repoPort',
          parameterType: 'NotificationTemplateReadRepoPort',
        }),
      )
      .withPublicMethods([
        new PublicMethodBuilder()
          .withIdentifier('getNotificationTemplateToBeSent')
          .withParameters(
            new ParameterListBuilderDirector().buildParameterListWithOneParameter({
              parameterIdentifier: 'account',
              parameterType: 'AccountEntity',
            }),
          )
          .withReturnType(
            new ReturnOkErrorTypeBuilder()
              .withOk(
                new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
                  'NotificationTemplateInput',
                ),
              )
              .withErrors([{ error: ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName }])
              .build(),
          )
          .withStatements([
            new StatementDirector().buildReturnOKStatement(
              new ExpressionBuilderDirector().buildEvaluation(
                new EvaluationBuilderDirector().buildStructEvaluation('NotificationTemplateInput', [
                  new EvaluationFieldBuilderDirector().buildStringEvaluationField(
                    'emailOrigin',
                    'marketing@bitloops.com',
                  ),
                  new EvaluationFieldBuilderDirector().buildIdentifierEvaluationField(
                    'notificationTemplate',
                    'notificationTemplate',
                  ),
                ]),
              ),
            ),
          ])
          .build(),
      ])
      .build(),
  },
];
