import { FileUtil } from '../../../../../../src/utils/file.js';

export const SYMBOL_TABLE_FIND_TYPE_OF_KEYWORD_TEST_CASES = [
  {
    description: 'Should return type of keyword in execute scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/findTypeOfKeyword/command-handler-execute.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: {
      name: 'accountEntity',
      position: {
        line: 16,
        column: 22,
        fileId: 'fileId',
      },
    },
    expectedOutput: { type: '(OK(AccountEntity), Errors(UnexpectedError))', isConst: true },
  },
  {
    description: 'Should return type of keyword in execute scope with ifError',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/findTypeOfKeyword/command-handler-execute-if-error.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'accountEntity', position: { line: 16, column: 22, fileId: 'fileId' } },
    expectedOutput: { type: 'AccountEntity', isConst: true },
  },
  {
    description: 'Should return type of keyword in if scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/command-handler-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'result', position: { line: 17, column: 22, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in if scope, with two ifs',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/command-handler-two-if.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'message', position: { line: 23, column: 23, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in else scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/query-handler-with-else.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'account', position: { line: 17, column: 24, fileId: 'fileId' } },
    expectedOutput: { type: '(OK(AccountReadModel), Errors(UnexpectedError))', isConst: true },
  },
  {
    description: 'Should return type of keyword in switch scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/command-handler-switch.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'animal', position: { line: 22, column: 19, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in switch-case scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/findTypeOfKeyword/command-handler-switch-case.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'bird', position: { line: 43, column: 20, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in switch-default scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/findTypeOfKeyword/command-handler-switch-default.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'cat', position: { line: 49, column: 26, fileId: 'fileId' } },
    expectedOutput: { type: 'string', isConst: true },
  },
  {
    description: 'Should return type of keyword in domain-create scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/entity.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'isNew', position: { line: 20, column: 16, fileId: 'fileId' } },
    expectedOutput: { type: 'bool', isConst: true },
  },
  {
    description: 'Should return type of keyword in handle scope',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/symbol-table/domain-event-handler.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    keywordInfo: { name: 'command', position: { line: 9, column: 36, fileId: 'fileId' } },
    expectedOutput: { type: 'SendEmailCommand', isConst: true },
  },
];
