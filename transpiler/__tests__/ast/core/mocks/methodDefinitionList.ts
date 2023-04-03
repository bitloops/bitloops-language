// import {  } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';
import { MethodDefinitionBuilderDirector } from '../builders/methodDefinitionDirector.js';
import { MethodDefinitionListBuilder } from '../builders/methodDefinitionListBuilder.js';
import { ReturnOkErrorTypeBuilder } from '../builders/returnOkErrorType.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: any;
};

export const validMethodDefinitionListCases: TestCase[] = [
  {
    description: 'Method definition list with bitloops primary return type',
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
  {
    description: 'Method definition list with ok error return type',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestMethodDefinitionList { encode(value: string):(OK(bytes),Errors()); }',
    expected: new MethodDefinitionListBuilder()
      .withMethodDefinitions([
        new MethodDefinitionBuilderDirector().buildMethodWithPrimitiveParamsAndOkErrorReturnType({
          methodName: 'encode',
          params: [{ name: 'value', type: 'string' }],
          returnType: new ReturnOkErrorTypeBuilder()
            .withOk(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bytes'))
            .withErrors([])
            .build(),
        }),
      ])
      .build(),
  },
];
