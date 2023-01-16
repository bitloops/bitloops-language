// import {  } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { MethodDefinitionBuilderDirector } from '../builders/methodDefinitionDirector.js';
import { MethodDefinitionListBuilder } from '../builders/methodDefinitionListBuilder.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: any;
};

export const validMethodDefinitionListCases: TestCase[] = [
  {
    description: 'Simple Write Repo port declaration with no method definitions',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestMethodDefinitionList { encode(value: string): bytes; }',
    expected: new MethodDefinitionListBuilder()
      .withMethodDefinitions([
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndBitloopsPrimaryTypeReturn(
          {
            methodName: 'encode',
            params: [{ name: 'value', type: 'string' }],
            returnType: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bytes'),
          },
        ),
      ])
      .build(),
  },
];
