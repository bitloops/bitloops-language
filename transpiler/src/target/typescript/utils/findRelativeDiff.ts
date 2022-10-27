/**
 *  Bitloops Language
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
import { relative } from 'path';

const sameDirectory = (relDif: string): boolean => relDif === '';
const startingFolderIsInSameDirectory = (relDif: string): boolean => !relDif.startsWith('..');

/**
 * @description
 * This function returns the relative path to the dependency
 * @param importerDirPath - The directory path of the file that has the dependency
 * @param dependencyDirPath - The directory path of the file that is the dependency
 * @param dependencyFileName - file name of dependency to be imported, without extension
 * @returns string
 */
export const findRelativeDiffForImport = (
  importerDirPath: string,
  dependencyDirPath: string,
  dependencyFileName: string,
): string => {
  const relativePathDif = relative(importerDirPath, dependencyDirPath);
  // console.log('relativePathDif', relativePathDif, pathOfImporter, pathToBeImported);
  if (sameDirectory(relativePathDif)) {
    return `./${dependencyFileName}`;
  } else if (startingFolderIsInSameDirectory(relativePathDif)) {
    return `./${relativePathDif}/${dependencyFileName}`;
  } else {
    return `${relativePathDif}/${dependencyFileName}`;
  }
  // const importPath =
  //   (sameDirectory(relativePathDif) ? './' : relativePathDif + '/') + dependencyFileName;
  // return importPath;
};
