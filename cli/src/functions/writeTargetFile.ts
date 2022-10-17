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
import { join } from 'path';
import { writeToFile } from '../helpers/fileOperations.js';

export const writeTargetFile = (params: {
  projectPath: string;
  filePathObj: { path: string; filename: string };
  fileContent: string;
}): void => {
  const { projectPath, filePathObj, fileContent } = params;
  const { path, filename } = filePathObj;
  const filePath = join(projectPath, path, filename);

  writeToFile(fileContent, filePath);
};
