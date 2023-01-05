import { TUseCaseDefinition, TUseCaseExpression, TIdentifier } from '../../../../types.js';

export type TUseCase = {
  instanceName: TIdentifier;
} & TUseCaseExpression;
type TModuleName = string;
type TUseCaseModule = Record<TModuleName, TUseCase[]>;
type TBoundedContextName = string;
export type TUseCases = Record<TBoundedContextName, TUseCaseModule>;

export class UseCaseDefinitionHelpers {
  static getUseCasesForEachBoundedContextModule(
    useCaseDefinitions: TUseCaseDefinition[],
  ): TUseCases {
    const useCases: TUseCases = {};
    for (const useCase of useCaseDefinitions) {
      const { useCaseDefinition } = useCase;
      const { identifier, useCaseExpression } = useCaseDefinition;
      const { boundedContextModule } = useCaseExpression;
      const { boundedContextName, moduleName } = boundedContextModule;
      const { wordsWithSpaces: boundedContext } = boundedContextName;
      const { wordsWithSpaces: module } = moduleName;

      if (!useCases[boundedContext]) {
        useCases[boundedContext] = {
          module: [
            {
              instanceName: identifier,
              useCaseExpression,
            },
          ],
        };
      } else if (!useCases[boundedContext][module]) {
        useCases[boundedContext][module] = [
          {
            instanceName: identifier,
            useCaseExpression,
          },
        ];
      } else {
        useCases[boundedContext][module].push({
          instanceName: identifier,
          useCaseExpression,
        });
      }
    }
    return useCases;
  }
}
