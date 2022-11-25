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
import { TString, TBackTickString, TTargetDependenciesTypeScript } from '../../../../../types.js';

const stringToTargetLanguage = (variable: TString): TTargetDependenciesTypeScript => {
  const { string } = variable;
  return { output: `'${string}'`, dependencies: [] };
};

const backTickStringToTargetLanguage = (
  variable: TBackTickString,
): TTargetDependenciesTypeScript => {
  const { backTickString } = variable;
  return { output: `\`${backTickString}\``, dependencies: [] };
};

export { stringToTargetLanguage, backTickStringToTargetLanguage };
