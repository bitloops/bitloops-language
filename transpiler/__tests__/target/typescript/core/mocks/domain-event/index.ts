import { FileUtil } from '../../../../../../src/utils/file.js';
import { domainEventDeclarationNodeBuilderDirector } from '../../builders/domainEventNodeBuilderDirector.js';
import { DomainEventDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/DomainEvent/DomainEventDeclarationNode.js';

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
      contextInfo,
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/domain-event/accountCreatedDomainEvent.mock.ts',
    ),
  },
];
