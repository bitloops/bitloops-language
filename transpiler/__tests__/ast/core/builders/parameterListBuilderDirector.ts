import { TParameter, TParameterList } from '../../../../src/types.js';

export class ParameterListBuilderDirector {
  buildParams(params: TParameter[]): TParameterList {
    return {
      parameters: params,
    };
  }

  buildStringParams(...paramIdentifiers: string[]): TParameterList {
    return {
      parameters: paramIdentifiers.map((paramIdentifier) => ({
        parameter: {
          value: paramIdentifier,
          type: {
            primitiveType: 'string',
          },
        },
      })),
    };
  }

  buildParameterListWithOneParameter({
    parameterIdentifier,
    parameterType,
  }: {
    parameterIdentifier: string;
    parameterType: string;
  }): TParameterList {
    return {
      parameters: [
        {
          parameter: {
            value: parameterIdentifier,
            type: {
              bitloopsIdentifierType: parameterType,
            },
          },
        },
      ],
    };
  }
}
