import { FileUtil } from '../../../../src/utils/file.js';
export const SEMANTIC_ERRORS_END_TO_END_TEST_CASES = [
  {
    description: 'Semantic error',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/semantic-errors.bl',
    ),
    className: 'TodoEntity',
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/semantic-errors/semantic-errors.mock.ts',
    ),
  },
];
