import { TDomainEvent } from '../../../../src/types.js';
import { DomainEventBuilder } from '../builders/domainEventBuilder.js';

type TestInput = {
  contextInfo: { boundedContextName: string; moduleName: string };
  testCases: TestCase[];
};

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TDomainEvent;
};

const contextInfo = {
  boundedContextName: 'Banking',
  moduleName: 'Accounts',
};
const testCases = [
  {
    description: 'Basic domain event with default topic',
    fileId: 'testFile.bl',
    inputBLString: 'DomainEvent AccountCreatedDomainEvent<AccountEntity>;',
    expected: new DomainEventBuilder()
      .withIdentifier('AccountCreatedDomainEvent')
      .withAggregateRootName('AccountEntity')
      .build(),
  },
];
export const validDomainEventCases: TestInput = {
  contextInfo,
  testCases,
};
