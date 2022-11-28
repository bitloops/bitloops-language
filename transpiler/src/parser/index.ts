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
import { BitloopsParser } from './core/index.js';
import {
  IBitloopsParser,
  BitloopsLanguageAST,
  BitloopsLanguageASTContext,
  BitloopsParserError,
} from './core/types.js';
import { BitloopsSetupParser } from './setup/index.js';
import {
  BitloopsLanguageSetupAST,
  BitloopsSetupParserError,
  IBitloopsSetupParser,
} from './setup/types.js';

export {
  BitloopsParser,
  BitloopsSetupParser,
  IBitloopsParser,
  IBitloopsSetupParser,
  BitloopsLanguageAST,
  BitloopsLanguageASTContext,
  BitloopsLanguageSetupAST,
  BitloopsParserError,
  BitloopsSetupParserError,
};
