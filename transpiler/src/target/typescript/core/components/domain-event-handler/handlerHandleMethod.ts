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
import { THandle, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const generateEventHandlerHandleMethod = (
  handle: THandle,
): TTargetDependenciesTypeScript => {
  const { statements, parameter } = handle;
  const parameterTarget = modelToTargetLanguage({
    value: { parameter },
    type: BitloopsTypesMapping.TParameter,
  });

  const statementsTarget = modelToTargetLanguage({
    value: statements,
    type: BitloopsTypesMapping.TStatements,
  });

  const dependencies = [...parameterTarget.dependencies, ...statementsTarget.dependencies];

  const result = `
  public async handle(${parameterTarget.output}): Promise<void> {
    ${statementsTarget.output}
  }
  `;
  return { output: result, dependencies };
};