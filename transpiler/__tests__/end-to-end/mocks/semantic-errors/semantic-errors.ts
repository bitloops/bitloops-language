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
export const SEMANTIC_CORE_ERRORS_END_TO_END_TEST_CASES = [
  {
    description: 'Entity not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/entityNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'entityNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Entity TodoEntity not found: from 1:28 to 1:38 of file entityNotFound.bl',
    ],
  },
  {
    description: 'Rule not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/ruleNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'ruleNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'DomainRule TitleOutOfBoundsRule not found: from 12:18 to 12:38 of file ruleNotFound.bl',
    ],
  },
  {
    description: 'Domain error not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/domainErrorNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'domainErrorNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Error DomainErrors.TitleOutOfBoundsError not found: from 5:49 to 5:83 of file domainErrorNotFound.bl',
      'Error DomainErrors.TitleOutOfBoundsError not found: from 10:58 to 10:92 of file domainErrorNotFound.bl',
    ],
  },
  //the following needs FIX!! (metadata)
  {
    description: 'Props not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/propsNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'propsNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Type TodoProps not found: from 22:24 to 22:33 of file propsNotFound.bl',
    ],
  },
  {
    description: 'Application error not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/applicationErrorNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'applicationErrorNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Error ApplicationErrors.ToDoNotFoundError not found: from 46:14 to 46:49 of file applicationErrorNotFound.bl',
      'Error ApplicationErrors.ToDoNotFoundError not found: from 40:65 to 40:100 of file applicationErrorNotFound.bl',
    ],
  },
  {
    description: 'DTO not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/dtoNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'dtoNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Type DeleteTodoRequestDTO not found: from 42:24 to 42:44 of file dtoNotFound.bl',
    ],
  },
  {
    description: 'Repo port not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/repoPortNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'repoPortNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Type TodoWriteRepoPort not found: from 43:38 to 43:55 of file repoPortNotFound.bl',
    ],
  },
  {
    description: 'Read model not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/readModelNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'readModelNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Type TodoReadModel not found: from 2:21 to 2:34 of file readModelNotFound.bl',
    ],
  },
  {
    description: 'Use case not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/useCaseNotFound.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    fileIdCore: 'useCaseNotFound.bl',
    fileIdSetup: 'setup.bl',
    expectedErrorMessages: [
      'Type GetAllTodosUseCase not found: from 1:63 to 1:81 of file useCaseNotFound.bl',
    ],
  },
];

export const SEMANTIC_SETUP_ERRORS_END_TO_END_TEST_CASES = [
  {
    description: 'Use case not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/useCases.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupUseCaseNotFound.bl',
    ),
    fileIdSetup: 'setupUseCaseNotFound.bl',
    fileIdCore: 'useCases.bl',
    expectedErrorMessages: [
      'Use Case GetAllTodosUseCase not found: from 15:39 to 15:57 of file setupUseCaseNotFound.bl',
    ],
  },
  {
    description: 'Controller not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupControllerNotFound.bl',
    ),
    fileIdSetup: 'setupControllerNotFound.bl',
    fileIdCore: 'controllers.bl',
    expectedErrorMessages: [
      'Controller GetTodosRESTController not found: from 19:27 to 19:49 of file setupControllerNotFound.bl',
    ],
  },
  {
    description: 'Repo port not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/repoPorts.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoPortNotFound.bl',
    ),
    fileIdSetup: 'setupRepoPortNotFound.bl',
    fileIdCore: 'repoPorts.bl',
    expectedErrorMessages: [
      'Entity TodoEntity not found: from 2:28 to 2:38 of file repoPorts.bl',
      'Repo port TodoReadRepoPort not found: from 15:28 to 15:44 of file setupRepoPortNotFound.bl',
    ],
  },
  {
    description: 'Repo connection not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoConnectionNotFound.bl',
    ),
    fileIdSetup: 'setupRepoConnectionNotFound.bl',
    fileIdCore: 'controllers.bl',
    expectedErrorMessages: [
      'Connection mongoConnection not found: from 13:17 to 13:32 of file setupRepoConnectionNotFound.bl',
    ],
  },
  {
    description: 'Repo adapter not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoAdapterNotFound.bl',
    ),
    fileIdSetup: 'setupRepoAdapterNotFound.bl',
    fileIdCore: 'controllers.bl',
    expectedErrorMessages: [
      'Adapter todoReadRepo not found: from 17:58 to 17:70 of file setupRepoAdapterNotFound.bl',
    ],
  },
];
