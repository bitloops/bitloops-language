import inquirer, { Question } from 'inquirer';
// import path from 'path';
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
        // If provided path is relative, it will be resolved based on cwd.
        cwd: process.cwd(), //'.',
      },
    ],
    source,
  );

  const inputPath: string = answer[q.name];
  return inputPath;
};

export const inquirerSimpleConfirm = async (
  name: string,
  message = '',
  def = '',
): Promise<boolean> => {
  const question = [
    {
      type: 'confirm',
      name: name,
      default: def,
      message: message,
    },
  ];
  const answers = await inquirer.prompt(question);

  return answers[name];
};
export const printError = (message: string): void => {
  console.log(TAB + '❌ ' + redColor(message));
};
