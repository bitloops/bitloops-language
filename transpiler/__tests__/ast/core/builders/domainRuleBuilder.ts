import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainRule,
  TParameterList,
  TStatements,
  TExpression,
  TCondition,
  TArgumentList,
} from '../../../../src/types.js';

export class DomainRuleBuilder implements IBuilder<TDomainRule> {
  private domainRuleIdentifier: string;
  private parametersList: TParameterList;
  private error: string;
  private statements: TStatements;
  private isBrokenIfCondition: TCondition;

  public withIdentifier(identifierName: string): DomainRuleBuilder {
    this.domainRuleIdentifier = identifierName;
    return this;
  }

  public withParameters(params: TParameterList): DomainRuleBuilder {
    this.parametersList = params;
    return this;
  }

  public withThrowsError(error: string): DomainRuleBuilder {
    this.error = error;
    return this;
  }

  public withBodyStatements(statements: TStatements): DomainRuleBuilder {
    this.statements = statements;
    return this;
  }

  public withIsBrokenIfCondition(
    condition: TExpression,
    errorArguments?: TArgumentList,
  ): DomainRuleBuilder {
    this.isBrokenIfCondition = { condition, ...errorArguments };
    return this;
  }

  public build(): TDomainRule {
    const domainRule = {
      DomainRule: {
        domainRuleIdentifier: this.domainRuleIdentifier,
        ...this.parametersList,
        error: this.error,
        statements: this.statements,
        isBrokenIfCondition: this.isBrokenIfCondition,
      },
    };

    return domainRule;
  }
}
