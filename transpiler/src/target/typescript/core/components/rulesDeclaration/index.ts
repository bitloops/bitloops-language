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
  TRule,
  TRules,
  TParameterDependencies,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

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
  `export class ${ruleName} implements IRule { `;

const finalRuleLangMapping: any = '}';

const getErrorStringMapping: any = (
  errorString: string,
  paramDependencies: TParameterDependencies,
) => {
  // TODO handle the param dependencies of error differently
  let errorStringRes = `public Error = new ${errorString}`;
  errorStringRes += '(';
  if (paramDependencies && paramDependencies.length > 0) {
    paramDependencies.forEach((paramDependency) => {
      errorStringRes += `this.${paramDependency.value}`;
    });
  }
  errorStringRes += ')';
  return errorStringRes;
};

const getRuleConstructor: any = (parametersString: string) => {
  return `constructor${parametersString} {}`;
};

const getIsBrokenIfMethod: any = (
  statementsStringWithThis: string,
  isBrokenConditionStringWithThis: string,
) => {
  return `public isBrokenIf(): boolean { ${statementsStringWithThis} return ${isBrokenConditionStringWithThis}; }`;
};

export const rulesDeclarationToTargetLanguage = (rules: TRules): TTargetDependenciesTypeScript => {
  let result = '';
  const dependencies = [];
  for (const [ruleName, ruleValues] of Object.entries(rules)) {
    result += initialRuleLangMapping(ruleName);
    const model = modelToTargetLanguage({
      type: BitloopsTypesMapping.TRuleValues,
      value: ruleValues,
    });
    result += model.output;
    dependencies.push(...model.dependencies);
    result += finalRuleLangMapping;
  }

  return { output: result, dependencies: [] };
};

export const ruleDeclarationToTargetLanguage = (rule: TRule): TTargetDependenciesTypeScript => {
  let parameters;
  if (rule.parameters && rule.parameters.length !== 0) {
    parameters = modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterDependencies,
      value: rule.parameters,
    });
  } else parameters = '()';

  const ruleConstructor = getRuleConstructor(parameters);
  const { error } = rule;

  // TODO which params will be inside it?
  const errorString = getErrorStringMapping(error, rule.parameters);

  let statements: TTargetDependenciesTypeScript | null = null;
  if (rule.statements && rule.statements.length !== 0) {
    statements = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: rule.statements,
    });
  }

  const { isBrokenIfCondition } = rule;

  const isBrokenConditionString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TCondition,
    value: isBrokenIfCondition,
  });

  // TODO improve this solution - it will have problems with string manipulation
  // add this to isBrokenConditionString and to statementsStringWithThis and constructorParamsWithPrivate
  let isBrokenConditionStringWithThis = isBrokenConditionString;
  let statementsStringWithThis = statements;
  let constructorParamsWithPrivate = ruleConstructor;
  if (rule.parameters && rule.parameters.length !== 0) {
    rule.parameters.forEach((ruleParam) => {
      isBrokenConditionStringWithThis = getStringWithThisBeforeWord(
        ruleParam.value,
        isBrokenConditionStringWithThis.output,
      );
      statementsStringWithThis = getStringWithThisBeforeWord(
        ruleParam.value,
        statementsStringWithThis.output,
      );
      constructorParamsWithPrivate = getStringWithPrivateBeforeWord(
        ruleParam.value,
        constructorParamsWithPrivate,
      );
    });
  }

  const isBrokeIfMethod = getIsBrokenIfMethod(
    statementsStringWithThis,
    isBrokenConditionStringWithThis,
  );
  const res = `${constructorParamsWithPrivate}
  ${errorString}
  ${isBrokeIfMethod}`;

  return { output: res, dependencies: [] };
};
