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
