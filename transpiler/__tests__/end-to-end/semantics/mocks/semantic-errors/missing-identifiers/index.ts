import { FileUtil } from '../../../../../../src/utils/file.js';
import { SymbolTableErrorTestCase } from '../../symbol-table/symbol-table.js';

export const SYMBOL_TABLE_MISSING_IDENTIFIERS_TEST_CASES: SymbolTableErrorTestCase[] = [
  {
    description: 'Should return error that identifier in const declaration is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-const-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier person not defined.'],
  },
  {
    description: 'Should return error that identifier returned from function is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-return-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier person not defined.'],
  },
  {
    description: 'Should return error that argument name in method is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-method-argument-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier id not defined.'],
  },
  {
    description: 'Should return error that identifier in switch expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-switch-expression-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier animal not defined.'],
  },
  {
    description: 'Should return error identifier used inside if condition is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-if-condition-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier res not defined.'],
  },
  {
    description: 'Should return error that identifier in switch case expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-switch-case-expression-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier bird not defined.'],
  },
  {
    description:
      'Should return error that most left identifier in member expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-member-dot-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier account not defined.'],
  },
  {
    description:
      'Should return error that most left identifier in method expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-method-left-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier hello not defined.'],
  },
  {
    description: 'Should return error that this identifier in member dot expression is not defined',
    inputCore: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/missing-identifiers/missing-this-identifier.bl',
    ),
    inputSetup: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/semantics/mocks/semantic-errors/setup.bl',
    ),
    errorMessages: ['Identifier this not defined.'],
  },
];
