import {
  TAppliedRule,
  TApplyRules,
  TArgumentList,
  TBuiltInFunction,
  TBuiltInFunctionValues,
} from './../../../../../src/types.js';
import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { ArgumentListBuilderDirector } from '../argumentListBuilderDirector.js';

export class BuiltInFunctionStatementDirector {
  private builtInFunctionStatementBuilder: BuiltInFunctionStatementBuilder;
  constructor() {
    this.builtInFunctionStatementBuilder = new BuiltInFunctionStatementBuilder();
  }

  /**
   * applyRules ( IsValidTitleRule ('title'))
   */
  buildApplyRulesWithStringArguments(
    ...appliedRules: {
      name: string;
      args: string[];
    }[]
  ): TBuiltInFunction {
    const applyRules: TApplyRules = {
      applyRules: [],
    };

    for (const appliedRule of appliedRules) {
      const appliedRuleValue: TAppliedRule = {
        appliedRule: {
          domainRuleIdentifier: appliedRule.name,
          argumentList: new ArgumentListBuilderDirector().buildStringLiteralArguments(
            appliedRule.args,
          ),
        },
      };
      applyRules.applyRules.push(appliedRuleValue);
    }

    const builtInFunction = this.builtInFunctionStatementBuilder
      .withBuiltInFunctionValues(applyRules)
      .build();
    return builtInFunction;
  }

  /**
   * e.g. applyRules ( IsValidTitleRule (props.title))
   * (not this.)
   */
  buildApplyRulesWithMemberDotArgs(
    ...appliedRules: {
      name: string;
      args: string[][];
    }[]
  ): TBuiltInFunction {
    const applyRules: TApplyRules = {
      applyRules: [],
    };

    for (const appliedRule of appliedRules) {
      const appliedRuleValue: TAppliedRule = {
        appliedRule: {
          domainRuleIdentifier: appliedRule.name,
          argumentList: new ArgumentListBuilderDirector().buildMemberDotArguments(appliedRule.args),
        },
      };
      applyRules.applyRules.push(appliedRuleValue);
    }

    const builtInFunction = this.builtInFunctionStatementBuilder
      .withBuiltInFunctionValues(applyRules)
      .build();
    return builtInFunction;
  }

  /**
   * e.g. applyRules ( IsValidTitleRule (this.props.title, this.name))
   */
  buildApplyRulesWithThisMemberDotArgs(
    ...appliedRules: {
      name: string;
      args: string[][];
    }[]
  ): TBuiltInFunction {
    const applyRules = this.buildApplyRulesWithArgs(
      ...appliedRules.map((appliedRule) => ({
        domainRuleIdentifier: appliedRule.name,
        argumentList: new ArgumentListBuilderDirector().buildThisMemberDotArguments(
          appliedRule.args,
        ),
      })),
    );

    const builtInFunction = this.builtInFunctionStatementBuilder
      .withBuiltInFunctionValues(applyRules)
      .build();
    return builtInFunction;
  }

  private buildApplyRulesWithArgs(
    ...rulesInfo: { domainRuleIdentifier: string; argumentList: TArgumentList }[]
  ): TApplyRules {
    const applyRules: TApplyRules = {
      applyRules: [],
    };

    for (const appliedRule of rulesInfo) {
      const appliedRuleValue: TAppliedRule = {
        appliedRule,
      };
      applyRules.applyRules.push(appliedRuleValue);
    }

    return applyRules;
  }
}

export class BuiltInFunctionStatementBuilder implements IBuilder<TBuiltInFunction> {
  private builtinFunction: TBuiltInFunctionValues;

  withBuiltInFunctionValues(expression: TBuiltInFunctionValues): BuiltInFunctionStatementBuilder {
    this.builtinFunction = expression;
    return this;
  }

  build(): TBuiltInFunction {
    const builtInFunction: TBuiltInFunction = {
      builtInFunction: this.builtinFunction,
    };
    return builtInFunction;
  }
}
