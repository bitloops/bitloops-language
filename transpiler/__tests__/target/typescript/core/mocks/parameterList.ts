import { ParameterBuilderDirector } from '../builders/parameterDirector.js';
import { ParameterListBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/parameterListDirector.js';

export const VALID_PARAMETER_LIST_TEST_CASES = [
  {
    description: 'a string parameter',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('arg1', 'string'),
    ),
    output: '(arg1:string)',
  },
  {
    description: 'a number parameter',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('arg2', 'int32'),
    ),
    output: '(arg2:number)',
  },
  {
    description: 'a custom Struct type parameter',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildIdentifierParameter('arg3', 'Person'),
    ),
    output: '(arg3:Person)',
  },
  {
    description: 'one struct and one arg parameter',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildIdentifierParameter('arg4', 'Person'),
      new ParameterBuilderDirector().buildPrimitiveParameter('arg5', 'string'),
    ),
    output: '(arg4:Person,arg5:string)',
  },
  {
    description: 'a struct array parameter',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildPrimitiveParameter('name', 'string'),
      new ParameterBuilderDirector().buildPrimitiveParameter('age', 'int32'),
      new ParameterBuilderDirector().buildIdentifierArrayParameter('children', 'Children'),
    ),
    output: '(name:string,age:number,children:Children[])',
  },
  {
    description: 'a built in class parameter',
    parameterList: new ParameterListBuilderDirector().buildParams(
      new ParameterBuilderDirector().buildBuiltInClassParameter('id', 'UUIDv4'),
    ),
    output: '(id:Domain.UUIDv4)',
  },
];
