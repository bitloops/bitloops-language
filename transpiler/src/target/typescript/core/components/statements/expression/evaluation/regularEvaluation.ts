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

import { isBitloopsPrimitive } from '../../../../../../../helpers/isBitloopsPrimitive.js';
import {
  TRegularEvaluation,
  TEvaluatePrimitive,
  TTargetDependenciesTypeScript,
} from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { getChildDependencies } from './../../../../dependencies.js';

const regularEvaluationToTargetLanguage = (
  variable: TRegularEvaluation,
): TTargetDependenciesTypeScript => {
  const regularEvaluationLangMapping = (
    variable: TRegularEvaluation,
  ): TTargetDependenciesTypeScript => {
    const { type, value, argumentDependencies } = variable.regularEvaluation;

    if (isBitloopsPrimitive(type)) {
      const primitiveObj: TEvaluatePrimitive = {
        type,
        value,
      };
      return modelToTargetLanguage({
        type: 'TEvaluatePrimitive',
        value: primitiveObj,
      });
    }

    switch (type) {
      case 'variable':
        return { output: value, dependencies: [] };
      case 'method': {
        const argumentDependenciesResult = modelToTargetLanguage({
          type: BitloopsTypesMapping.TArgumentDependencies,
          value: argumentDependencies,
        });
        return {
          output: `${value}${argumentDependenciesResult.output}`,
          dependencies: argumentDependenciesResult.dependencies,
        };
      }
      default: {
        // User-Defined Class
        let dependencies = [];
        if (type) {
          dependencies = getChildDependencies(type);
        }
        return { output: value, dependencies };
      }
    }
  };

  return regularEvaluationLangMapping(variable);
};

export { regularEvaluationToTargetLanguage };
