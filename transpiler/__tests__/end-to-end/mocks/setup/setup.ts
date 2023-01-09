import { TTargetSetupContent } from '../../../../src/target/types.js';
import { FileUtil } from '../../../../src/utils/file.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

type TestCase = {
  description: string;
  input: string;
  expectedOutputs: TTargetSetupContent[];
};

const setupFilePaths = {
  'fastifyIndex.mock.ts': {
    fileId: 'src/shared/infra/rest/fastify/routers/index.ts',
    fileType: 'REST.Fastify.Router',
    formatterParser: 'typescript',
  },
  'index.mock.ts': {
    fileId: 'src/index.ts',
    fileType: 'startup',
    formatterParser: 'typescript',
  },
  'packageMock.json': {
    fileId: 'package.json',
    fileType: 'Config',
    formatterParser: 'json',
  },
  'tsconfigMock.json': {
    fileId: 'tsconfig.json',
    fileType: 'Config',
    formatterParser: 'json',
  },
  'nodemonMock.json': {
    fileId: 'nodemon.json',
    fileType: 'Config',
    formatterParser: 'json',
  },
  'app0.mock.ts': {
    fileId: 'src/shared/infra/rest/fastify/app0.ts',
    fileType: 'REST.Fastify.Server',
    formatterParser: 'typescript',
  },
};

const getExpectedSetupOutputs = (
  setupFilePaths: Record<string, { fileId: string; fileType: string; formatterParser: string }>,
): TTargetSetupContent[] => {
  const basePath = 'transpiler/__tests__/end-to-end/mocks/setup/';

  const expectedOutput: TTargetSetupContent[] = [];
  for (const [mockFileName, { fileId, fileType, formatterParser }] of Object.entries(
    setupFilePaths,
  )) {
    const fileContent = FileUtil.readFileString(basePath + mockFileName);
    const formatterConfig = { semi: true, parser: formatterParser, singleQuote: true };
    expectedOutput.push({
      fileId,
      fileType,
      fileContent: formatString(fileContent, formatterConfig),
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
