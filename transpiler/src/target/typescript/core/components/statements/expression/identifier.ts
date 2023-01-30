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
import { TIdentifierExpression, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { getChildDependencies } from '../../../dependencies.js';

const isErrorTypeEvaluationString = (value: string): boolean =>
  value.startsWith('DomainErrors.') || value.startsWith('ApplicationErrors.');

const identifierExpressionToTargetLanguage = (
  expressionValue: TIdentifierExpression,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const { identifier } = expressionValue;
  if (isErrorTypeEvaluationString(identifier)) {
    dependencies = getChildDependencies(identifier);
  }

  return {
    output: expressionValue.identifier,
    dependencies,
  };
};

export { identifierExpressionToTargetLanguage };
