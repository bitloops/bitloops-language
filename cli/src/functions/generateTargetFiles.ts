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
import { getTargetFileDestination, TTranspileOutput } from '@bitloops/bl-transpiler';

import { writeTargetFile } from './writeTargetFile.js';

export const writeTranspiledCode = (result: TTranspileOutput, outputDirPath: string): void => {
  const { core, setup } = result;
  writeGeneratedOutputToFiles(core, outputDirPath);
  writeGeneratedSetupOutputToFiles(setup, outputDirPath);
};

const writeGeneratedOutputToFiles = (
  params: TTranspileOutput['core'],
  outputDirPath: string,
): void => {
  //  Write output to dest files
  for (const targetFileContent of params) {
    const { boundedContext, module, classType, className, fileContent } = targetFileContent;
    const destination = getTargetFileDestination(boundedContext, module, classType, className);
    writeTargetFile({
      projectPath: outputDirPath,
      filePathObj: destination,
      fileContent: fileContent,
    });
  }
};

const writeGeneratedSetupOutputToFiles = (
  params: TTranspileOutput['setup'],
  outputDirPath: string,
): void => {
  //  Write output to dest files
  for (const targetFileContent of params) {
    const { fileId, fileContent } = targetFileContent;
    writeTargetFile({
      projectPath: outputDirPath,
      filePathObj: { path: '/', filename: fileId },
      fileContent: fileContent,
    });
  }
};
