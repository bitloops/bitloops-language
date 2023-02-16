import { ParameterBuilderDirector } from '../../builders/parameterDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { CommandHandlerBuilderDirector } from '../../builders/commandHandlerBuilderDirector.js';
import { EvaluationBuilderDirector } from '../../builders/evaluation.js';
import { ArgumentListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentListNodeBuilder.js';
import { ArgumentNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ArgumentList/ArgumentNodeBuilder.js';
import { StatementBuilderDirector } from '../../builders/statement/statementDirector.js';

export const VALID_COMMAND_HANDLER_TEST_CASES = [
  {
    description: 'Withdraw money command handler',
    commandHandler: new CommandHandlerBuilderDirector().buildCommand({
      identifier: 'WithdrawMoneyCommandHandler',
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter(
          'accountRepo',
          'AccountWriteRepoPort',
        ),
      ],
      returnType: new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorTypePrimitiveType(
        'void',
        [
          'ApplicationErrors.AccountNotFoundError',
          'DomainErrors.PINIsNotPositiveNumberError',
          'DomainErrors.InvalidCustomerPINError',
        ],
      ),
      executeParameter: new ParameterBuilderDirector().buildIdentifierParameter(
        'command',
        'WithdrawMoneyCommand',
      ),
      statements: [
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'accountId',
          new ExpressionBuilderDirector().buildEvaluationExpression(
            new EvaluationBuilderDirector().buildBuiltInClassEvaluation(
              'UUIDv4',
              new ArgumentListNodeBuilder()
                .withArguments([
                  new ArgumentNodeBuilder()
                    .withExpression(
                      new ExpressionBuilderDirector().buildMemberDotExpression(
                        new ExpressionBuilderDirector().buildIdentifierExpression('command'),
                        'accountId',
                      ),
                    )
                    .build(),
                ])
                .build(),
            ),
          ),
        ),
        new ConstDeclarationBuilderDirector().buildConstDeclaration(
          'accountEntity',
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildMemberDotExpression(
                new ExpressionBuilderDirector().buildThisExpression(),
                'accountRepo',
              ),
              'getById',
            ),
            new ArgumentListNodeBuilder()
              .withArguments([
                new ArgumentNodeBuilder()
                  .withExpression(
                    new ExpressionBuilderDirector().buildIdentifierExpression('accountId'),
                  )
                  .build(),
              ])
              .build(),
          ),
        ),
        new StatementBuilderDirector().buildIfStatement(
          new ExpressionBuilderDirector().buildNotExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('accountEntity'),
          ),
          [
            new StatementBuilderDirector().buildReturnErrorStatement(
              new ExpressionBuilderDirector().buildEvaluationExpression(
                new EvaluationBuilderDirector().buildErrorEvaluation(
                  'ApplicationErrors.AccountNotFoundError',
                  new ArgumentListDirector().buildArgumentListWithMemberDotExpression(
                    'command',
                    'accountId',
                  ),
                ),
              ),
            ),
          ],
        ),
        new ExpressionBuilderDirector().buildMethodCallExpression(
          new ExpressionBuilderDirector().buildMemberDotExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('accountEntity'),
            'withdrawAmount',
          ),
          //TODO fix this to be for many args
          new ArgumentListDirector().buildArgumentListWithMemberDotExpression('command', 'amount'),
        ),
        new ExpressionBuilderDirector().buildMethodCallExpression(
          new ExpressionBuilderDirector().buildMemberDotExpression(
            new ExpressionBuilderDirector().buildMemberDotExpression(
              new ExpressionBuilderDirector().buildThisExpression(),
              'accountRepo',
            ),
            'update',
          ),
          new ArgumentListDirector().buildArgumentListWithIdentifierExpression('accountEntity'),
        ),
        new ReturnStatementBuilderDirector().buildReturnOKEmpty(),
      ],
    }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/commandHandler/WithdrawMoneyCommandHandler.mock.ts',
    ),
  },
];
