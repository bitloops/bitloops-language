import { TExecute } from '../../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { EvaluationBuilderDirector } from '../evaluationDirector.js';
import { EvaluationFieldBuilderDirector } from '../evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ReturnOkErrorTypeBuilder } from '../returnOkErrorType.js';
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
