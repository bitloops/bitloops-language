import { TDomainCreateMethod, TStatements } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from './bitloopsPrimaryTypeDirector.js';
import { DomainCreateBuilder } from './DomainCreateBuilder.js';
import { ReturnOkErrorTypeBuilderDirector } from './returnOkErrorTypeBuilderDirector.js';
import { StatementDirector } from './statement/statementDirector.js';
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
        new StatementListDirector().buildOneReturnStatementEntityConstructorEvaluation(
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
        entityPropsIdentifier,
        new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(entityPropsName),
      )
      .build();
  }

  buildCreateEntityWithStatements({
    entityName,
    entityPropsIdentifier,
    errorName,
    entityPropsName,
    statements,
  }: {
    entityName: string;
    entityPropsIdentifier: string;
    errorName: string;
    entityPropsName: string;
    statements: TStatements;
  }): TDomainCreateMethod {
    return this.builder
      .withStatements(statements)
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
          entityName,
          errorName,
        ),
      )
      .withParameter(
        entityPropsIdentifier,
        new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(entityPropsName),
      )
      .build();
  }

  buildEmptyCreateValueObjectWithError({
    voName,
    voPropsIdentifier,
    errorName,
    voPropsName,
  }: {
    voName: string;
    voPropsIdentifier: string;
    errorName: string;
    voPropsName: string;
  }): TDomainCreateMethod {
    return this.builder
      .withStatements([])
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
          voName,
          errorName,
        ),
      )
      .withParameter(
        voPropsIdentifier,
        new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(voPropsName),
      )
      .build();
  }

  buildCreateValueObjectWithApplyRules({
    voName,
    voPropsIdentifier,
    errorName,
    voPropsName,
    appliedRules,
  }: {
    voName: string;
    voPropsIdentifier: string;
    errorName: string;
    voPropsName: string;
    appliedRules: {
      name: string;
      args: string[][];
    }[];
  }): TDomainCreateMethod {
    return this.builder
      .withStatements([
        new StatementDirector().buildBuiltInFunctionApplyRulesStatement(...appliedRules),
      ])
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
          voName,
          errorName,
        ),
      )
      .withParameter(
        voPropsIdentifier,
        new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(voPropsName),
      )
      .build();
  }
}
