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
import { TString, TBackTickString } from '../../../../../types.js';

const stringToTargetLanguage = (variable: TString, targetLanguage: string): string => {
  const { string } = variable;

  const backTickStringLangMapping: any = {
    [SupportedLanguages.TypeScript]: (singleQuoteString: string) => `'${singleQuoteString}'`,
  };

  return backTickStringLangMapping[targetLanguage](string);
};

const backTickStringToTargetLanguage = (
  variable: TBackTickString,
  targetLanguage: string,
): string => {
  const { backTickString } = variable;

  const backTickStringLangMapping: any = {
    [SupportedLanguages.TypeScript]: (backTick: string) => `\`${backTick}\``,
  };

  return backTickStringLangMapping[targetLanguage](backTickString);
};

export { stringToTargetLanguage, backTickStringToTargetLanguage };
