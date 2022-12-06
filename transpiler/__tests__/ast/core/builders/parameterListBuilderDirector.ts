import { TParameterDependencies } from '../../../../src/types.js';

export class ParameterListBuilderDirector {
  buildStringParams(...paramIdentifiers: string[]): TParameterDependencies {
    return paramIdentifiers.map((paramIdentifier) => ({
      parameter: {
        value: paramIdentifier,
        type: {
          primitiveType: 'string',
        },
      },
    }));
  }
}
