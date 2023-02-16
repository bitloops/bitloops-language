import { TBitloopsPrimaryType } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  type: TBitloopsPrimaryType;
};
// | Hello World    | core   | JestTestBitloopsPrimaryType { int32  }      | {"Hello World": {"core":{"Tests":{"jestTest": "int32"}}}}                                                         |
// | Hello World    | core   | JestTestBitloopsPrimaryType { double  }     | {"Hello World": {"core":{"Tests":{"jestTest": "double"}}}}                                                        |
// | Hello World    | core   | JestTestBitloopsPrimaryType { double[]  }   | {"Hello World": {"core":{"Tests":{"jestTest": { "arrayType": { "value": "double"}} }}}}                           |
// | Hello World    | core   | JestTestBitloopsPrimaryType { double[][]  } | {"Hello World": {"core":{"Tests":{"jestTest": { "arrayType": { "value": {"arrayType": {"value": "double"}}}} }}}} |
export const validBitloopsPrimaryTypeTestCases: Array<TestCase> = [
  {
    description: 'valid string',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBitloopsPrimaryType { string  }',
    type: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('string'),
  },
  {
    description: 'valid int32',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBitloopsPrimaryType { int32  }',
    type: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('int32'),
  },
  {
    description: 'valid double',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBitloopsPrimaryType { double  }',
    type: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('double'),
  },
  {
    description: 'valid double array',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBitloopsPrimaryType { double[]  }',
    type: new BitloopsPrimaryTypeDirector().buildArrayPrimaryType('double'),
  },
  {
    description: 'valid double array of arrays',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBitloopsPrimaryType { double[][]  }',
    type: new BitloopsPrimaryTypeDirector().buildDoubleArrayPrimaryType('double'),
  },
  {
    description: 'valid standard value object type',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestBitloopsPrimaryType { StandardVO.Currency }',
    type: new BitloopsPrimaryTypeDirector().buildStandardValueObjectPrimaryType('Currency'),
  },
];
