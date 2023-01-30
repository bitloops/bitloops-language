/**
 *  Bitloops Language CLI
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

import { SupportedLanguages } from '../target/supportedLanguages.js';

const languageExtensions: Record<string, string> = {
  TypeScript: '.ts',
  // Java: '.java',
};

const languageSuffixExtensions: Record<string, string> = {
  TypeScript: 'ts',
  // Java: 'java',
};

const isLanguageSupported = (language: string): boolean => {
  if (SupportedLanguages[language]) return true;
  return false;
};

const getLanguageFileExtension = (language: string): string => {
  return languageExtensions[language];
};

const getLanguageFileSuffixExtension = (language: string): string => {
  return languageSuffixExtensions[language];
};

export { getLanguageFileExtension, isLanguageSupported, getLanguageFileSuffixExtension };
