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

const BL_SUFFIX = 'bl';

type BoundedContextModules = Record<string, string[]>;

const getBitloopsFilesAndContents = async (
  boundedContextModules: BoundedContextModules,
  sourceDirPath: string,
): Promise<TParserCoreInputData> => {
  const result: TParserCoreInputData = [];
  for (const [boundedContextName, modules] of Object.entries(boundedContextModules)) {
    for (const moduleName of modules) {
      const modulePath = path.join(sourceDirPath, boundedContextName, moduleName);
      const contextFilePaths = getRecursivelyFileInDirectory(modulePath, BL_SUFFIX);
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
export { getBitloopsFilesAndContents };
