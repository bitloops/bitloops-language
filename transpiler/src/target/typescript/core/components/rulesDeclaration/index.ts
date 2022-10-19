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
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TRule, TRules, TParameterDependencies } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const getStringWithThisBeforeWord = (word: string, stringToBeReplaced: string): string => {
  return stringToBeReplaced.replaceAll(word, `this.${word}`);
};
const getStringWithPrivateBeforeWord = (word: string, stringToBeReplaced: string): string => {
  return stringToBeReplaced.replaceAll(word, `private ${word}`);
};

const initialRuleLangMapping: any = {
  [SupportedLanguages.TypeScript]: (ruleName: string) =>
    `export class ${ruleName} implements IRule { `,
};

const finalRuleLangMapping: any = {
  [SupportedLanguages.TypeScript]: '}',
};

const getErrorStringMapping: any = {
  [SupportedLanguages.TypeScript]: (
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
  },
};

const getRuleConstructor: any = {
  [SupportedLanguages.TypeScript]: (parametersString: string) => {
    return `constructor${parametersString} {}`;
  },
};

const getIsBrokenIfMethod: any = {
  [SupportedLanguages.TypeScript]: (
    statementsStringWithThis: string,
    isBrokenConditionStringWithThis: string,
  ) => {
    return `public isBrokenIf(): boolean { ${statementsStringWithThis} return ${isBrokenConditionStringWithThis}; }`;
  },
};

export const rulesDeclarationToTargetLanguage = (rules: TRules, targetLanguage: string): string => {
  let result = '';
  for (const [ruleName, ruleValues] of Object.entries(rules)) {
    result += initialRuleLangMapping[targetLanguage](ruleName);
    result += modelToTargetLanguage({
      type: BitloopsTypesMapping.TRuleValues,
      value: ruleValues,
      targetLanguage,
    });
    result += finalRuleLangMapping[targetLanguage];
  }

  return result;
};

export const ruleDeclarationToTargetLanguage = (rule: TRule, targetLanguage: string): string => {
  let parameters;
  if (rule.parameters && rule.parameters.length !== 0) {
    parameters = modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterDependencies,
      value: rule.parameters,
    });
  } else parameters = '()';

  const ruleConstructor = getRuleConstructor[targetLanguage](parameters);
  const { error } = rule;

  // TODO which params will be inside it?
  const errorString = getErrorStringMapping[targetLanguage](error, rule.parameters);

  let statements;
  if (rule.statements && rule.statements.length !== 0) {
    statements = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: rule.statements,
    });
  } else statements = '';

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
        isBrokenConditionStringWithThis,
      );
      statementsStringWithThis = getStringWithThisBeforeWord(
        ruleParam.value,
        statementsStringWithThis,
      );
      constructorParamsWithPrivate = getStringWithPrivateBeforeWord(
        ruleParam.value,
        constructorParamsWithPrivate,
      );
    });
  }

  const isBrokeIfMethod = getIsBrokenIfMethod[targetLanguage](
    statementsStringWithThis,
    isBrokenConditionStringWithThis,
  );
  const res = `${constructorParamsWithPrivate}
  ${errorString}
  ${isBrokeIfMethod}`;

  return res;
};
