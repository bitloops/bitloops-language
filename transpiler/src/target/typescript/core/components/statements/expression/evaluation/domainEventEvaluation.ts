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
  DomainEventIdentifierKey,
  TDomainEventEvaluation,
  TTargetDependenciesTypeScript,
} from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { getChildDependencies } from '../../../../dependencies.js';

export const domainEventEvaluationToTargetLanguage = (
  variable: TDomainEventEvaluation,
): TTargetDependenciesTypeScript => {
  const identifier = variable.domainEvent[DomainEventIdentifierKey];
  const { fields } = variable.domainEvent;

  const identifierDependency = getChildDependencies(identifier);
  const dependencies = identifierDependency;
  let output = '';
  if (fields !== undefined) {
    const fieldsTarget = modelToTargetLanguage({
      type: BitloopsTypesMapping.TEvaluationFields,
      value: fields,
    });
    dependencies.push(...fieldsTarget.dependencies);
    output = `new ${identifier}(${fieldsTarget.output})`;
  } else {
    output = `new ${identifier}()`;
  }

  return {
    output,
    dependencies,
  };
};
