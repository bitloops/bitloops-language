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
import { findRelativeDiffForImport } from '../../src/target/typescript-nest/utils/findRelativeDiff.js';

test("finds import string where dependency's starting folder resides in same folder with importer", () => {
  const importerDirPath = '/src/app/';
  const dependencyDirPath = '/src/app/components/';
  const dependencyFileName = 'index';

  const expectedResult = './components/index';
  const result = findRelativeDiffForImport(importerDirPath, dependencyDirPath, dependencyFileName);
  expect(result).toBe(expectedResult);
});

test('find import where dependency file is in same directory with importer', () => {
  const importerDirPath = '/src/app/';
  const dependencyDirPath = '/src/app/';
  const dependencyFileName = 'index';

  const expectedResult = './index';
  const result = findRelativeDiffForImport(importerDirPath, dependencyDirPath, dependencyFileName);
  expect(result).toBe(expectedResult);
});

test('find import where dependency file is in parent directory of importer', () => {
  const importerDirPath = '/src/app/';
  const dependencyDirPath = '/src/';
  const dependencyFileName = 'index';

  const expectedResult = '../index';
  const result = findRelativeDiffForImport(importerDirPath, dependencyDirPath, dependencyFileName);
  expect(result).toBe(expectedResult);
});

test("find import whre dependency's folder is in parallel folder with importer", () => {
  const importerDirPath = '/src/app/';
  const dependencyDirPath = '/src/components/';
  const dependencyFileName = 'index';

  const expectedResult = '../components/index';
  const result = findRelativeDiffForImport(importerDirPath, dependencyDirPath, dependencyFileName);
  expect(result).toBe(expectedResult);
});

test('find relative diff with no ./', () => {
  const importerDirPath = 'src/app/';
  const dependencyDirPath = 'src/components/';
  const dependencyFileName = 'index';

  const expectedResult = '../components/index';
  const result = findRelativeDiffForImport(importerDirPath, dependencyDirPath, dependencyFileName);
  expect(result).toBe(expectedResult);
});

test('find relative diff for complex path', () => {
  const importerDirPath = '/src/app/components/';
  const dependencyDirPath = '/src/components/';
  const dependencyFileName = 'index';

  const expectedResult = '../../components/index';
  const result = findRelativeDiffForImport(importerDirPath, dependencyDirPath, dependencyFileName);
  expect(result).toBe(expectedResult);
});
