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
import { TRepoPorts, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const repoPortToTargetLanguage = (repoPorts: TRepoPorts): TTargetDependenciesTypeScript => {
  const repoPortName = Object.keys(repoPorts)[0];
  const firstRepoPort = repoPorts[repoPortName];
  const { definitionMethods, aggregateRootName, readModelName, extendedRepoPorts } = firstRepoPort;

  let repoDependencyName;
  if (aggregateRootName !== undefined) {
    repoDependencyName = aggregateRootName;
  } else if (readModelName !== undefined) {
    repoDependencyName = readModelName;
  }

  const methodNames = Object.keys(definitionMethods);

  const noMethodsRepoPortLangMapping = (
    portRepoName: string,
    repoDependencyName: string,
    extendedRepoPorts: string[],
  ): string => {
    const extendedRepoPortsString = extendedRepoPorts
      .map((extendedRepoPort) => `${extendedRepoPort}<${repoDependencyName}>`)
      .join(' & ');
    return `export type ${portRepoName} = ${extendedRepoPortsString};`;
  };

  if (methodNames.length === 0) {
    const finalResult = noMethodsRepoPortLangMapping(
      repoPortName,
      repoDependencyName,
      extendedRepoPorts,
    );
    return { output: finalResult, dependencies: [] };
  }

  const extendedRepoPortsString = extendedRepoPorts
    .map((extendedRepoPort) => `${extendedRepoPort}<${repoDependencyName}>`)
    .join(', ');

  const model = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDefinitionMethods,
    value: definitionMethods,
  });
  const res =
    `export interface ${repoPortName} extends ${extendedRepoPortsString} {` + model.output + '}';
  return {
    output: res,
    dependencies: model.dependencies,
  };
};
