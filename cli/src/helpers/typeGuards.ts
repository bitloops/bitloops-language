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

import {
  BitloopsIntermediateASTParserError,
  BitloopsParserError,
} from '../functions/core/index.js';
import { BitloopsTargetGeneratorError } from '../functions/target/index.js';
import { TBitloopsTargetContent, TBoundedContexts } from '../types.js';

const isUndefined = (variable) => {
  if (typeof variable === 'undefined') return true;
  else return false;
};

// const intermediateModelOrError:
const isBitloopsParserError = (
  modelOrError: TBoundedContexts | BitloopsIntermediateASTParserError,
): modelOrError is BitloopsIntermediateASTParserError => {
  if (modelOrError instanceof BitloopsParserError) return true;
  else return false;
};
// const output: TBitloopsTargetContent | BitloopsTargetGeneratorError
const isBitloopsTargetGeneratorError = (
  output: TBitloopsTargetContent | BitloopsTargetGeneratorError,
): output is BitloopsTargetGeneratorError => {
  if (output instanceof BitloopsTargetGeneratorError) return true;
  else return false;
};

const isArray = (list) => {
  if (Array.isArray(list)) return true;
  else return false;
};

export { isUndefined, isArray, isBitloopsParserError, isBitloopsTargetGeneratorError };
