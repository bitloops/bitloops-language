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
import { BitloopsTargetGenerator } from '@bitloops/bl-transpiler';

import {
  BoundedContextModules,
  ISetupData,
  TBitloopsOutputTargetContent,
  TBitloopsTargetSetupContent,
  TBoundedContexts,
} from '../types.js';
import { writeTargetFile } from './writeTargetFile.js';

const writeGeneratedOutputToFiles = (
  params: TBitloopsOutputTargetContent,
  outputDirPath: string,
): void => {
  //  Write output to dest files
  for (const targetFileContent of params) {
    const { boundedContext, module, classType, className, fileContent } = targetFileContent;
    const btg = new BitloopsTargetGenerator();
    const destination = btg.getTargetFileDestination(boundedContext, module, classType, className);
    writeTargetFile({
      projectPath: outputDirPath,
      filePathObj: destination,
      fileContent: fileContent,
    });
  }
};

const generateTargetFiles = (params: {
  boundedContextModules: BoundedContextModules;
  sourceDirPath: string;
  outputDirPath: string;
  bitloopsModel: TBoundedContexts;
  setupData: ISetupData;

  targetLanguage: string;
}): void => {
  const { outputDirPath, bitloopsModel, setupData, targetLanguage } = params;
  const generator = new BitloopsTargetGenerator();
  const generatorParams = {
    intermediateAST: bitloopsModel as any, // TODO fix this
    setupData,
    targetLanguage,
    prettierConfig: {},
  };
  const output: TBitloopsOutputTargetContent = generator.generate(generatorParams);
  // if (isBitloopsTargetGeneratorError(output)) {
  //   console.log(output);
  //   throw new Error('Error generating target files');
  // }
  // output
  //Write output to dest files
  writeGeneratedOutputToFiles(output, outputDirPath);
  const setupFilesData = generator.generateSetup({
    setupData,
    intermediateAST: bitloopsModel as any, // TODO fix this (type clashes even if same type from package and local file)
    targetLanguage,
  });
  writeGeneratedSetupOutputToFiles(setupFilesData as TBitloopsTargetSetupContent, outputDirPath);
};

const writeGeneratedSetupOutputToFiles = (
  params: TBitloopsTargetSetupContent,
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

export { generateTargetFiles };
