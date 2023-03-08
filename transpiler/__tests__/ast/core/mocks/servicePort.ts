import { TServicePort } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { MethodDefinitionBuilderDirector } from '../builders/methodDefinitionDirector.js';
import { ServicePortBuilder } from '../builders/servicePortBuilder.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TServicePort;
};

export const validServicePortDeclarationCases: Array<TestCase> = [
  {
    description: 'should parse a service port declaration with a single method',
    fileId: 'testFile.bl',
    inputBLString: 'ServicePort TestServicePort { getTestData(value: string): TestDataSchema; }',
    expected: new ServicePortBuilder()
      .withIdentifier('TestServicePort')
      .withDefinitionMethod(
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndBitloopsPrimaryTypeReturn(
          {
            methodName: 'getTestData',
            params: [{ name: 'value', type: 'string' }],
            returnType: new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
              'TestDataSchema',
            ),
          },
        ),
      )
      .build(),
  },
  {
    description: 'should parse a service port declaration with multiple methods',
    fileId: 'testFile.bl',
    inputBLString:
      'ServicePort TestServicePort { getTestData(value: string): TestDataSchema; sendTestData(value: TestDataSchema): void; }',
    expected: new ServicePortBuilder()
      .withIdentifier('TestServicePort')
      .withDefinitionMethod(
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndBitloopsPrimaryTypeReturn(
          {
            methodName: 'getTestData',
            params: [{ name: 'value', type: 'string' }],
            returnType: new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(
              'TestDataSchema',
            ),
          },
        ),
      )
      .withDefinitionMethod(
        new MethodDefinitionBuilderDirector().buildMethodWithIdentifierParamsAndPrimitiveReturn({
          methodName: 'sendTestData',
          params: [{ name: 'value', type: 'TestDataSchema' }],
          returnType: 'void',
        }),
      )
      .build(),
  },
];
