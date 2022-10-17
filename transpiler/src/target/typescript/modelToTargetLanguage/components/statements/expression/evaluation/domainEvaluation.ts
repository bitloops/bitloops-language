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
import { TDomainEvaluation } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../commons/index.js';
import { modelToTargetLanguage } from '../../../index.js';

export const domainEvaluationToTargetLanguage = (
  evaluation: TDomainEvaluation,
  targetLanguage: string,
): string => {
  const domainProperties = evaluation.props;
  const domainName = evaluation.name;

  let resultDomainProps;
  if ('regularEvaluation' in domainProperties) {
    resultDomainProps = modelToTargetLanguage({
      type: BitloopsTypesMapping.TRegularEvaluation,
      value: domainProperties,
      targetLanguage,
    });
  } else {
    resultDomainProps = modelToTargetLanguage({
      type: BitloopsTypesMapping.TEvaluationFields,
      value: domainProperties,
      targetLanguage,
    });
  }

  const instantiateDomainLangMapping = {
    [SupportedLanguages.TypeScript]: (name, props) => {
      return `new ${name}(${props})`;
    },
  };

  return instantiateDomainLangMapping[targetLanguage](domainName, resultDomainProps);
};
