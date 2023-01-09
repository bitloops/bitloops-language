import { TTargetSetupContent } from '../../../../src/target/types.js';
import { FileUtil } from '../../../../src/utils/file.js';

type TestCase = {
  description: string;
  input: string;
  expectedOutputs: TTargetSetupContent[];
};

const setupFilePaths = {
  'setup.bl': 'transpiler/__tests__/end-to-end/mocks/setup/setup.bl',
};

const getExpectedSetupOutputs = (setupFilePaths: Record<string, string>): TTargetSetupContent[] => {
  const fileType = 'fileType';
  const basePath = 'transpiler/__tests__/end-to-end/mocks/setup/';

  const expectedOutput: TTargetSetupContent[] = [];
  for (const [mockFileName, fileId] of Object.entries(setupFilePaths)) {
    const fileContent = FileUtil.readFileString(basePath + mockFileName);
    expectedOutput.push({
      fileId,
      fileType,
      fileContent,
    });
  }

  return expectedOutput;
};

export const SETUP_END_TO_END_TEST_CASES: Array<TestCase> = [
  {
    description: '',
    input: FileUtil.readFileString('transpiler/__tests__/end-to-end/mocks/setup/setup.bl'),
    expectedOutputs: getExpectedSetupOutputs(setupFilePaths),
  },
];
