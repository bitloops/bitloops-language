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

// import {
//   getBitloopsModulesPreModelData,
//   getBoundedContextModules,
//   TGetUseCasesResponse,
// } from '../functions/bitloopsLanguageToModel/bitloopsFilesToString/index.js';
// import { parseBitloops } from '../functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';
// import { parseBitloops as parseBitloopsSetup } from '../functions/bitloopsLanguageToModel/bitloops-parser/setup/BitloopsSetupParser.js';
// import { modelToFinalLanguage } from '../functions/modelToTargetLanguage/model-to-final-language/index.js';
import { copyrightSnippet } from './copyright.js';
import { generateSetupFiles } from '../helpers/setupFiles.js';
// import { createDirectory } from '../helpers/createDirectory.js';
import {
  ISetupData,
  TBoundedContextName,
  TBoundedContexts,
  TGetUseCasesResponse,
  TModuleName,
} from '../types.js';
import { readFromFile } from '../helpers/fileOperations.js';
import { getBitloopsModulesPreModelData, getBoundedContextModules } from '../functions/index.js';
import {
  BitloopsIntermediateSetupASTParser,
  BitloopsLanguageSetupAST,
  BitloopsSetupParser,
  BitloopsSetupParserError,
} from '../functions/setup/index.js';
// import main from '../functions/bitloopsLanguageToModel/bitloops-parser/setup/BitloopsSetupVisitor/main.js';

interface ICollection {
  targetLanguage: string;
  sourceDirPath: string;
  outputDirPath: string;
}
// const VERSION = '0.0.13'; // TODO Get this dynamically
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

const generateSetupDataModel = (sourceDirPath: string): ISetupData => {
  console.log('Fetching setup data...', sourceDirPath);
  // get controller data from model
  const content = readFromFile(`${sourceDirPath}/setup.bl`);
  // const setupData = main(content);
  const parser = new BitloopsSetupParser();
  const initialModelOutput = parser.parse(content);

  const intermediateParser = new BitloopsIntermediateSetupASTParser();
  if (!(initialModelOutput instanceof BitloopsSetupParserError)) {
    const result = intermediateParser.parse(
      initialModelOutput as unknown as BitloopsLanguageSetupAST,
    );
    if (result instanceof BitloopsSetupParserError) {
      console.log(result);
      throw new Error('Error parsing setup file');
    }
    return result as ISetupData;
  }
  throw new Error('Error parsing setup file');
};

type BoundedContextModules = Record<string, string[]>;

const generateTargetFiles = (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
  _outputDirPath: string,
): void => {
  // const bitloopsModel: TBoundedContexts = {};
  console.log('Generating target files...');
  // TODO
  for (const boundedContextName of Object.keys(boundedContextModules)) {
    // const boundedContextName = Object.keys(boundedContextModule)[0];
    const modules = boundedContextModules[boundedContextName];
    // console.log('modules', boundedContextModule, boundedContextName, modules);
    for (const moduleName of modules) {
      const modulePath = path.normalize(`${sourceDirPath}/${boundedContextName}/${moduleName}/`);
      const filesToString: {
        miscFilesString: string;
        useCases: TGetUseCasesResponse;
      } = getBitloopsModulesPreModelData(modulePath);
      console.log('filesToString', filesToString);
      // const module = parseBitloops(
      //   boundedContextName,
      //   moduleName,
      //   filesToString.useCases,
      //   filesToString.miscFilesString,
      // );

      // const bcName = Object.keys(module)[0];
      // const modName = Object.keys(module[boundedContextName])[0];
      // bitloopsModel[bcName] = { [modName]: module[bcName][modName] };
      // const context = { boundedContext: bcName, module: modName };
      // modelToFinalLanguage(bitloopsModel, outputDirPath, context, setupData);
    }
  }
};

const generateBitloopsModel = (
  _boundedContextModules: BoundedContextModules,
  _sourceDirPath: string,
  _setupModel: ISetupData,
): TBoundedContexts => {
  const bitloopsModel: TBoundedContexts = {};
  // const parser = new BitloopsParser();
  // For each file in each module in each bounded context
  // Create the array
  // const initialModelOutput = parser.parse([
  //   {
  //     boundedContext: 'Test',
  //     module: 'Test',
  //     fileId: 'testFile.bl',
  //     fileContents: blString,
  //   },
  // ]);
  // const intermediateParser = new BitloopsIntermediateASTParser();
  // if (!(initialModelOutput instanceof BitloopsParserError)) {
  //   const result = intermediateParser.parse(
  //     initialModelOutput as unknown as BitloopsLanguageASTContext,
  //   );
  // }
  return bitloopsModel;
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
  clearFolder(outputDirPath);

  const setupData = generateSetupDataModel(sourceDirPath);
  const bitloopsModel = generateBitloopsModel(
    boundedContextModules,
    absoluteSourceDirPath,
    setupData,
  );

  generateSetupFiles(setupData, bitloopsModel, outputDirPath, sourceDirPath);
  generateTargetFiles(
    boundedContextModules,
    absoluteSourceDirPath,
    absoluteOutputDirPath + '/bitloops',
  );
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
// (*) Generate Target files for setup
// (*) Generate Target files for [boundedContexts, modules]

export default transpile;
