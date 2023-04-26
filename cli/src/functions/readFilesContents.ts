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
import * as fs from 'fs/promises';
import * as path from 'path';

import { getRecursivelyFileInDirectory } from './getRecursivelyFileInDirectory.js';
import { TParserCoreInputData } from '@bitloops/bl-transpiler';
import { BoundedContextModulesInfo } from '../utils/bounded-context-module.generator.js';

const BL_SUFFIX = 'bl';

type BoundedContextModules = Record<string, string[]>;

const getBitloopsFilesAndContents = async (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
  suffix: 'bl' | 'ts' = BL_SUFFIX,
): Promise<TParserCoreInputData> => {
  const result: TParserCoreInputData = [];
  for (const [boundedContextName, modules] of Object.entries(boundedContextModules)) {
    for (const moduleName of modules) {
      const modulePath = path.join(sourceDirPath, boundedContextName, moduleName);
      const contextFilePaths = getRecursivelyFileInDirectory(modulePath, suffix);
      const moduleInput = await Promise.all(
        contextFilePaths.map(async (contextFilePath) => {
          const fileContents = await fs.readFile(contextFilePath, 'utf-8');
          const fileName = contextFilePath.split('/').pop();
          return {
            boundedContext: boundedContextName,
            module: moduleName,
            fileId: contextFilePath,
            fileName,
            fileContents,
          };
        }),
      );
      result.push(...moduleInput);
    }
  }
  return result;
};

export type TranspiledTypescriptFileInfo = {
  fileName: string;
  fileContent: string;
  filePath: string;
};
export type TranspiledTypescriptFilesAndContents = BoundedContextModulesInfo<
  TranspiledTypescriptFileInfo[]
>;

const getTypescriptFilesAndContents = async (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
): Promise<TranspiledTypescriptFilesAndContents> => {
  const result: TranspiledTypescriptFilesAndContents = {};
  for (const [boundedContextName, modules] of Object.entries(boundedContextModules)) {
    result[boundedContextName] = {};
    for (const moduleName of modules) {
      result[boundedContextName][moduleName] = [];
      const modulePath = path.join(sourceDirPath, boundedContextName, moduleName);
      const contextFilePaths = getRecursivelyFileInDirectory(modulePath, 'ts');
      const moduleFiles = await Promise.all(
        contextFilePaths.map(async (contextFilePath) => {
          const fileContent = await fs.readFile(contextFilePath, 'utf-8');
          const fileName = contextFilePath.split('/').pop();
          return {
            fileName,
            fileContent,
            filePath: contextFilePath,
          };
        }),
      );
      result[boundedContextName][moduleName] = moduleFiles;
    }
  }
  return result;
};
export { getBitloopsFilesAndContents, getTypescriptFilesAndContents };
