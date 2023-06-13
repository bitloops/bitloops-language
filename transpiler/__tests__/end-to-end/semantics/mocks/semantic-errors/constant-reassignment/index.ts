import { FileUtil } from '../../../../../../src/utils/file.js';
import { SymbolTableErrorTestCase } from '../../symbol-table/symbol-table.js';

export const SYMBOL_TABLE_CONSTANT_REASSIGNMENT_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that const declaration cannot be reassigned',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/constant-reassignment/const-reassignment.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Cannot reassign constant variable accountId.'],
  },
];
