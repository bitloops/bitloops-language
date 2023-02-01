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
import { FileUtil } from '../../../../src/utils/file.js';
export const SEMANTIC_ERRORS_END_TO_END_TEST_CASES = [
  {
    description: 'Rule not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/ruleNotFound.bl',
    ),
    fileId: 'ruleNotFound.bl',
  },
  {
    description: 'Domain error not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/domainErrorNotFound.bl',
    ),
    fileId: 'domainErrorNotFound.bl',
  },
  {
    description: 'Props not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/propsNotFound.bl',
    ),
    fileId: 'propsNotFound.bl',
  },
  {
    description: 'Application error not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/applicationErrorNotFound.bl',
    ),
    fileId: 'applicationErrorNotFound.bl',
  },
  {
    description: 'DTO not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/dtoNotFound.bl',
    ),
    fileId: 'dtoNotFound.bl',
  },
  {
    description: 'Repo port not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/repoPortNotFound.bl',
    ),
    fileId: 'repoPortNotFound.bl',
  },
  {
    description: 'Read model not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/readModelNotFound.bl',
    ),
    fileId: 'readModelNotFound.bl',
  },
  {
    description: 'Use case not found',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/useCaseNotFound.bl',
    ),
    fileId: 'useCaseNotFound.bl',
  },
];
