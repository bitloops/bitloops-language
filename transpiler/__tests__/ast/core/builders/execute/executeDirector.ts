import { TExecute } from '../../../../../src/types.js';
import { ArgumentBuilderDirector } from '../argumentDirector.js';
import { ArgumentListBuilderDirector } from '../argumentListBuilderDirector.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { EvaluationBuilderDirector } from '../evaluationDirector.js';
import { EvaluationFieldBuilderDirector } from '../evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ReturnOkErrorTypeBuilder } from '../returnOkErrorType.js';
import { ConstDeclarationBuilderDirector } from '../statement/constDeclarationDirector.js';
import { StatementDirector } from '../statement/statementDirector.js';
import { ExecuteBuilder } from './executeBuilder.js';

export class ExecuteBuilderDirector {
  private executeBuilder: ExecuteBuilder;
  constructor() {
    this.executeBuilder = new ExecuteBuilder();
  }

  buildExecuteWithOneReturnDTO(): TExecute {
    const executeDeclaration = this.executeBuilder
      .withReturnType(
        new ReturnOkErrorTypeBuilder()
          .withOk(
            new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('HelloWorldResponseDTO'),
          )
          .withErrors([])
          .build(),
      )
      .withStatements([
        new StatementDirector().buildReturnOKStatement(
          new ExpressionBuilderDirector().buildEvaluation(
            new EvaluationBuilderDirector().buildDTOEvaluation('HelloWorldResponseDTO', [
              new EvaluationFieldBuilderDirector().buildStringEvaluationField(
                'message',
                'Hello, World!',
              ),
            ]),
          ),
        ),
      ])
      .build();

    return executeDeclaration;
  }

  buildExecuteWithDomainEvaluations(executeReturnTypes: {
    identifierOK: string;
    identifierError?: string;
  }): TExecute {
    const executeDeclaration = this.executeBuilder
      .withReturnType(
        new ReturnOkErrorTypeBuilder()
          .withOk(
            new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
              executeReturnTypes.identifierOK,
            ),
          )
          .withErrors([])
          .build(),
      )
      .withStatements([
        new StatementDirector().buildConstDeclarationWithValueObject({
          name: 'title',
          valueObjectIdentifier: 'TitleVO',
          valueObjectFields: [
            {
              identifier: 'title',
              expression: new ExpressionBuilderDirector().buildMemberExpression(
                new ExpressionBuilderDirector().buildIdentifierExpression('requestDTO'),
                'title',
              ),
            },
          ],
        }),
        new StatementDirector().buildConstDeclarationWithEntity({
          name: 'todo',
          entityIdentifier: 'TodoEntity',
          entityFields: [
            {
              identifier: 'title',
              expression: new ExpressionBuilderDirector().buildIdentifierExpression('title'),
            },
            {
              identifier: 'completed',
              expression: new ExpressionBuilderDirector().buildBooleanLiteralExpression(false),
            },
          ],
        }),
        new StatementDirector().buildReturnOKStatement(
          new ExpressionBuilderDirector().buildEvaluation(
            new EvaluationBuilderDirector().buildDTOEvaluation('CreateTodoResponseDTO', [
              new EvaluationFieldBuilderDirector().buildEvaluationField(
                'message',
                new ExpressionBuilderDirector().buildIdentifierExpression('todo'),
              ),
            ]),
          ),
        ),
      ])
      .build();

    return executeDeclaration;
  }

  buildCommandExecuteWithRepo(errorIdentifier: string): TExecute {
    const executeDeclaration = this.executeBuilder
      .withReturnType(
        new ReturnOkErrorTypeBuilder()
          .withOk(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('void'))
          .withErrors([{ error: errorIdentifier }])
          .build(),
      )
      .withStatements([
        new ConstDeclarationBuilderDirector().buildBuiltInClassWithMemberDotArgument({
          name: 'accountId',
          builtInClassIdentifier: 'UUIDv4',
          builtInClassArgs: ['command', 'accountId'],
        }),
        new ConstDeclarationBuilderDirector().buildConstDeclarationWithExpression({
          name: 'accountEntity',
          expression: new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildMemberExpression(
              new ExpressionBuilderDirector().buildMemberExpression(
                new ExpressionBuilderDirector().buildThisExpression(),
                'accountRepo',
              ),
              'getById',
            ),
            new ArgumentListBuilderDirector().buildArgumentListWithArgs([
              new ArgumentBuilderDirector().buildIdentifierArgument('accountId'),
            ]),
          ),
        }),
        new StatementDirector().buildIfStatement({
          condition: new ExpressionBuilderDirector().buildLogicalNotExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('accountEntity'),
          ),
          thenStatements: [
            new StatementDirector().buildReturnErrorStatement(
              new ExpressionBuilderDirector().buildEvaluation(
                new EvaluationBuilderDirector().buildErrorEvaluation(
                  'ApplicationErrors.AccountNotFound',
                  new ArgumentListBuilderDirector().buildMemberDotArguments([
                    ['command', 'accountId'],
                  ]),
                ),
              ),
            ),
          ],
        }),
        new ExpressionBuilderDirector().buildMethodCallExpression(
          new ExpressionBuilderDirector().buildMemberExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression('accountEntity'),
            'withdrawAmount',
          ),
          new ArgumentListBuilderDirector().buildMemberDotArguments([['command', 'amount']]),
        ),
        new ExpressionBuilderDirector().buildMethodCallExpression(
          new ExpressionBuilderDirector().buildMemberExpression(
            new ExpressionBuilderDirector().buildMemberExpression(
              new ExpressionBuilderDirector().buildThisExpression(),
              'accountRepo',
            ),
            'update',
          ),
          new ArgumentListBuilderDirector().buildArgumentListWithArgs([
            new ArgumentBuilderDirector().buildIdentifierArgument('accountEntity'),
          ]),
        ),
        new StatementDirector().buildEmptyReturnOK(),
      ])
      .build();

    return executeDeclaration;
  }

  buildExecuteWithDomainEvaluationsAndNoReturn(): TExecute {
    const executeDeclaration = this.executeBuilder
      .withReturnType(
        new ReturnOkErrorTypeBuilder()
          .withOk(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('void'))
          .withErrors([])
          .build(),
      )
      .withStatements([
        new StatementDirector().buildConstDeclarationWithValueObject({
          name: 'title',
          valueObjectIdentifier: 'TitleVO',
          valueObjectFields: [
            {
              identifier: 'title',
              expression: new ExpressionBuilderDirector().buildMemberExpression(
                new ExpressionBuilderDirector().buildIdentifierExpression('requestDTO'),
                'title',
              ),
            },
          ],
        }),
        new StatementDirector().buildConstDeclarationWithEntity({
          name: 'todo',
          entityIdentifier: 'TodoEntity',
          entityFields: [
            {
              identifier: 'title',
              expression: new ExpressionBuilderDirector().buildIdentifierExpression('title'),
            },
            {
              identifier: 'completed',
              expression: new ExpressionBuilderDirector().buildBooleanLiteralExpression(false),
            },
          ],
        }),
        new StatementDirector().buildEmptyReturnOK(),
      ])
      .build();

    return executeDeclaration;
  }
}
