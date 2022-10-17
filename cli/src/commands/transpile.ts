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

import inquirer, { QuestionCollection } from 'inquirer';
import targz from 'tar.gz';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

import {
  getBitloopsModulesPreModelData,
  getBoundedContextModules,
  TGetUseCasesResponse,
} from '../functions/bitloopsLanguageToModel/bitloopsFilesToString/index.js';
import { parseBitloops } from '../functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';
// import { parseBitloops as parseBitloopsSetup } from '../functions/bitloopsLanguageToModel/bitloops-parser/setup/BitloopsSetupParser.js';
import { modelToFinalLanguage } from '../functions/modelToTargetLanguage/model-to-final-language/index.js';
import { copyrightSnippet } from './copyright.js';
import { generateSetupFiles } from '../helpers/setupFiles.js';
import { createDirectory } from '../helpers/createDirectory.js';
import { ISetupData, TBoundedContexts, TRepoAdapters, TSetupRepoAdapters } from '../types.js';
import { readFromFile } from '../helpers/fileOperations.js';
import main from '../functions/bitloopsLanguageToModel/bitloops-parser/setup/BitloopsSetupVisitor/main.js';
// import { tmpdir } from 'os';

interface ICollection {
  targetLanguage: string;
  sourceDirPath: string;
  outputDirPath: string;
}
const VERSION = '0.0.13'; // TODO Get this dynamically

const questions: QuestionCollection<ICollection> = [
  {
    type: 'input',
    name: 'sourceDirPath',
    message: 'Where are your source files located?',
    default: '.',
  },
  {
    type: 'input',
    name: 'outputDirPath',
    message: 'Where would you like your generated files to be exported?',
    default: './output',
  },
];

const clearFolder = (outputDirPath: string): void => {
  fs.rmSync(path.normalize(`${outputDirPath}/src`), {
    recursive: true,
    force: true,
  });
};

const fetchSetupData = (sourceDirPath: string): ISetupData => {
  console.log('Fetching setup data...', sourceDirPath);
  // get controller data from model
  const content = readFromFile(`${sourceDirPath}/setup.bl`);
  const setupData = main(content);
  // console.log('Setup data fetched!', JSON.stringify(setupData));
  return setupData;
};

type BoundedContextModules = Record<string, string[]>[];

const generateTargetFiles = (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
  outputDirPath: string,
): void => {
  const setupData = fetchSetupData(sourceDirPath);
  const bitloopsModel: TBoundedContexts = {};
  console.log('Generating target files...');
  for (const boundedContextModule of boundedContextModules) {
    const boundedContextName = Object.keys(boundedContextModule)[0];
    const modules = boundedContextModule[boundedContextName];
    // console.log('modules', boundedContextModule, boundedContextName, modules);
    for (const moduleName of modules) {
      const modulePath = path.normalize(`${sourceDirPath}/${boundedContextName}/${moduleName}/`);
      const filesToString: {
        miscFilesString: string;
        useCases: TGetUseCasesResponse;
      } = getBitloopsModulesPreModelData(modulePath);
      const module = parseBitloops(
        boundedContextName,
        moduleName,
        filesToString.useCases,
        filesToString.miscFilesString,
      );

      const bcName = Object.keys(module)[0];
      const modName = Object.keys(module[boundedContextName])[0];
      bitloopsModel[bcName] = { [modName]: module[bcName][modName] };
      const context = { boundedContext: bcName, module: modName };
      modelToFinalLanguage(bitloopsModel, outputDirPath, context, setupData);
    }
  }
  generateSetupFiles(setupData, bitloopsModel, outputDirPath, sourceDirPath);
};

const transpile = async (source: ICollection): Promise<void> => {
  console.log();
  console.log(copyrightSnippet);
  console.log();
  const answers = await inquirer.prompt(questions, source);
  const { sourceDirPath, outputDirPath } = answers;
  const absoluteSourceDirPath = path.isAbsolute(sourceDirPath)
    ? sourceDirPath
    : path.normalize(`${process.cwd()}/${sourceDirPath}`);
  const absoluteOutputDirPath = path.isAbsolute(outputDirPath)
    ? outputDirPath
    : path.normalize(`${process.cwd()}/${outputDirPath}`);

  const boundedContextModules = getBoundedContextModules(absoluteSourceDirPath);

  if (Object.keys(boundedContextModules).length > 0) {
    // await downloadFile(VERSION, outputDirPath, 'TypeScript');
    clearFolder(outputDirPath);
    // await ungunzip(`${outputDirPath}/bitloopsTmp-v${VERSION}.tar.gz`, absoluteOutputDirPath);
    // await moveBoilerplate(absoluteOutputDirPath, VERSION);
    generateTargetFiles(
      boundedContextModules,
      absoluteSourceDirPath,
      absoluteOutputDirPath + '/bitloops',
    );
  }
};

// (*) Gather BoundedContexts and Modules
// ( ) Scan for servers (REST Fastify, REST Express, gRPC, GraphQL, etc.)
// (*) Copy boilerplate to output
// ( ) Delete unnecessary server files from infra
// (*) Add routes for BoundedContexts
// (*) Generate BoundedContext files for each module

// (*) Gather BoundedContexts and Modules (in .bl)

export default transpile;
