import { TDefinitionMethodInfo, TBitloopsPrimitives } from '../../../../src/types.js';
import { ParameterBuilderDirector } from './ParameterBuilderDirector.js';

export class MethodDefinitionBuilderDirector {
  buildMethodWithPrimitiveParamsAndVoidReturn({
    methodName,
    params,
  }: {
    methodName: string;
    params: Array<{ name: string; type: TBitloopsPrimitives }>;
  }): TDefinitionMethodInfo {
    return {
      methodDefinition: {
        identifier: methodName,
        parameters: params.map((param) =>
          new ParameterBuilderDirector().buildPrimitiveParameter(param.name, param.type),
        ),
        type: {
          primitiveType: 'void',
        },
      },
    };
  }

  buildMethodWithPrimitiveParamsAndReturn({
    methodName,
    params,
    returnType,
  }: {
    methodName: string;
    params: Array<{ name: string; type: TBitloopsPrimitives }>;
    returnType: TBitloopsPrimitives;
  }): TDefinitionMethodInfo {
    return {
      methodDefinition: {
        identifier: methodName,
        parameters: params.map((param) =>
          new ParameterBuilderDirector().buildPrimitiveParameter(param.name, param.type),
        ),
        type: {
          primitiveType: returnType,
        },
      },
    };
  }
}
