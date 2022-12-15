import { ParameterBuilderDirector } from '../builders/parameterDirector.js';

export const VALID_PARAMETER_TEST_CASES = [
  {
    description: 'a string parameter',
    parameter: new ParameterBuilderDirector().buildPrimitiveParameter('arg1', 'string'),
    output: 'arg1:string',
  },
  {
    description: 'a number parameter',
    parameter: new ParameterBuilderDirector().buildPrimitiveParameter('arg2', 'int32'),
    output: 'arg2:number',
  },
  {
    description: 'a custom Struct type parameter',
    parameter: new ParameterBuilderDirector().buildIdentifierParameter('arg3', 'Person'),
    output: 'arg3:Person',
  },
];
