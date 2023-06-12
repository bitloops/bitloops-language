import { FileUtil } from '../../../../../src/utils/file.js';
import { SymbolTableErrorTestCase } from '../symbol-table.js';

export const SYMBOL_TABLE_MEMBER_NOT_DEFINED_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that member is not defined for entity',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-entity.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member withdrawAmount not defined in AccountEntity.'],
  },
  {
    description: 'Should return error that member is not defined for command',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-command.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member amount not defined in WithdrawMoneyCommand.'],
  },
  {
    description: 'Should return error that member is not defined for query',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-query.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member accountId not defined in GetAccountQuery.'],
  },
  {
    description: 'Should return error that member is not defined for query handler',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-query-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member accountRepo not defined in GetAccountQueryHandler.'],
  },
  {
    description: 'Should return error that member is not defined for repo port',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-repo-port.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member getByType not defined in AccountReadRepoPort.'],
  },
  {
    description: 'Should return error that member is not defined for domain event',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-domain-event.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member test not defined in TodoAddedDomainEvent.'],
  },
  {
    description: 'Should return error that member is not defined for props',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-props.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member error not defined in TitleProps.'],
  },
  {
    description: 'Should return error that member is not defined for integration event',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-integration-event.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member account not defined in IntegrationMoneyDepositedSchemaV1.'],
  },
  {
    description: 'Should return error that member is not defined for value object',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-value-object.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member test not defined in TitleVO.'],
  },
  {
    description: 'Should return error that member is not defined for command bus port',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-command-bus-port.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member test not defined in CommandBus.'],
  },
  {
    description: 'Should return error that member is not defined for regex',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/symbol-table/missing-member-dot/missing-member-regex.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Member fail not defined in regex.'],
  },
];
