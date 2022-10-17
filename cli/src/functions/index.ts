import * as fs from 'fs';
import * as path from 'path';
import { getRecursivelyFileInDirectory } from './getRecursivelyFileInDirectory.js';
import { appendFilesToString } from './appendFilesToString.js';
import { TBoundedContextName, TGetUseCasesResponse, TModuleName } from '../types.js';

const USE_CASE_FOLDER_NAME = 'Use Cases';
const BL_SUFFIX = 'bl';

const getFolderNamesFromPath = (filePath: string): string[] => {
  const paths = fs
    .readdirSync(filePath, { withFileTypes: true })
    .filter((dirOrFile) => dirOrFile.isDirectory())
    .map((dir) => path.join(filePath, dir.name));
  return paths;
};

const getBoundedContextModules = (
  absoluteSourcefilePath: string,
): Record<TBoundedContextName, TModuleName[]> => {
  const boundedContextPaths = getFolderNamesFromPath(absoluteSourcefilePath);

  const contextModules: Record<string, string[]> = {};
  for (const boundedContextsPath of boundedContextPaths) {
    const moduleNames = getContextModuleNames(boundedContextsPath);
    const boundedContextName = boundedContextsPath.split('/').pop();
    contextModules[boundedContextName] = moduleNames;
  }
  return contextModules;
};

const getContextModuleNames = (filePath: string): string[] => {
  const contextModuleNames = getFolderNamesFromPath(filePath).map((boundedContextPath) => {
    return boundedContextPath.split('/').pop();
  });
  return contextModuleNames;
};

const getUseCases = (useCasesPath: string): TGetUseCasesResponse => {
  const useCaseFilePaths = getRecursivelyFileInDirectory(useCasesPath, BL_SUFFIX);
  const useCases = {};
  for (const useCaseFilePath of useCaseFilePaths) {
    const useCasePathArray = useCaseFilePath.split('/');
    const useCaseName = useCasePathArray[useCasePathArray.length - 2];
    // useCaseFilePath.startsWith('/')
    //   ? useCaseFilePath.split('/')[1]
    //   : useCaseFilePath.split('/')[0];
    if (!useCases[useCaseName]) useCases[useCaseName] = { filesString: '' };
    useCases[useCaseName].filesString += appendFilesToString([useCaseFilePath]);
  }
  return useCases;
};

const getBitloopsModulesPreModelData = (
  modulePath: string,
): {
  miscFilesString: string;
  useCases: TGetUseCasesResponse;
} => {
  const contextFilePaths = getRecursivelyFileInDirectory(modulePath, BL_SUFFIX);
  // find useCasePath and call getUseCases
  const useCasesPath = path.join(modulePath, USE_CASE_FOLDER_NAME);
  // exclude useCase path
  // removeUseCasePath(contextFilePaths, useCasesPath);
  const useCases = getUseCases(useCasesPath);
  return {
    miscFilesString: appendFilesToString(contextFilePaths),
    useCases,
  };
};

type BoundedContextModules = Record<string, string[]>;

type InputFileInfo = {
  boundedContext: string;
  module: string;
  fileId: string;
  fileContents: string;
};

const getBitloopsFilesAndContents = (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
): InputFileInfo[] => {
  const result: InputFileInfo[] = [];
  for (const [boundedContextName, modules] of Object.entries(boundedContextModules)) {
    for (const moduleName of modules) {
      const modulePath = path.normalize(`${sourceDirPath}/${boundedContextName}/${moduleName}/`);
      const contextFilePaths = getRecursivelyFileInDirectory(modulePath, BL_SUFFIX);
      // TODO async read file with Promise.all
      for (const contextFilePath of contextFilePaths) {
        const fileContents = fs.readFileSync(contextFilePath, 'utf-8');
        const fileId = contextFilePath.split('/').pop();
        result.push({
          boundedContext: boundedContextName,
          module: moduleName,
          fileId,
          fileContents,
        });
      }
    }
  }
  return result;
};

export { getBoundedContextModules, getBitloopsModulesPreModelData, getBitloopsFilesAndContents };
