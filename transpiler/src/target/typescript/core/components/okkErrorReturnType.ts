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
import { bitloopsTypeToLangMapping } from '../../../../helpers/bitloopsPrimitiveToLang.js';
import { isBitloopsPrimitive } from '../../../../helpers/isBitloopsPrimitive.js';
import { SupportedLanguages } from '../../../../helpers/supportedLanguages.js';
import { TOkErrorReturnType, TTargetDependenciesTypeScript } from '../../../../types.js';

const okErrorReturnTypeToTargetLanguage = (
  variable: TOkErrorReturnType,
): TTargetDependenciesTypeScript => {
  if (!variable.ok) {
    throw new Error('Return okError type must have ok property');
  }
  const { errors, ok } = variable;

  let returnOkType = ok;
  if (isBitloopsPrimitive(returnOkType)) {
    returnOkType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](returnOkType);
  }

  const xor = (ok: string, errors: string[]): string => {
    if (errors && errors.length != 0) {
      return `Either<${ok}, ${errors.join(' | ')}>`;
    } else {
      return `Either<${ok}, never>`;
    }
  };
  return { output: xor(returnOkType, errors), dependencies: [] };
};

export { okErrorReturnTypeToTargetLanguage };
