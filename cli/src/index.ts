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

import transpile from './commands/transpile.js';
import copyright, { copyrightSnippet } from './commands/copyright.js';

const program = new Command();

const purpleColor = chalk.hex('#7700e5');
console.log(purpleColor(figlet.textSync('Bitloops Language', { horizontalLayout: 'default' })));

program.version('0.0.1').description('The Bitloops Language CLI');
program.summary(
  'The Bitloops Language CLI is a command line utility for transpiling Bitloops Language files into your preferred target language (currently only TypeScript is supported).',
);
program.description(copyrightSnippet);
program
  .command('transpile')
  .description('Initialize Bitloops')
  .option('-l, --targetLanguage <string>')
  .option('-s, --sourceDirPath <string>')
  .option('-t, --targetDirPath <string>')
  .action(transpile);

program.command('copyright').description('Print copyright information').action(copyright);

program.parse(process.argv);
