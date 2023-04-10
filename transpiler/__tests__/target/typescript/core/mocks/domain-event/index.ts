import { FileUtil } from '../../../../../../src/utils/file.js';
import { domainEventDeclarationNodeBuilderDirector } from '../../builders/domainEventNodeBuilderDirector.js';
import { DomainEventDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/DomainEvent/DomainEventDeclarationNode.js';
import { FieldListBuilderDirector } from '../../builders/fieldList.js';
import { FieldBuilderDirector } from '../../builders/field.js';

type TestCase = {
  description: string;
  domainEvent: DomainEventDeclarationNode;
  output: string;
};

export const contextInfo = {
  boundedContextName: 'Banking',
  moduleName: 'Banking',
};

export const VALID_DOMAIN_EVENT_TEST_CASES: TestCase[] = [
  {
    description: 'a domain event with a default topic',
    domainEvent: new domainEventDeclarationNodeBuilderDirector().buildDomainEvent(
      'AccountCreatedDomainEvent',
      'AccountEntity',
      new FieldListBuilderDirector().withFields([
        new FieldBuilderDirector().buildRequiredPrimitiveField('email', 'string'),
        new FieldBuilderDirector().buildRequiredPrimitiveField('code', 'string'),
      ]),
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event/accountCreatedDomainEvent.mock.ts',
    ),
  },
  {
    description: 'an empty payload domain event',
    domainEvent: new domainEventDeclarationNodeBuilderDirector().buildDomainEvent(
      'AccountDeletedDomainEvent',
      'AccountEntity',
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event/accountDeletedDomainEvent.mock.ts',
    ),
  },
];
