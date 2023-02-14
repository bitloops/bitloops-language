import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { DomainEventHandlerBuilderDirector } from '../../builders/domainEventHandler.js';
import { DomainEventHandlerDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';

type TDomainEventHandlerTestCase = {
  description: string;
  domainEventHandler: DomainEventHandlerDeclarationNode;
  output: string;
};

export const VALID_DOMAIN_EVENT_HANDLER_TEST_CASES: Array<TDomainEventHandlerTestCase> = [
  {
    description: 'sendEmail DomainEventHandler',
    domainEventHandler: new DomainEventHandlerBuilderDirector().buildDomainEventHandler({
      identifier: 'SendEmailAfterMoneyDepositedHandler',
      parameters: [],
      executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
        'event',
        'CreateTodoRequestDTO',
      ),
      statements: [
        new ConstDeclarationBuilderDirector().buildValueObjectConstDeclarationWithEvaluationFields({
          identifier: 'title',
          valueObjectIdentifier: 'TitleVO',
          evaluationFields: [
            new EvaluationFieldBuilderDirector().buildMemberDotEvaluationField(
              'title',
              'requestDTO',
              'title',
            ),
          ],
        }),
        new ConstDeclarationBuilderDirector().buildEntityEvaluationConstDeclaration({
          identifier: 'todo',
          entityIdentifier: 'TodoEntity',
          evaluationFields: [
            new EvaluationFieldBuilderDirector().buildIdentifierEvaluationField('title', 'title'),
            new EvaluationFieldBuilderDirector().buildBooleanLiteralEvaluationField(
              'completed',
              false,
            ),
          ],
        }),
        new ExpressionBuilderDirector().buildThisDependencyMethodCall(
          'todoRepo',
          'save',
          new ArgumentListDirector().buildArgumentListWithIdentifierExpression('todo'),
        ),
        new ReturnStatementBuilderDirector().buildReturnOKEmpty(),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event-handler/sendEmailHandler.mock.ts',
    ),
  },
];
