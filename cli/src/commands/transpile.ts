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

import fs from 'fs';
import ora, { Ora } from 'ora';

import { copyrightSnippet } from './copyright.js';
import { TBoundedContextName, TModuleName } from '../types.js';
import { deleteFolderContent, getBoundedContextModules } from '../functions/index.js';
import { clearFolder } from '../helpers/fileOperations.js';
import { purpleColor, stopSpinner, greenColor, TAB, redColor } from '../utils/oraUtils.js';
import {
  inquirerFuzzy as inquirerPath,
  inquirerSimpleConfirm,
  printError,
} from '../utils/inquirer.js';
import { Question } from 'inquirer';
import { transpileCode } from '../functions/transpile.js';
import { writeTranspiledCode } from '../functions/generateTargetFiles.js';
import path from 'path';

interface ICollection {
  targetLanguage: string;
  sourceDirPath: string;
  targetDirPath: string;
}
const SETUP_FILE_EXTENSION = 'setup.bl';

// 😑 question messages don't work with chalk
const questions: Question[] = [
  {
    // type: 'input',
    name: 'sourceDirPath',
    message: '📦 Where are your source files located?',
    default: '.',
  },
  {
    // type: 'input',
    name: 'targetDirPath',
    message: '🎯 Where would you like your generated files to be exported?',
    default: './output',
  },
];

const transpile = async (source: ICollection): Promise<void> => {
  console.log();
  console.log(copyrightSnippet);
  console.log();
  const answers = [];
  for (const q of questions) {
    answers.push(await inquirerPath(q, source));
  }
  const [sourceDirPath, targetDirPath] = answers;
  const libTargetDirPath = path.join(targetDirPath, 'lib');
  if (!fs.existsSync(libTargetDirPath)) {
    fs.mkdirSync(libTargetDirPath, { recursive: true });
  } else {
    const overwriteAccepted = await inquirerSimpleConfirm(
      'Overwrite',
      '⚠️  Target directory already exists. Overwrite?',
      'n',
    );
    if (!overwriteAccepted) {
      return;
    }
    await deleteFolderContent(libTargetDirPath);
  }
  let throbber: Ora;

  try {
    const boundedContextModules: Record<TBoundedContextName, TModuleName[]> =
      getBoundedContextModules(sourceDirPath);

    const dirEntries = fs.readdirSync(sourceDirPath, { withFileTypes: true });
    const filesNames = dirEntries
      .filter((entry) => entry.isFile())
      .map((fileName) => fileName.name);
    const atLeastOneSetupFileExists = filesNames.some((file) =>
      file.toLowerCase().endsWith(SETUP_FILE_EXTENSION),
    );
    const atLeastOneModuleExists = Object.values(boundedContextModules).some(
      (modules) => modules.length > 0,
    );
    // TODO Gather all errors and display them at once
    if (!atLeastOneSetupFileExists) {
      printError('No setup file found. Please create a setup file in the root of your project.');
      process.exit(1);
    }
    if (!atLeastOneModuleExists) {
      printError('No modules found. Please create a module inside one of your bounded contexts.');
      process.exit(1);
    }

    // TODO Check if the output directory exists and if it does ask if the user wants to overwrite it
    clearFolder(targetDirPath);

    throbber = ora(purpleColor('🔨 Transpiling... ')).start();

    const transpiledCode = await transpileCode(boundedContextModules, sourceDirPath);

    stopSpinner(throbber, greenColor('Transpiled'), '🔨');

    throbber = ora(purpleColor('🕒 Writing system files to disk...')).start();

    writeTranspiledCode(transpiledCode, targetDirPath);

    stopSpinner(throbber, greenColor('System files written'), '⏰');

    // console.log(greenColor('Project generated successfully!'));

    console.log(greenColor(TAB + '🦎 Project generated successfully!\n'));
  } catch (err) {
    console.log(err);
    console.error(redColor(TAB + '❌ ' + err));
    throbber?.stop();
  }
};

export default transpile;
