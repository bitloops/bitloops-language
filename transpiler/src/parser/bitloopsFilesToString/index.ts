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
import path from 'path';
import { getRecursivelyFileInDirectory } from './getRecursivelyFileInDirectory.js';
import { appendFilesToString } from './appendFilesToString.js';
import { getFolderNamesFromPath } from './getContextModules.js';

export type TGetUseCasesResponse = Record<string, { filesString: string }>;
type TBoundedContextName = string;
type TModuleName = string;
const USE_CASE_FOLDER_NAME = 'Use Cases';
const BL_SUFFIX = 'bl';

const getBoundedContextModules = (
  filePath: string,
): Record<TBoundedContextName, TModuleName[]>[] => {
  const boundedContextsNamesPerModules = getFolderNamesFromPath(filePath).map(
    (boundedContextsPath) => {
      const moduleNames = getContextModuleNames(boundedContextsPath);
      const boundedContextName = boundedContextsPath.split('/').pop();
      const contextModules: Record<string, string[]> = {};
      contextModules[boundedContextName] = moduleNames;
      return contextModules;
    },
  );

  return boundedContextsNamesPerModules;
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

// const removeUseCasePath = (contextFilePaths: string[], useCasePath: string): string[] => {
//   return contextFilePaths.filter((path) => useCasePath === path);
// };

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

export { getContextModuleNames, getBitloopsModulesPreModelData, getBoundedContextModules };
