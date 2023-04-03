import { TDomainEvent } from '../../../../src/types.js';
import { DomainEventBuilder } from '../builders/domainEventBuilder.js';
import { FieldBuilderDirector } from '../builders/fieldDirector.js';

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
    inputBLString: `DomainEvent AccountCreatedDomainEvent<AccountEntity> {
      string email;
      string pin;
    }`,
    expected: new DomainEventBuilder(contextInfo)
      .withIdentifier('AccountCreatedDomainEvent')
      .withAggregateRootName('AccountEntity')
      .withVariables({
        fields: [
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'email',
            type: 'string',
            isOptional: false,
          }),
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'pin',
            type: 'string',
            isOptional: false,
          }),
        ],
      })
      .build(),
  },
  {
    description: 'Empty domain event',
    fileId: 'testFile.bl',
    inputBLString: 'DomainEvent AccountCreatedDomainEvent<AccountEntity> {}',
    expected: new DomainEventBuilder(contextInfo)
      .withIdentifier('AccountCreatedDomainEvent')
      .withAggregateRootName('AccountEntity')
      .build(),
  },
];
export const validDomainEventCases: TestInput = {
  contextInfo,
  testCases,
};
