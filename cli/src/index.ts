#!/usr/bin/env node
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
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import axios from 'axios';

import transpile from './commands/transpile.js';
import copyright, { copyrightSnippet } from './commands/copyright.js';
import generate from './commands/generate/generate.js';
import { LIB_VERSION } from './version.js';

const VERSION_CHECK_URL = 'https://bitloops-language-version-check-6en3sbe4da-uc.a.run.app';
const CURRENT_VERSION = LIB_VERSION;

// Check if current version is the latest
const checkVersion = async (): Promise<void> => {
  try {
    const res = await axios.post(VERSION_CHECK_URL, { version: CURRENT_VERSION });
    const latestVersion = res.data.version;
    const latestVersionArray = latestVersion.split('.');
    const currentVersionArray = CURRENT_VERSION.split('.');
    if (
      Number(latestVersionArray[0]) > Number(currentVersionArray[0]) ||
      Number(latestVersionArray[1]) > Number(currentVersionArray[1]) ||
      Number(latestVersionArray[2]) > Number(currentVersionArray[2])
    ) {
      console.log(
        chalk.yellow('A new version of the Bitloops Language CLI is available: ') +
          chalk.green(`v${latestVersion}`),
      );
      console.log(chalk.yellow('To update run:'));
      console.log(chalk.yellow('npm install -g @bitloops/bitloops-language-cli'));
      console.log('or');
      console.log(chalk.yellow('yarn global add @bitloops/bitloops-language-cli'));
    }
  } catch (err) {
    console.error(err);
  }
};

(async (): Promise<void> => {
  try {
    await checkVersion();
    const program = new Command();

    const purpleColor = chalk.hex('#7700e5');
    console.log(purpleColor(figlet.textSync('BL', { horizontalLayout: 'default' })));
    console.log(purpleColor('Bitloops Language'));

    program.version(`v${CURRENT_VERSION}`).description('The Bitloops Language CLI');
    program.summary(
      'The Bitloops Language CLI is a command line utility for transpiling Bitloops Language files into your preferred target language (currently only TypeScript is supported).',
    );
    program.description(copyrightSnippet);
    program
      .command('transpile')
      .description('Transpile a BL project')
      .option('-l, --targetLanguage <string>')
      .option('-s, --sourceDirPath <string>')
      .option('-t, --targetDirPath <string>')
      .option('-y', 'Skip confirmation')
      .action(transpile);

    program
      .command('generate')
      .description('Generate infrastructure code using AI')
      .option('-s, --sourceDirPath <string>')
      .option('-t, --targetDirPath <string>')
      .action(generate);

    program.command('copyright').description('Print copyright information').action(copyright);

    program.parse(process.argv);
  } catch (e) {
    console.error(e);
  }
})();
