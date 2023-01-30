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
  transpiler,
  Transpiler,
  TTranspileOutput,
  TTranspileOptions,
} from '@bitloops/bl-transpiler';
import { BoundedContextModules } from '../types.js';
import { readSetupData } from './generateSetupModel.js';

import { getBitloopsFilesAndContents } from './readFilesContents.js';

const DEFAULT_OPTIONS = {
  formatterConfig: null,
  targetLanguage: 'TypeScript',
};

const transpileCode = (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
  options: TTranspileOptions = DEFAULT_OPTIONS,
): TTranspileOutput => {
  const core = getBitloopsFilesAndContents(boundedContextModules, sourceDirPath);
  const setup = readSetupData(sourceDirPath);

  const input = {
    core,
    setup,
  };
  const result = transpiler.transpile(input, options);
  if (Transpiler.isTranspileError(result)) {
    throw result;
  }
  return result;
};

export { transpileCode };
