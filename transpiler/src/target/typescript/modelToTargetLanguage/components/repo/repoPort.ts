// More specifically the code generation algorithm will identify all the Entities
// belonging to the Aggregate, and create all the CRUD methods with the respective data types.

import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { TDefinitionMethods, TRepoPorts } from '../../../types.js';
import { BitloopsTypesMapping } from '../commons/index.js';
import { modelToTargetLanguage } from '../index.js';

export const repoPortToTargetLanguage = (repoPorts: TRepoPorts, targetLanguage: string): string => {
  const initialObjectValuesLangMapping = {
    [SupportedLanguages.TypeScript]: (propName: string) =>
      `export class ${propName} extends ValueObject<${propName}Props> { `,
  };
  // TODO for all object values
  const repoPortName = Object.keys(repoPorts)[0];
  initialObjectValuesLangMapping[targetLanguage](repoPortName);
  const firstRepoPort = repoPorts[repoPortName];
  const { definitionMethods, aggregateRootName, extendedRepoPorts } = firstRepoPort;
  const methodNames = Object.keys(definitionMethods);

  const noMethodsRepoPortLangMapping = {
    [SupportedLanguages.TypeScript]: (
      portRepoName: string,
      aggregateRootName: string,
      extendedRepoPorts: string[],
    ): string => {
      const extendedRepoPortsString = extendedRepoPorts
        .map((extendedRepoPort) => `${extendedRepoPort}<${aggregateRootName}>`)
        .join(' & ');
      return `export type ${portRepoName} = ${extendedRepoPortsString};`;
    },
  };

  if (methodNames.length === 0) {
    const finalResult = noMethodsRepoPortLangMapping[targetLanguage](
      repoPortName,
      aggregateRootName,
      extendedRepoPorts,
    );
    return finalResult;
  }

  const withMethodsRepoPortLangMapping = {
    [SupportedLanguages.TypeScript]: (
      portRepoName: string,
      aggregateRootName: string,
      extendedRepoPorts: string[],
      definitionMethods: TDefinitionMethods,
    ): string => {
      const extendedRepoPortsString = extendedRepoPorts
        .map((extendedRepoPort) => `${extendedRepoPort}<${aggregateRootName}>`)
        .join(', ');
      const res =
        `export interface ${portRepoName} extends ${extendedRepoPortsString} {` +
        modelToTargetLanguage({
          type: BitloopsTypesMapping.TDefinitionMethods,
          value: definitionMethods,
          targetLanguage: SupportedLanguages.TypeScript,
        });
      +'}';
      return res;
    },
  };
  const finalResult = withMethodsRepoPortLangMapping[targetLanguage](
    repoPortName,
    aggregateRootName,
    extendedRepoPorts,
    definitionMethods,
  );
  return finalResult;
};
