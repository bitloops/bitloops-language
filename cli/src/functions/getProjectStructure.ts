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
import { TBoundedContextName, TModuleName } from '../types.js';

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
    const boundedContextName = path.basename(boundedContextsPath);
    contextModules[boundedContextName] = moduleNames;
  }
  console.log(contextModules);
  return contextModules;
};

const getContextModuleNames = (filePath: string): string[] => {
  const contextModuleNames = getFolderNamesFromPath(filePath).map((boundedContextPath) => {
    return path.basename(boundedContextPath);
  });
  return contextModuleNames;
};

export { getBoundedContextModules };
