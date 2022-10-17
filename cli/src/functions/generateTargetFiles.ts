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
import { isBitloopsTargetGeneratorError } from '../helpers/typeGuards.js';
import {
  BoundedContextModules,
  ISetupData,
  TBitloopsTargetContent,
  TBoundedContexts,
} from '../types.js';
import { getTargetFileDestination } from './getTargetFileDestination.js';
import { BitloopsTargetGenerator } from './target/index.js';
import { writeTargetFile } from './writeTargetFile.js';

const writeGeneratedOutputToFiles = (
  params: TBitloopsTargetContent,
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
  // for (const [boundedContextName, boundedContextContent] of Object.entries(params)) {
  //   for (const [moduleName, moduleContent] of Object.entries(boundedContextContent)) {
  //     for (const [classType, classTypeContent] of Object.entries(moduleContent)) {
  //       for (const [className, classContent] of Object.entries(classTypeContent)) {
  //         const destination = getTargetFileDestination(
  //           boundedContextName,
  //           moduleName,
  //           classType,
  //           className,
  //         );
  //         writeTargetFile({
  //           projectPath: outputDirPath,
  //           filePathObj: destination,
  //           fileContent: classContent.content,
  //         });
  //       }
  //     }
  //   }
  // }
};

const generateTargetFiles = (params: {
  boundedContextModules: BoundedContextModules;
  sourceDirPath: string;
  outputDirPath: string;
  bitloopsModel: TBoundedContexts;
  setupData: ISetupData;

  targetLanguage: string;
}): void => {
  const {
    // boundedContextModules,
    // sourceDirPath,
    outputDirPath,
    bitloopsModel,
    setupData,
    targetLanguage,
  } = params;
  const generator = new BitloopsTargetGenerator();
  const generatorParams = {
    intermediateAST: bitloopsModel,
    setupData,
    targetLanguage,
    prettierConfig: {},
  };
  const output = generator.generate(generatorParams);
  if (isBitloopsTargetGeneratorError(output)) {
    console.log(output);
    throw new Error('Error generating target files');
  }
  // output
  //Write output to dest files
  writeGeneratedOutputToFiles(output, outputDirPath);
};

export { generateTargetFiles };
