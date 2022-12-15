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
  TParameterList,
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

const getStringWithThisBeforeWord = (
  word: string,
  stringToBeReplaced: string,
): TTargetDependenciesTypeScript => {
  return { output: stringToBeReplaced.replaceAll(word, `this.${word}`), dependencies: [] };
};
const getStringWithPrivateBeforeWord = (word: string, stringToBeReplaced: string): string => {
  return stringToBeReplaced.replaceAll(word, `private ${word}`);
};

const initialRuleLangMapping: any = (ruleName: string) =>
  `export class ${ruleName} implements Domain.IRule { `;

const finalRuleLangMapping: any = '}';

const getErrorStringMapping: any = (errorString: string, paramDependencies: TParameterList) => {
  // TODO handle the param dependencies of error differently
  let errorStringRes = `public Error = new ${errorString}`;
  errorStringRes += '(';
  if (paramDependencies && paramDependencies.parameters.length > 0) {
    paramDependencies.parameters.forEach((paramDependency) => {
      errorStringRes += `this.${paramDependency.parameter.value}`;
    });
  }
  errorStringRes += ')';
  return errorStringRes;
};

const getRuleConstructor = (parametersString: string): string => {
  return `constructor${parametersString} {}`;
};

const getIsBrokenIfMethod = (
  statementsStringWithThis: string | null,
  isBrokenConditionStringWithThis: string,
): string => {
  return `public isBrokenIf(): boolean { ${
    statementsStringWithThis ?? ''
  } return ${isBrokenConditionStringWithThis}; }`;
};

export const rulesDeclarationToTargetLanguage = (
  rule: TDomainRule,
): TTargetDependenciesTypeScript => {
  let result = '';
  const dependencies = [];
  const childDependencies: TDependencyChildTypescript[] = RULE_DEPENDENCIES;
  const ruleName = rule.DomainRule.domainRuleIdentifier;

  result += initialRuleLangMapping(ruleName);
  // const model = modelToTargetLanguage({
  //   type: BitloopsTypesMapping.TRuleValues,
  //   value: ruleValues,
  // });
  const model = ruleDeclarationToTargetLanguage(rule);
  result += model.output;

  childDependencies.push(...model.dependencies);
  const parentDependencies = getParentDependencies(childDependencies, {
    classType: ClassTypes.DomainRule,
    className: ruleName,
  });
  dependencies.push(...parentDependencies);

  result += finalRuleLangMapping;

  return { output: result, dependencies };
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
      value: rule.parameters,
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
  // TODO which params will be inside it?
  const errorString = getErrorStringMapping(error, rule.parameters);

  let statements: TTargetDependenciesTypeScript | null = null;
  if (rule.statements && rule.statements.length !== 0) {
    statements = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: rule.statements,
    });
    dependencies.push(...statements.dependencies);
  }

  const { isBrokenIfCondition } = rule;

  const isBrokenConditionString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TCondition,
    value: isBrokenIfCondition,
  });
  dependencies.push(...isBrokenConditionString.dependencies);

  // TODO improve this solution - it will have problems with string manipulation
  // add this to isBrokenConditionString and to statementsStringWithThis and constructorParamsWithPrivate
  let isBrokenConditionStringWithThis = isBrokenConditionString;
  let statementsStringWithThis: TTargetDependenciesTypeScript | null = statements;
  let constructorParamsWithPrivate = ruleConstructor;
  if (rule.parameters && rule.parameters.length !== 0) {
    rule.parameters.forEach((ruleParam) => {
      isBrokenConditionStringWithThis = getStringWithThisBeforeWord(
        ruleParam.parameter.value,
        isBrokenConditionStringWithThis.output,
      );
      if (statements) {
        statementsStringWithThis = getStringWithThisBeforeWord(
          ruleParam.parameter.value,
          statementsStringWithThis.output,
        );
      }
      constructorParamsWithPrivate = getStringWithPrivateBeforeWord(
        ruleParam.parameter.value,
        constructorParamsWithPrivate,
      );
    });
  }

  const isBrokeIfMethod = getIsBrokenIfMethod(
    statementsStringWithThis?.output ?? null,
    isBrokenConditionStringWithThis.output,
  );
  const res = `${constructorParamsWithPrivate}
  ${errorString}
  ${isBrokeIfMethod}`;

  return { output: res, dependencies };
};
