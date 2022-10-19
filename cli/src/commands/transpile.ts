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
import fs from 'fs';
import path from 'path';

import { copyrightSnippet } from './copyright.js';
import { TBoundedContextName, TModuleName } from '../types.js';
import {
  generateBitloopsModel,
  generateSetupDataModel,
  generateTargetFiles,
  getBoundedContextModules,
} from '../functions/index.js';
import { SupportedLanguages } from '../helpers/supportedLanguages.js';
import { clearFolder } from '../helpers/fileOperations.js';

interface ICollection {
  targetLanguage: string;
  sourceDirPath: string;
  targetDirPath: string;
}

const SETUP_FILE_EXTENSION = 'setup.bl';

const questions: QuestionCollection<ICollection> = [
  {
    type: 'input',
    name: 'sourceDirPath',
    message: 'Where are your source files located?',
    default: '.',
  },
  {
    type: 'input',
    name: 'targetDirPath',
    message: 'Where would you like your generated files to be exported?',
    default: './output',
  },
];

const transpile = async (source: ICollection): Promise<void> => {
  console.log();
  console.log(copyrightSnippet);
  console.log();
  const answers = await inquirer.prompt(questions, source);
  const { sourceDirPath, targetDirPath } = answers;
  const absoluteSourceDirPath = path.isAbsolute(sourceDirPath)
    ? sourceDirPath
    : path.normalize(`${process.cwd()}/${sourceDirPath}`);
  const absoluteOutputDirPath = path.isAbsolute(targetDirPath)
    ? targetDirPath
    : path.normalize(`${process.cwd()}/${targetDirPath}`);

  const boundedContextModules: Record<TBoundedContextName, TModuleName[]> =
    getBoundedContextModules(absoluteSourceDirPath);

  const dirEntries = fs.readdirSync(absoluteSourceDirPath, { withFileTypes: true });
  const filesNames = dirEntries.filter((entry) => entry.isFile()).map((fileName) => fileName.name);
  const atLeastOneSetupFileExists = filesNames.some((file) =>
    file.toLowerCase().endsWith(SETUP_FILE_EXTENSION),
  );
  const atLeastOneModuleExists = Object.values(boundedContextModules).some(
    (modules) => modules.length > 0,
  );
  // TODO Gather all errors and display them at once
  if (!atLeastOneSetupFileExists) {
    console.log('No setup file found. Please create a setup file in the root of your project.');
    process.exit(1);
  }
  if (!atLeastOneModuleExists) {
    console.log('No modules found. Please create a module inside one of your bounded contexts.');
    process.exit(1);
  }

  // TODO Check if the output directory exists and if it does, ask if the user wants to overwrite it
  clearFolder(targetDirPath);

  const setupData = generateSetupDataModel(sourceDirPath);
  const bitloopsModel = generateBitloopsModel(
    boundedContextModules,
    absoluteSourceDirPath,
    setupData,
  );

  console.log('setupData', setupData);
  generateTargetFiles({
    boundedContextModules,
    sourceDirPath: absoluteSourceDirPath,
    outputDirPath: absoluteOutputDirPath,
    bitloopsModel,
    setupData,
    targetLanguage: SupportedLanguages.TypeScript,
  });
};

// (*) Gather BoundedContexts and Modules
// ( ) Scan for servers (REST Fastify, REST Express, gRPC, GraphQL, etc.)
// (*) Copy boilerplate to output
// ( ) Delete unnecessary server files from infra
// (*) Add routes for BoundedContexts
// (*) Generate BoundedContext files for each module

// (*) Gather BoundedContexts and Modules (in .bl)
// (*) Generate setup Intermediate model (ast)
// (*) Generate [boundedContexts, modules] Intermediate model (ast)
// (*) Generate Target files

export default transpile;
