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
import * as fs from 'fs';
import * as path from 'path';

import { getRecursivelyFileInDirectory } from './getRecursivelyFileInDirectory.js';

const BL_SUFFIX = 'bl';

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
export { getBitloopsFilesAndContents };
