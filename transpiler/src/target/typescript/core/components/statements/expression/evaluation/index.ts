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
import { TEvaluation, TTargetDependenciesTypeScript } from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { EvaluationTypeIdentifiers } from '../../../../type-identifiers/evaluation.js';

const DTO_STRING = 'dto';

const evaluationToTargetLanguage = (variable: TEvaluation): TTargetDependenciesTypeScript => {
  EvaluationTypeIdentifiers;
  const { evaluation } = variable;
  // TODO check if this needs to be removed
  if ('regularEvaluation' in evaluation) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TRegularEvaluation,
      value: evaluation,
    });
  } else if ('getClass' in evaluation) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TGetClass,
      value: evaluation,
    });
  } else if ('valueObject' in evaluation) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TValueObjectEvaluation,
      value: evaluation,
    });
  } else if ('entity' in evaluation) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEntityEvaluation,
      value: evaluation,
    });
  }
  if (EvaluationTypeIdentifiers.isStructEvaluation(evaluation)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TStructEvaluation,
      value: evaluation,
    });
  } else if (DTO_STRING in evaluation) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TDTOEvaluation,
      value: evaluation,
    });
  } else if ('builtInClass' in evaluation) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TBuiltInClassEvaluation,
      value: evaluation,
    });
  }
  if (EvaluationTypeIdentifiers.isCorsOptionsEvaluation(evaluation)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TCorsOptionsEvaluation,
      value: evaluation,
    });
  }
  if (EvaluationTypeIdentifiers.isIntegrationEventEvaluation(evaluation)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TIntegrationEventEvaluation,
      value: evaluation,
    });
  }
  if (EvaluationTypeIdentifiers.isErrorEvaluation(evaluation)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TErrorEvaluation,
      value: evaluation,
    });
  }
  if (EvaluationTypeIdentifiers.isEntityConstructorEvaluation(evaluation)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TEntityConstructorEvaluation,
      value: evaluation,
    });
  } else {
    throw new Error(`Unsupported evaluation: ${JSON.stringify(variable)}`);
  }
};

export { evaluationToTargetLanguage };
