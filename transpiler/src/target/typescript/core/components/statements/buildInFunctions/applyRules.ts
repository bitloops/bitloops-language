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
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TApplyRules, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { getChildDependencies, getValueAndFileNameOfImport } from '../../../dependencies.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const applyRulesToTargetLanguage = (variable: TApplyRules): TTargetDependenciesTypeScript => {
  const { applyRules } = variable;

  let result = 'const res = applyRules([';
  let dependencies = [];
  const domainRules = [];
  for (const applyRule of applyRules) {
    const argumentDependencies = modelToTargetLanguage({
      type: BitloopsTypesMapping.TArgumentDependencies,
      value: applyRule.arguments,
    });
    result += `new ${applyRule.name}${argumentDependencies.output},`;
    domainRules.push(applyRule.name);
    dependencies = [...dependencies, ...argumentDependencies.dependencies];
  }
  result += ']);';
  result += 'if (res) return fail(res);';

  const domainRulesDependencies = getChildDependencies(domainRules);
  dependencies = [...dependencies, ...domainRulesDependencies];
  return { output: result, dependencies };
};

export { applyRulesToTargetLanguage };
