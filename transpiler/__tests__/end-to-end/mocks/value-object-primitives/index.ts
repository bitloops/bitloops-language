import { FileUtil } from '../../../../src/utils/file.js';

export const VALUE_OBJECT_PRIMITIVES_END_TO_END_TEST_CASES = [
  {
    description: 'Test fromPrimitives with array of value object',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/value-object-primitives/array-properties/array-of-vo.bl',
    ),
    outputs: [
      {
        className: 'MoneyVO',
        content: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/value-object-primitives/array-properties/output.money.mock.ts',
        ),
      },
    ],
  },
  // {
  //   description: 'Test value object with standard vo property',
  //   input: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/entity-primitives/standard-vo/input.bl',
  //   ),
  //   outputs: [
  //     {
  //       className: 'MoneyVO',
  //       content: FileUtil.readFileString(
  //         'transpiler/__tests__/end-to-end/mocks/entity-primitives/standard-vo/output.mock.ts',
  //       ),
  //     },
  //   ],
  // },
  {
    description: 'Test regular value objects',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/value-object-primitives/regular-vo-s/input.bl',
    ),
    outputs: [
      {
        className: 'MoneyVO',
        content: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/value-object-primitives/regular-vo-s/output.money.mock.ts',
        ),
      },
      {
        className: 'AmountVO',
        content: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/value-object-primitives/regular-vo-s/output.amount.mock.ts',
        ),
      },
    ],
  },
];
