import { TDomainCreateMethod } from '../../../../src/types.js';
import { DomainCreateBuilder } from './DomainCreateBuilder.js';
import { ParameterBuilderDirector } from './ParameterBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from './returnOkErrorTypeBuilderDirector.js';
import { StatementListDirector } from './statement/statementListDirector.js';

export class DomainCreateBuilderDirector {
  private builder: DomainCreateBuilder;
  constructor() {
    this.builder = new DomainCreateBuilder();
  }

  buildCreateEntityWithError({
    entityName,
    entityPropsIdentifier,
    errorName,
    entityPropsName,
  }: {
    entityName: string;
    entityPropsIdentifier: string;
    errorName: string;
    entityPropsName: string;
  }): TDomainCreateMethod {
    return this.builder
      .withStatements(
        new StatementListDirector().buildOneReturnStatementEntityEvaluation(
          entityName,
          entityPropsIdentifier,
        ),
      )
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
          entityName,
          errorName,
        ),
      )
      .withParameter(
        new ParameterBuilderDirector().buildIdentifierParameter(
          entityPropsIdentifier,
          entityPropsName,
        ),
      )
      .build();
  }
}
