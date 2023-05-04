import { CodeSnippets } from '../src/commands/generate/data-sets/common/code-snippets.js';
import {
  ClassNameToTargetFileName,
  FileNameToClassName,
} from '../src/commands/generate/data-sets/common/names.js';

describe('Utility transforming class names to target file names', () => {
  test('Should output expected repository file name', (): void => {
    // Given
    const input = 'MongoUserWriteRepository';

    // When
    const res = ClassNameToTargetFileName.repository(input);

    // Then
    expect(res).toBe('mongo-user-write.repository.ts');
  });

  test('Should output expected service file name', () => {
    const input = 'MockUserEmailService';

    const res = ClassNameToTargetFileName.service(input);

    expect(res).toBe('mock-user-email.service.ts');
  });

  test('Should output expected integration event handler file name', () => {
    const input = 'UserAddedPubSubIntegrationEventHandler';

    const res = ClassNameToTargetFileName.pubsubHandler(input);

    expect(res).toBe('user-added.integration-handler.ts');
  });
});

describe('Utiliity transforming input file name to class name', () => {
  test('Should output expected repository class name', (): void => {
    // Given
    const repoPortFileName = 'user-write.repo-port.ts';

    // When
    const res = FileNameToClassName.repository(repoPortFileName, 'Mongo');

    // Then
    expect(res).toBe('MongoUserWriteRepository');
  });

  test('Should output expected service class name', () => {
    const servicePortFileName = 'user-email.service-port.ts';

    const res = FileNameToClassName.service(servicePortFileName, 'Mock');

    expect(res).toBe('MockUserEmailService');
  });

  test('Should output expected integration event class name', () => {
    const integrationEventFileName = 'todo-modified-title.integration-event.ts';

    const res = FileNameToClassName.integrationEvent(integrationEventFileName);

    expect(res).toBe('TodoModifiedTitleIntegrationEvent');
  });
});

describe('Sanitizing typescript files', () => {
  test('Should remove license code', () => {
    const inputFile = `/**
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
   export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
   export const PubSubQueryBusToken = Symbol('PubSubQueryBusToken');
   export const StreamingIntegrationEventBusToken = Symbol(
     'StreamingIntegrationEventBusToken'
   );
   export const StreamingDomainEventBusToken = Symbol(
     'StreamingDomainEventBusToken'
   );
   export const PubSubIntegrationEventBusToken = Symbol(
     'PubSubIntegrationEventBusToken'
   );
   export const TodoWriteRepoPortToken = Symbol('TodoWriteRepoPortToken');
   export const TodoReadRepoPortToken = Symbol('TodoReadRepoPortToken');`;

    const result = CodeSnippets.removeLicenseCode(inputFile);
    const exptectedResult = `
   export const StreamingCommandBusToken = Symbol('StreamingCommandBusToken');
   export const PubSubQueryBusToken = Symbol('PubSubQueryBusToken');
   export const StreamingIntegrationEventBusToken = Symbol(
     'StreamingIntegrationEventBusToken'
   );
   export const StreamingDomainEventBusToken = Symbol(
     'StreamingDomainEventBusToken'
   );
   export const PubSubIntegrationEventBusToken = Symbol(
     'PubSubIntegrationEventBusToken'
   );
   export const TodoWriteRepoPortToken = Symbol('TodoWriteRepoPortToken');
   export const TodoReadRepoPortToken = Symbol('TodoReadRepoPortToken');`;

    expect(result).toBe(exptectedResult);
  });

  test('Should sanitize backticks in typescript code', () => {
    const start = '```typescript';
    const end = '```';

    const inputCode = `${start}
const a = 5;
    ${end}
    This is something`;
    const result = CodeSnippets.sanitizeTypescript(inputCode);
    const expectedResult = 'const a = 5;';
    expect(result.trim()).toBe(expectedResult.trim());
  });
});
