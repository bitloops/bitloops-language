import { TDomainPublicMethod, TEvaluationFields } from '../../../../../src/types.js';
import { IdentifierBuilder } from '../identifier.js';
import { ReturnOkErrorTypeBuilderDirector } from '../returnOkErrorTypeBuilderDirector.js';
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
      .withParameters([])
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
}
