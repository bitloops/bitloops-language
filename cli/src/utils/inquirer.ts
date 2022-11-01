import fz from 'inquirer-fuzzy-path';

import { TAB, redColor } from '../utils/oraUtils.js';
import inquirer, { Question } from 'inquirer';
import path from 'path';
export const inquirerFuzzy = async (q: Question, source: any): Promise<string> => {
  inquirer.registerPrompt('fuzzypath', fz);
  const answer = await inquirer.prompt(
    [
      {
        type: 'fuzzypath',
        name: q.name,
        itemType: 'directory',
        rootPath: './',
        default: q.default,
        message: q.message,
        suggestOnly: false,
        depthLimit: 5,
      },
    ],
    source,
  );
  const inputPath = answer[q.name];
  return path.normalize(`${process.cwd()}/${inputPath}`);
};
export const printError = (message: string): void => {
  console.log(TAB + '❌ ' + redColor(message));
};
