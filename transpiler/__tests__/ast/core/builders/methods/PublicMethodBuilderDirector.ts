import { TDomainPublicMethod, TEvaluationFields } from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { IdentifierBuilder } from '../identifier.js';
import { ParameterListBuilderDirector } from '../parameterListBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
import { StatementDirector } from '../statement/statementDirector.js';
import { StatementListDirector } from '../statement/statementListDirector.js';
import { PublicMethodBuilder } from './PublicMethodBuilder.js';

export class PublicMethodBuilderDirector {
  private builder: PublicMethodBuilder;

  constructor() {
    this.builder = new PublicMethodBuilder();
  }

  buildMethodWithReturnEntityEvaluation({
    methodName,
    entityName,
    entityFields,
  }: {
    methodName: string;
    entityName: string;
    entityFields: TEvaluationFields;
  }): TDomainPublicMethod {
    return this.builder
      .withIdentifier(new IdentifierBuilder().withName(methodName).build())
      .withParameters(new ParameterListBuilderDirector().buildParams([]))
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
          entityName,
        ),
      )
      .withStatements(
        new StatementListDirector().buildOneReturnStatementEntityEvaluationWithFields(
          entityName,
          entityFields,
        ),
      )
      .build();
  }

  buildMethodWithReturnEntityEvaluationAsIdentifier({
    methodName,
    entityName,
    entityFields,
    identifierName,
  }: {
    methodName: string;
    entityName: string;
    entityFields: TEvaluationFields;
    identifierName: string;
  }): TDomainPublicMethod {
    return this.builder
      .withIdentifier(new IdentifierBuilder().withName(methodName).build())
      .withParameters(new ParameterListBuilderDirector().buildParams([]))
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
          entityName,
        ),
      )
      .withStatements([
        new StatementDirector().buildConstDeclarationWithEntityEvaluation({
          name: identifierName,
          entityIdentifier: entityName,
          entityFields,
        }),
        new StatementDirector().buildReturnOKStatement(
          new ExpressionBuilderDirector().buildIdentifierExpression(identifierName),
        ),
      ])
      .build();
  }
}
