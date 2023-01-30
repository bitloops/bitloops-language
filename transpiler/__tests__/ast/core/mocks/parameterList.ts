import { TParameterList } from '../../../../src/types.js';
import { ParameterBuilderDirector } from '../builders/ParameterBuilderDirector.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  parameterList: TParameterList;
};

export const validParameterListTestCases: Array<TestCase> = [
  {
    description: 'valid 2 parameter list',
    fileId: 'testFile.bl',
    inputBLString: 'JestTest { (test: string, b: bool) } ',
    parameterList: {
      parameters: [
        new ParameterBuilderDirector().buildPrimitiveParameter('test', 'string'),
        new ParameterBuilderDirector().buildPrimitiveParameter('b', 'bool'),
      ],
    },
  },
  {
    description: 'valid empty parameter list',
    fileId: 'testFile.bl',
    inputBLString: 'JestTest { ( ) }',
    parameterList: {
      parameters: [],
    },
  },
  {
    description: 'valid 1 UseCase Parameter',
    fileId: 'testFile.bl',
    inputBLString: 'JestTest { (helloWorldUseCase: HelloWorldUseCase) }',
    parameterList: {
      parameters: [
        new ParameterBuilderDirector().buildIdentifierParameter(
          'helloWorldUseCase',
          'HelloWorldUseCase',
        ),
      ],
    },
  },
];
