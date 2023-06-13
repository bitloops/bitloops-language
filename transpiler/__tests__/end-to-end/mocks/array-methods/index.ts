import { FileUtil } from '../../../../src/utils/file.js';

export const ARRAY_FUNCTIONAL_METHODS_END_TO_END_TEST_CASES = [
  {
    description: 'Testing map method',
    input: FileUtil.readFileString('transpiler/__tests__/end-to-end/mocks/array-methods/map.bl'),
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/array-methods/map.mock.ts',
    ),
  },
];
