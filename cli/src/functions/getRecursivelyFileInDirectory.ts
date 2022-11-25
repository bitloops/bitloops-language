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
import path from 'path';

const CWD = process.cwd();

export const getRecursivelyFileInDirectory = (directoryPath: string, suffix: string): string[] => {
  let dirPath: string;
  if (path.isAbsolute(directoryPath)) {
    dirPath = directoryPath;
  } else {
    dirPath = path.join(CWD, directoryPath);
  }
  // console.log('dirPath', directoryPath, dirPath, CWD);
  const resultFiles = [];
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      const files = getFiles(filePath);
      resultFiles.push(...files);
    } else {
      resultFiles.push(filePath);
    }
  });

  const blFiles = resultFiles.filter((filePath) => filePath.split('.')[1] === suffix);
  return blFiles;
};

const getFiles = (dir: string): string[] => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const currentPath = path.join(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(currentPath) : [currentPath];
  });

  return Array.prototype.concat(...files);
};
