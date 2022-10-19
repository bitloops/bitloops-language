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
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
} from '@bitloops/bl-transpiler';
import { isBitloopsParserError } from '../helpers/typeGuards.js';
import { BoundedContextModules, ISetupData, TBoundedContexts } from '../types.js';

import { getBitloopsFilesAndContents } from './readFilesContents.js';

const generateBitloopsModel = (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
  _setupModel: ISetupData,
): TBoundedContexts => {
  const parser = new BitloopsParser();
  // For each file in each module in each bounded context
  // Create the array
  const inputFileContents = getBitloopsFilesAndContents(boundedContextModules, sourceDirPath);
  const initialModelOutput = parser.parse(inputFileContents);
  const intermediateParser = new BitloopsIntermediateASTParser();
  if (!(initialModelOutput instanceof BitloopsParserError)) {
    const intermediateModelOrError = intermediateParser.parse(initialModelOutput);
    if (isBitloopsParserError(intermediateModelOrError)) {
      console.log(intermediateModelOrError);
      throw new Error('Error parsing setup file');
    }
    return intermediateModelOrError;
  }
  throw new Error('Error parsing setup file');
};

export { generateBitloopsModel };
