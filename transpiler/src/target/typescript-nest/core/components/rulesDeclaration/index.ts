/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import {
  TDomainRule,
  TTargetDependenciesTypeScript,
  TDependencyChildTypescript,
  // TParameter,
  TArgumentList,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';

const RULE_DEPENDENCIES: TDependencyChildTypescript[] = [
  {
    type: 'absolute',
    default: false,
    value: 'Domain',
    from: '@bitloops/bl-boilerplate-core',
  },
];

const getStringWithPrivateBeforeWord = (word: string, stringToBeReplaced: string): string => {
  return stringToBeReplaced.replaceAll(word, `private ${word}`);
};

const getErrorDeclaration = (errorString: string): string => {
  return `public Error: ${errorString}`;
};

const getRuleConstructor = (parametersString: string): string => {
  return `constructor${parametersString} {}`;
};

/**
 * Loop through the error arguments, if an argument is an identifierExpression and matches one of
 * the rule parameters, then replace it with this.parameterName
 *
 *  @example if - new ExpressionBuilderDirector().buildIdentifierExpression('param1'),
 * then - this.param1
 *
 * TODO As an enhancement and more robust solution, this should be done in model-to-model for ts
 * by replacing any identifier that equals a parameter, with a this.parameterName member dot Expression
 */
const getIsBrokenIfMethod = (
  statementsStringWithThis: string | null,
  isBrokenConditionStringWithThis: string,
  errorIdentifier: string,
  argumentList: TArgumentList,
): TTargetDependenciesTypeScript => {
  let argumentsResult = '(';
  const dependencies = [];

  for (const argument of argumentList.argumentList) {
    const argumentResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TArgument,
      value: argument,
    });
    dependencies.push(...argumentResult.dependencies);
    argumentsResult += argumentResult.output;
    argumentsResult += ',';
  }
  argumentsResult += ')';

  const output = `public isBrokenIf(): boolean { ${statementsStringWithThis ?? ''} 

  this.Error = new ${errorIdentifier}${argumentsResult};
  return ${isBrokenConditionStringWithThis}; }`;
  return { output, dependencies };
};

export const rulesDeclarationToTargetLanguage = (
  rule: TDomainRule,
): TTargetDependenciesTypeScript => {
  let result = '';
  const childDependencies: TDependencyChildTypescript[] = RULE_DEPENDENCIES;
  const ruleName = rule.DomainRule.domainRuleIdentifier;

  result += `export class ${ruleName} implements Domain.IRule { `;

  const model = ruleDeclarationToTargetLanguage(rule);
  result += model.output;

  childDependencies.push(...model.dependencies);

  result += '}';

  const parentDependencies = getParentDependencies(childDependencies, {
    classType: ClassTypes.DomainRule,
    className: ruleName,
  });

  return { output: result, dependencies: parentDependencies };
};

export const ruleDeclarationToTargetLanguage = (
  ruleValues: TDomainRule,
): TTargetDependenciesTypeScript => {
  const dependencies = [];
  const { DomainRule: rule } = ruleValues;
  let parameters: TTargetDependenciesTypeScript;
  if (rule.parameters && rule.parameters.length !== 0) {
    parameters = modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterList,
      value: { parameters: rule.parameters },
    });
    dependencies.push(...parameters.dependencies);
  } else {
    parameters = {
      output: '()',
      dependencies: [],
    };
  }

  const ruleConstructor = getRuleConstructor(parameters.output);
  const { error } = rule;

  dependencies.push(...getChildDependencies(error));
  const errorDeclaration = getErrorDeclaration(error);

  let statements: TTargetDependenciesTypeScript | null = null;
  if (rule.statements && rule.statements.length !== 0) {
    statements = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: rule.statements,
    });
    dependencies.push(...statements.dependencies);
  }

  const { isBrokenIfCondition } = rule;

  const { condition, argumentList } = isBrokenIfCondition;
  const isBrokenConditionString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TCondition,
    value: { condition },
  });
  dependencies.push(...isBrokenConditionString.dependencies);

  if (argumentList && argumentList.length !== 0) {
    // TODO handle the argument list of error differently
  }

  // TODO improve this solution - it will have problems with string manipulation
  // add this to isBrokenConditionString and to statementsStringWithThis and constructorParamsWithPrivate
  let constructorParamsWithPrivate = ruleConstructor;
  if (rule.parameters && rule.parameters.length !== 0) {
    rule.parameters.forEach((ruleParam) => {
      constructorParamsWithPrivate = getStringWithPrivateBeforeWord(
        ruleParam.parameter.value,
        constructorParamsWithPrivate,
      );
    });
  }

  const errorArgumentList = argumentList ? { argumentList } : { argumentList: [] };

  const isBrokeIfMethod = getIsBrokenIfMethod(
    statements?.output ?? null,
    isBrokenConditionString.output,
    error,
    errorArgumentList,
  );
  const isBrokeIfMethodOutput = isBrokeIfMethod.output;
  dependencies.push(...isBrokeIfMethod.dependencies);
  const res = `${constructorParamsWithPrivate}

  ${errorDeclaration}

  ${isBrokeIfMethodOutput}`;

  return { output: res, dependencies };
};
