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
import { TDomainEvaluation, TTargetDependenciesTypeScript } from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { DomainEvaluationPropsTypeIdentifiers } from '../../../../type-identifiers/domainEvaluationProps.js';

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

  const domainName = getDomainName(evaluation);
  const dependencies = [...resultDomainProps.dependencies, ...getChildDependencies(domainName)];

  return {
    output: `${domainName}.create(${resultDomainProps.output});`,
    dependencies,
  };
};

const getDomainName = (evaluation: TDomainEvaluation): string => {
  const domainEvaluation = evaluation.domainEvaluation;
  let domainName;
  if ('entityIdentifier' in domainEvaluation) domainName = domainEvaluation.entityIdentifier;
  if ('valueObjectIdentifier' in domainEvaluation)
    domainName = domainEvaluation.valueObjectIdentifier;
  return domainName;
};
