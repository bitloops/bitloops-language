import { FileUtil } from '../../../../src/utils/file.js';

export const ENTITY_PRIMITIVES_END_TO_END_TEST_CASES = [
  // {
  //   description: 'Test fromPrimitives with array of value object',
  //   input: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/entity-primitives/array-of-vo.bl',
  //   ),
  //   output: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/entity-primitives/array-of-vo.output.mock.ts',
  //   ),
  // },
  // {
  //   description: 'Test value object with standard vo property',
  //   input: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/entity-primitives/standard-vo/input.bl',
  //   ),
  //   output: FileUtil.readFileString(
  //     'transpiler/__tests__/end-to-end/mocks/entity-primitives/standard-vo/output.mock.ts',
  //   ),
  // },
  {
    description: 'Test regular value objects',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/entity-primitives/regular-vo-s/input.bl',
    ),
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/entity-primitives/regular-vo-s/output.mock.ts',
    ),
  },
];
