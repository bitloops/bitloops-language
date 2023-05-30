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
import sloc from 'sloc';
import Table from 'cli-table3';
import { readFile, readdir, stat } from 'fs/promises';
import { extname, join } from 'path';

interface ICollection {
  blSourcePath: string;
  tsTargetPath: string;
}

async function readFileContentsRecursively(
  directoryPath: string,
  extension: string,
): Promise<string[]> {
  const filesAndDirectories = await readdir(directoryPath);
  const contents = await Promise.all(
    filesAndDirectories.map(async (name: string) => {
      const fullPath = join(directoryPath, name);
      const stats = await stat(fullPath);
      if (stats.isDirectory()) {
        return readFileContentsRecursively(fullPath, extension);
      } else if (stats.isFile() && extname(name) === extension) {
        // return fullPath;
        return await readFile(fullPath, 'utf8');
      }
      return undefined;
    }),
  );
  // Remove undefined values (for files that didn't match the extension) and flatten the array
  return contents.flat().filter(Boolean);
}

export const analyzeLinesOfCode = async (source: ICollection): Promise<void> => {
  const { blSourcePath, tsTargetPath } = source;
  // console.log(source);
  const blFiles = await readFileContentsRecursively(blSourcePath, '.bl');
  // console.log(blFiles.length);

  const tsFiles = await readFileContentsRecursively(tsTargetPath, '.ts');
  // console.log(tsFiles.length);

  const blLines = blFiles.reduce((acc, file) => {
    const stats = sloc(file, 'ts');
    return acc + stats.source;
  }, 0);

  let tsLines = 0;
  for (const file of tsFiles) {
    // Use sloc to analyze the file
    const stats = sloc(file, 'ts');
    tsLines += stats.source;
  }
  // console.table({
  //   Bitloops: {
  //     'Lines of Code': blLines,
  //     'Number of Files': blFiles.length,
  //   },
  //   TypeScript: {
  //     'Lines of Code': tsLines,
  //     'Number of Files': tsFiles.length,
  //   },
  // });

  // Calculate differences
  let fileDiff: any = (tsFiles.length - blFiles.length) / tsFiles.length;
  let locDiff: any = (tsLines - blLines) / tsLines;

  // Format differences as percentages
  fileDiff = '-' + (fileDiff * 100).toFixed(2) + '%';
  locDiff = '-' + (locDiff * 100).toFixed(2) + '%';

  const table = new Table({
    head: ['', 'TypeScript', 'Bitloops', '% Diff'],
  });

  table.push(
    ['Files', tsFiles.length, blFiles.length, fileDiff],
    ['LoC', tsLines, blLines, locDiff],
  );

  console.log(table.toString());
};
