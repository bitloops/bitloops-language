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
  TDomainEvaluation,
  TValueObjectConstructorEvaluation,
  TTargetDependenciesTypeScript,
} from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { DomainEvaluationPropsTypeIdentifiers } from '../../../../type-identifiers/domainEvaluationProps.js';
import { getDomainName } from './entityConstructorEvaluation.js';

export const valueObjectConstructorEvaluationToTargetLanguage = (
  evaluation: TValueObjectConstructorEvaluation,
): TTargetDependenciesTypeScript => {
  const valueObjectEvaluation = evaluation.valueObjectConstructor;

  const result = domainEvaluationToTargetLanguage(valueObjectEvaluation);

  return result;
};

export const domainEvaluationToTargetLanguage = (
  evaluation: TDomainEvaluation,
): TTargetDependenciesTypeScript => {
  const domainProperties = evaluation.domainEvaluation.props;

  let resultDomainProps: TTargetDependenciesTypeScript;
  if (DomainEvaluationPropsTypeIdentifiers.isExpression(domainProperties)) {
    resultDomainProps = modelToTargetLanguage({
      type: BitloopsTypesMapping.TExpression,
      value: domainProperties,
    });
  } else {
    resultDomainProps = modelToTargetLanguage({
      type: BitloopsTypesMapping.TEvaluationFields,
      value: domainProperties.fields,
    });
  }

  const dependencies = [...resultDomainProps.dependencies];
  const domainName = getDomainName(evaluation);

  return {
    output: `new ${domainName}(${resultDomainProps.output})`,
    dependencies,
  };
};
