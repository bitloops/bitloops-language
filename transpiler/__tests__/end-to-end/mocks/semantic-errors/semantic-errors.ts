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
  // {
  //   description: 'Use case not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/useCases.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupUseCaseNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupUseCaseNotFound.bl',
  //   fileIdCore: 'useCases.bl',
  //   expectedErrorMessages: [
  //     'Use Case GetAllTodosUseCase not found in bounded context Todo: from 15:39 to 15:57 of file setupUseCaseNotFound.bl',
  //   ],
  // },
  // {
  //   description: 'Controller not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupControllerNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupControllerNotFound.bl',
  //   fileIdCore: 'controllers.bl',
  //   expectedErrorMessages: [
  //     'Controller GetTodosRESTController not found in bounded context Todo: from 19:27 to 19:49 of file setupControllerNotFound.bl',
  //   ],
  // },
  // {
  //   description: 'Repo port not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/repoPorts.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoPortNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupRepoPortNotFound.bl',
  //   fileIdCore: 'repoPorts.bl',
  //   expectedErrorMessages: [
  //     'Entity TodoEntity not found: from 2:28 to 2:38 of file repoPorts.bl',
  //     'Repo port TodoReadRepoPort not found in bounded context Todo: from 15:28 to 15:44 of file setupRepoPortNotFound.bl',
  //   ],
  // },
  // {
  //   description: 'Repo connection not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoConnectionNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupRepoConnectionNotFound.bl',
  //   fileIdCore: 'controllers.bl',
  //   expectedErrorMessages: [
  //     'Connection mongoConnection not found: from 13:17 to 13:32 of file setupRepoConnectionNotFound.bl',
  //   ],
  // },
  // {
  //   description: 'Repo adapter not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoAdapterNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupRepoAdapterNotFound.bl',
  //   fileIdCore: 'controllers.bl',
  //   expectedErrorMessages: [
  //     'Argument todoReadRepo not found: from 17:58 to 17:70 of file setupRepoAdapterNotFound.bl',
  //   ],
  // },
  // {
  //   description: 'Package port not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/packagePort.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupPackagePortNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupPackagePortNotFound.bl',
  //   fileIdCore: 'packagePort.bl',
  //   expectedErrorMessages: [
  //     'Package port UtilitiesPackagePort not found in bounded context Todo: from 1:53 to 1:73 of file setupPackagePortNotFound.bl',
  //   ],
  // },
  // {
  //   description: 'Router not found',
  //   inputCore: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/controllers.bl',
  //   ),
  //   inputSetup: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRouterNotFound.bl',
  //   ),
  //   fileIdSetup: 'setupRouterNotFound.bl',
  //   fileIdCore: 'controllers.bl',
  //   expectedErrorMessages: [
  //     'Router todoRESTRouter not found: from 12:14 to 12:28 of file setupRouterNotFound.bl',
  //   ],
  // },
  {
    description: 'Controller not found for graphql server',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/graphQLController.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupGraphQLServer.bl',
    ),
    fileIdSetup: 'setupGraphQLServer.bl',
    fileIdCore: 'graphQLController.bl',
    expectedErrorMessages: [
      'Controller HelloWorldController not found in bounded context Todo: from 4:17 to 4:37 of file setupGraphQLServer.bl',
      'Controller HelloWorld2Controller not found in bounded context Todo: from 5:17 to 5:38 of file setupGraphQLServer.bl',
      'Argument useCase1Dependency not found: from 5:39 to 5:57 of file setupGraphQLServer.bl',
      'Controller HelloWorld3Controller not found in bounded context Todo: from 6:17 to 6:38 of file setupGraphQLServer.bl',
      'Argument useCase2Dependency not found: from 6:39 to 6:57 of file setupGraphQLServer.bl',
      'Argument usersRepo not found: from 6:59 to 6:68 of file setupGraphQLServer.bl',
    ],
  },
];

export const SEMANTIC_BC_ERRORS_END_TO_END_TEST_CASES = [
  {
    description: 'Bounded context not found',
    core: [
      {
        boundedContext: 'Todo',
        module: 'Todo',
        fileId: 'useCases.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/useCases.bl',
        ),
      },
    ],
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupUseCaseDifferentBC.bl',
    ),
    fileIdSetup: 'setupUseCaseDifferentBC.bl',
    expectedErrorMessages: [
      'Bounded Context Demo not found: from 12:17 to 12:21 of file setupUseCaseDifferentBC.bl',
      'Bounded Context Demo not found: from 15:28 to 15:32 of file setupUseCaseDifferentBC.bl',
    ],
  },
  {
    description: 'Use case not found in different bounded context',
    core: [
      {
        boundedContext: 'Todo',
        module: 'Todo',
        fileId: 'useCases.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/useCases.bl',
        ),
      },
      {
        boundedContext: 'Demo',
        module: 'Todo',
        fileId: 'dtoNotFound.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/semantic-errors/dtoNotFound.bl',
        ),
      },
    ],
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupUseCaseDifferentBC.bl',
    ),
    fileIdSetup: 'setupUseCaseDifferentBC.bl',
    expectedErrorMessages: [
      'Type DeleteTodoRequestDTO not found: from 42:24 to 42:44 of file dtoNotFound.bl',
      'Repo port TodoReadRepoPort not found in bounded context Demo: from 12:28 to 12:44 of file setupUseCaseDifferentBC.bl',
      'Use Case GetAllTodosUseCase not found in bounded context Demo: from 15:39 to 15:57 of file setupUseCaseDifferentBC.bl',
    ],
  },
  {
    description: 'Repo port not found in different bounded context',
    core: [
      {
        boundedContext: 'Todo',
        module: 'Todo',
        fileId: 'useCases.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/useCases.bl',
        ),
      },
      {
        boundedContext: 'Demo',
        module: 'Todo',
        fileId: 'repoPorts.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/repoPorts.bl',
        ),
      },
    ],
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/setupRepoPortDifferentBC.bl',
    ),
    fileIdSetup: 'setupRepoPortDifferentBC.bl',
    expectedErrorMessages: [
      'Entity TodoEntity not found: from 2:28 to 2:38 of file repoPorts.bl',
      'Repo port TodoReadRepoPort not found in bounded context Demo: from 12:28 to 12:44 of file setupRepoPortDifferentBC.bl',
      'Use Case GetAllTodosUseCase not found in bounded context Todo: from 15:39 to 15:57 of file setupRepoPortDifferentBC.bl',
    ],
  },
];
