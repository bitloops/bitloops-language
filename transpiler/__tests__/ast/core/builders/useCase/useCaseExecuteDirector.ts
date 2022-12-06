import { TExecute } from '../../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../bitloopsPrimaryTypeDirector.js';
import { EvaluationBuilderDirector } from '../evaluationDirector.js';
import { EvaluationFieldBuilderDirector } from '../evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ReturnOkErrorTypeBuilder } from '../returnOkErrorType.js';
import { StatementDirector } from '../statement/statementDirector.js';
import { UseCaseExecuteBuilder } from './useCaseExecuteBuilder.js';

export class UseCaseExecuteBuilderDirector {
  private useCaseExecuteBuilder: UseCaseExecuteBuilder;
  constructor() {
    this.useCaseExecuteBuilder = new UseCaseExecuteBuilder();
  }

  buildExecuteWithOneReturnDTO(): TExecute {
    const useCaseExecuteDeclaration = this.useCaseExecuteBuilder
      .withParameterList([])
      .withReturnType(
        new ReturnOkErrorTypeBuilder()
          .withOk(
            new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('HelloWorldResponseDTO'),
          )
          .withErrors([])
          .build().returnType,
      )
      .withStatements([
        new StatementDirector().buildReturnStatement(
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

    return useCaseExecuteDeclaration;
  }
}
