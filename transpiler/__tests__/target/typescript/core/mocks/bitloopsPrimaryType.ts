import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';

export const VALID_PRIMARY_TYPE_TEST_CASES = [
  {
    description: 'Primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('int32'),
    output: 'number',
  },
  {
    description: 'Array primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildArrayPrimaryType('int32'),
    output: 'number[]',
  },
];
