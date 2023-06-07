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
      'Identifier TodoEntity not found: from 1:28 to 1:38 of file entityNotFound.bl',
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
      'Identifier TitleOutOfBoundsRule not found: from 12:18 to 12:38 of file ruleNotFound.bl',
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
      'Identifier DomainErrors.TitleOutOfBoundsError not found: from 5:49 to 5:83 of file domainErrorNotFound.bl',
      'Identifier DomainErrors.TitleOutOfBoundsError not found: from 10:60 to 10:94 of file domainErrorNotFound.bl',
      'Identifier TitleOutOfBoundsError not defined.',
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
      'Identifier TodoProps not found: from 22:26 to 22:35 of file propsNotFound.bl',
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
      'Identifier ApplicationErrors.ToDoNotFoundError not found: from 50:14 to 50:49 of file applicationErrorNotFound.bl',
      'Identifier ApplicationErrors.ToDoNotFoundError not found: from 44:69 to 44:104 of file applicationErrorNotFound.bl',
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
      'Identifier DeleteTodoRequestDTO not found: from 42:24 to 42:44 of file dtoNotFound.bl',
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
      'Identifier TodoWriteRepoPort not found: from 47:52 to 47:69 of file repoPortNotFound.bl',
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
      'Identifier TodoReadModel not found: from 2:21 to 2:34 of file readModelNotFound.bl',
      'Identifier TodoReadModel not found: from 9:27 to 9:40 of file readModelNotFound.bl',
      'Identifier GetAllTodosResponseDTO not found: from 14:22 to 14:44 of file readModelNotFound.bl',
    ],
  },
  {
    description: 'Command and Query not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/commandsQueriesNotFound.bl',
    ),
    fileIdCore: 'commandsQueriesNotFound.bl',
    fileIdSetup: 'setup.bl',
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedErrorMessages: [
      'Identifier CreateTodoCommand not found: from 36:23 to 36:40 of file commandsQueriesNotFound.bl',
      'Identifier GetByIdTodoQuery not found: from 58:19 to 58:35 of file commandsQueriesNotFound.bl',
    ],
  },
  {
    description: 'Domain and Integration event not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/domainIntegrationEventsNotFound.bl',
    ),
    fileIdCore: 'domainIntegrationEventsNotFound.bl',
    fileIdSetup: 'setup.bl',
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedErrorMessages: [
      'Identifier TodoCreatedDomainEvent not found: from 2:19 to 2:41 of file domainIntegrationEventsNotFound.bl',
      'Identifier MoneyDepositedIntegrationEvent not found: from 67:19 to 67:49 of file domainIntegrationEventsNotFound.bl',
    ],
  },
  {
    description: 'Service port not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/servicePortNotFound.bl',
    ),
    fileIdCore: 'servicePortNotFound.bl',
    fileIdSetup: 'setup.bl',
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedErrorMessages: [
      'Identifier TestDataSchema not found: from 1:59 to 1:73 of file servicePortNotFound.bl',
      'Identifier SendEmailCommand not found: from 4:23 to 4:39 of file servicePortNotFound.bl',
      'Identifier EmailServicePort not found: from 3:55 to 3:71 of file servicePortNotFound.bl',
    ],
  },
  {
    description: 'Domain Service not found',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/domainServiceNotFound.bl',
    ),
    fileIdCore: 'domainServiceNotFound.bl',
    fileIdSetup: 'setup.bl',
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    expectedErrorMessages: [
      'Identifier MarketingNotificationDomainService not found: from 5:44 to 5:78 of file domainServiceNotFound.bl',
      'Identifier TodoCompletionsIncrementedDomainEvent not found: from 3:19 to 3:56 of file domainServiceNotFound.bl',
      'Identifier UserWriteRepoPort not found: from 1:75 to 1:92 of file domainServiceNotFound.bl',
      'Identifier NotificationTemplateReadRepoPort not found: from 1:120 to 1:152 of file domainServiceNotFound.bl',
    ],
  },
];

export const SEMANTIC_BC_ERRORS_END_TO_END_TEST_CASES = [
  {
    description: 'Repo port not found in different bounded context',
    core: [
      {
        boundedContext: 'Todo',
        module: 'Todo',
        fileId: 'queryHandler.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/semantic-errors/Todo/Todo/queryHandler.bl',
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
      'Identifier TodoEntity not found: from 1:28 to 1:38 of file repoPorts.bl',
      'Identifier TodoReadRepoPort not found in bounded context Demo: from 12:28 to 12:44 of file setupRepoPortDifferentBC.bl',
      'Identifier GetAllTodosQueryHandler not found in bounded context Todo: from 15:39 to 15:57 of file setupRepoPortDifferentBC.bl',
    ],
  },
];
