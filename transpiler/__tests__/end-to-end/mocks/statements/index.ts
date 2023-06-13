import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { FileUtil } from '../../../../src/utils/file.js';

export const STATEMENTS_TEST_CASES = [
  {
    description: 'Testing For of statement what pushes value objects inside an array',
    input: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/statements/for-of-statement.bl',
    ),
    classType: ClassTypes.DomainService,
    output: FileUtil.readFileString(
      'transpiler/__tests__/end-to-end/mocks/statements/for-of-statement.mock.ts',
    ),
  },
];
