import { BitloopsPrimaryTypeNodeDirector } from '../builders/bitloopsPrimaryTypeDirector.js';

export const VALID_PRIMARY_TYPE_TEST_CASES = [
  {
    description: 'Primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('int32'),
    output: 'number',
  },
  {
    description: 'Array primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeNodeDirector().buildArrayPrimitiveType('float'),
    output: 'number[]',
  },
  {
    description: 'Double array primitive type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeNodeDirector().buildDoubleArrayPrimitiveType(
      'string',
    ),
    output: 'string[][]',
  },
  {
    description: 'Built in class type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeNodeDirector().buildBuiltinClassPrimaryType(
      'UUIDv4',
    ),
    output: 'Domain.UUIDv4',
  },
  {
    description: 'Bitloops identifier type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(
      'TodoEntity',
    ),
    output: 'TodoEntity',
  },
  {
    description: 'Array Bitloops identifier type',
    bitloopsPrimaryType: new BitloopsPrimaryTypeNodeDirector().buildArrayIdentifierPrimaryType(
      'TodoReadModel',
    ),
    output: 'TodoReadModel[]',
  },
];
