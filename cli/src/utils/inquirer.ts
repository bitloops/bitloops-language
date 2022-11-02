import inquirer, { Question } from 'inquirer';
import { PathPrompt } from 'inquirer-path';

import { TAB, redColor } from '../utils/oraUtils.js';

export const inquirerFuzzy = async (q: Question, source): Promise<string> => {
  inquirer.registerPrompt('path', PathPrompt);
  const answer = await inquirer.prompt(
    [
      {
        type: 'path',
        name: q.name,
        directoryOnly: true,
        default: q.default,
        message: q.message,
        cwd: '.',
      },
    ],
    source,
  );
  const inputPath = answer[q.name];
  return inputPath;
};

export const printError = (message: string): void => {
  console.log(TAB + '❌ ' + redColor(message));
};
