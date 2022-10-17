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
import fs from 'fs';
import path from 'path';

const FILE_SUFFIX_DELIMITER = '.';
const FOLDER_DELIMITER = '/';

const ensureDirectoryExistence = (filePath: string): boolean | void => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const writeToFile = (data: string, filePath: string): void => {
  ensureDirectoryExistence(filePath);
  // console.log('trying to write to file', filePath);
  fs.writeFileSync(filePath, data);
};

const readFromFile = (filePath: string): string => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, 'utf8');
};

const prependToFile = (data: string, filePath: string): void => {
  const fileData = fs.readFileSync(filePath);
  const prependByteData = Buffer.from(data);
  const fd = fs.openSync(filePath, 'w+');

  fs.writeSync(fd, prependByteData, 0, prependByteData.length, 0);
  fs.writeSync(fd, fileData, 0, fileData.length, prependByteData.length);

  fs.closeSync(fd);
};

const getFilename = (filePath: string): string => {
  const filenameParts = filePath.split(FILE_SUFFIX_DELIMITER);
  const fileNameWithoutSuffix = filenameParts[filenameParts.length - 2];
  const filePathNames = fileNameWithoutSuffix.split(FOLDER_DELIMITER);
  const fileName = filePathNames[filePathNames.length - 1];
  return fileName;
};

const copyFile = (source: string, dest: string): void => {
  fs.copyFileSync(source, dest);
};

export {
  writeToFile,
  prependToFile,
  readFromFile,
  ensureDirectoryExistence,
  getFilename,
  copyFile,
};
