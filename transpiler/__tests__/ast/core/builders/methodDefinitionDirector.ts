import {
  TDefinitionMethodInfo,
  TBitloopsPrimitives,
  TBitloopsPrimaryType,
  TBitloopsIdentifier,
  TOkErrorReturnType,
} from '../../../../src/types.js';
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

  buildMethodWithPrimitiveParamsAndBitloopsPrimaryTypeReturn({
    methodName,
    params,
    returnType,
  }: {
    methodName: string;
    params: Array<{ name: string; type: TBitloopsPrimitives }>;
    returnType: TBitloopsPrimaryType;
  }): TDefinitionMethodInfo {
    return {
      methodDefinition: {
        identifier: methodName,
        parameters: params.map((param) =>
          new ParameterBuilderDirector().buildPrimitiveParameter(param.name, param.type),
        ),
        ...returnType,
      },
    };
  }

  buildMethodWithPrimitiveParamsAndOkErrorReturnType({
    methodName,
    params,
    returnType,
  }: {
    methodName: string;
    params: Array<{ name: string; type: TBitloopsPrimitives }>;
    returnType: TOkErrorReturnType;
  }): TDefinitionMethodInfo {
    return {
      methodDefinition: {
        identifier: methodName,
        parameters: params.map((param) =>
          new ParameterBuilderDirector().buildPrimitiveParameter(param.name, param.type),
        ),
        ...returnType,
      },
    };
  }

  buildMethodWithIdentifierParamsAndPrimitiveReturn({
    methodName,
    params,
    returnType,
  }: {
    methodName: string;
    params: Array<{ name: string; type: TBitloopsIdentifier }>;
    returnType: TBitloopsPrimitives;
  }): TDefinitionMethodInfo {
    return {
      methodDefinition: {
        identifier: methodName,
        parameters: params.map((param) =>
          new ParameterBuilderDirector().buildIdentifierParameter(param.name, param.type),
        ),
        type: {
          primitiveType: returnType,
        },
      },
    };
  }
}
