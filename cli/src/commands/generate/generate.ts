import fs from 'fs';
import { copyrightSnippet } from '../copyright.js';
import { ConfigUtils } from '../../utils/config.js';
import inquirer, { Question } from 'inquirer';
import { inquirerFuzzy as inquirerPath } from '../../utils/inquirer.js';
import { getBoundedContextModules } from '../../functions/index.js';
import { TBoundedContextName, TModuleName } from '../../types.js';
import path from 'path';
import { getTypescriptFilesAndContents } from '../../functions/readFilesContents.js';
import { writeAIResults } from './helpers/writeAiResults.js';
import { greenColor, redColor } from '../../utils/oraUtils.js';
import { extractComponentsFromFiles, extractGrpcExposedComponents } from './helpers/input-files.js';
import { CliInfraCodeGenerator } from './cli-infra-code-generator.js';
import { IInfraCodeGenerator } from './interfaces/infra-code-generator.js';
import { writeStaticAssets } from './helpers/writeStaticAssets.js';
/**
 * TODO add a json or yaml config file, where the user can set settings for preferred repo adapters
 * for each port(file-name as a key), and e.g. MongoDB as value
 * Also which command/query handlers he wishes to expose through the API
 */

interface ICollection {
  targetDirPath: string;
}
const apiKeyQuestion: Question = {
  // type: 'input',
  name: 'apiKey',
  message: '📦 What is your open-ai key?',
};
const questions: Question[] = [
  {
    name: 'sourceDirPath',
    message: '📦 Where is your transpiled code located?(path of lib)',
    default: '.',
  },
  {
    name: 'targetDirPath',
    message: '🎯 Where would you like your generated files to be exported?',
    default: './output',
  },
];

const generateInfra = async (source: ICollection): Promise<void> => {
  console.log();
  console.log(copyrightSnippet);
  console.log();

  let apiKey = await ConfigUtils.readApiKey();
  if (!apiKey) {
    console.log('No API key found.');

    const answers = await inquirer.prompt([apiKeyQuestion]);
    const { apiKey: newApiKey } = answers;
    await ConfigUtils.writeApiKey(newApiKey);
    apiKey = newApiKey;
  }
  const answers = [];
  for (const q of questions) {
    answers.push(await inquirerPath(q, source));
  }
  const [sourceDirPath, targetDirPath] = answers;
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }

  const sourceDirPathBoundedContext = path.join(sourceDirPath, 'bounded-contexts');

  const boundedContextModules: Record<TBoundedContextName, TModuleName[]> =
    getBoundedContextModules(sourceDirPathBoundedContext);

  // let throbber: Ora;

  try {
    const transpiledFiles = await getTypescriptFilesAndContents(
      boundedContextModules,
      sourceDirPathBoundedContext,
    );
    const bitloopsProjectConfig = await ConfigUtils.readBitloopsProjectConfigFile();
    const componentsInfo = extractComponentsFromFiles(transpiledFiles);
    const exposedGrpcComponents = await extractGrpcExposedComponents(
      componentsInfo,
      bitloopsProjectConfig,
    );

    // throbber = ora(purpleColor('🔨 Waiting for ai generation to complete... ')).start();
    console.log('🔨 Waiting for ai generation to complete... ');

    const infraCodeGenerator: IInfraCodeGenerator = new CliInfraCodeGenerator(
      apiKey,
      bitloopsProjectConfig,
    );
    const responses = await infraCodeGenerator.generate({ componentsInfo, exposedGrpcComponents });

    const totalCost = infraCodeGenerator.totalCost.toFixed(2);

    console.log(greenColor('Generated.'), ' ✅');
    console.log(`Total cost: $${totalCost}`);
    await writeAIResults(responses, targetDirPath, exposedGrpcComponents);
    await writeStaticAssets(targetDirPath, componentsInfo);
  } catch (error) {
    const TAB = '\t';
    console.error(redColor(TAB + '❌ ' + error));
  }

  console.log();
};

export default generateInfra;
