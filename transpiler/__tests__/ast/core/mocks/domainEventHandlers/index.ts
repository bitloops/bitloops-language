import { FileUtil } from '../../../../../src/utils/file.js';
import { DomainEventHandlerBuilder } from '../../builders/domainEventHandler/DomainEventHandlerBuilder.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';
import { StatementDirector } from '../../builders/statement/statementDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';

export const validDomainEventHandlersTestCases = [
  {
    description: 'Domain event handler with one service as dependency',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/domainEventHandlers/handlerWithOneDep.bl',
    ),
    expected: new DomainEventHandlerBuilder()
      .withIdentifier('SendEmailAfterDepositsIncrementedDomainEventHandler')
      .withParameters(
        new ParameterListBuilderDirector().buildParameterListWithOneParameter({
          parameterIdentifier: 'customerService',
          parameterType: 'CustomerServicePort',
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
        parameter: {
          parameter: {
            value: 'event',
            type: {
              bitloopsIdentifierType: 'DepositsIncrementedDomainEvent',
            },
          },
        },
        returnType:
          new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithPrimitiveOkAndNoErrors(
            'void',
          ),
      })
      .withDefaultBusDependencies()
      .build(),
  },
  {
    description: 'Domain event handler with no dependencies',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/domainEventHandlers/handlerWithNoDeps.bl',
    ),
    expected: new DomainEventHandlerBuilder()
      .withIdentifier('SendEmailAfterDepositsIncrementedDomainEventHandler')
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
        parameter: {
          parameter: {
            value: 'event',
            type: {
              bitloopsIdentifierType: 'DepositsIncrementedDomainEvent',
            },
          },
        },
        returnType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithPrimitiveOK(
          'void',
          'ApplicationErrors.AccountNotFound',
        ),
      })
      .withDefaultBusDependencies()
      .build(),
  },
];
