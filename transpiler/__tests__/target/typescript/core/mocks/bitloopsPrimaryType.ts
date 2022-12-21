import { BitloopsPrimaryTypeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';

export const VALID_PRIMARY_TYPE_TEST_CASES = [
  {
    description: 'Primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('int32'),
    output: 'number',
  },
  {
    description: 'Array primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildArrayPrimitiveType('float'),
    output: 'number[]',
  },
  {
    description: 'Double array primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildDoubleArrayPrimitiveType('string'),
    output: 'string[][]',
  },
  {
    description: 'Built in class type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildBuiltinClassPrimaryType('UUIDv4'),
    output: 'Domain.UUIDv4',
  },
  {
    description: 'Bitloops identifier type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType('TodoEntity'),
    output: 'TodoEntity',
  },
  {
    description: 'Array Bitloops identifier type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeDirector().buildArrayIdentifierPrimaryType(
      'TodoReadModel',
    ),
    output: 'TodoReadModel[]',
  },
];
