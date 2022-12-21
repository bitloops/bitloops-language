import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';

export const VALID_PRIMARY_TYPE_TEST_CASES = [
  {
    description: 'Array primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('int32'),
    output: 'number[]',
  },
];
