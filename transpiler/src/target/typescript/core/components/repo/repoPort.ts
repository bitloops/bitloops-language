/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
// More specifically the code generation algorithm will identify all the Entities
// belonging to the Aggregate, and create all the CRUD methods with the respective data types.
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TRepoPorts, TDefinitionMethods } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

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
