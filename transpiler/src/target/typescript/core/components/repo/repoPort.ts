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
import {
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  // TDependencyParentTypescript,
  TRepoPorts,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';

const REPO_PORT_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Application',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'Domain',
    from: '@bitloops/bl-boilerplate-core',
  },
];
const mapPortIdentifier = (id: string): string => {
  return `Application.Repo.I${id}`;
};
const mapExtendedRepoPorts = (repoPorts: string[], repoDependencyName): string[] => {
  return repoPorts.map(
    (extendedRepoPort) =>
      `${mapPortIdentifier(extendedRepoPort)}<${repoDependencyName},Domain.UUIDv4>`,
  );
};
export const repoPortToTargetLanguage = (repoPorts: TRepoPorts): TTargetDependenciesTypeScript => {
  const repoPortName = Object.keys(repoPorts)[0];
  const firstRepoPort = repoPorts[repoPortName];
  const { definitionMethods, aggregateRootName, readModelName, extendedRepoPorts } = firstRepoPort;
  let dependencies = REPO_PORT_DEPENDENCIES;

  let repoDependencyName;
  if (aggregateRootName !== undefined) {
    repoDependencyName = aggregateRootName;
  } else if (readModelName !== undefined) {
    repoDependencyName = readModelName;
  }
  dependencies = [...dependencies, ...getChildDependencies(repoDependencyName)];

  const methodNames = Object.keys(definitionMethods);

  const noMethodsRepoPortLangMapping = (
    portRepoName: string,
    repoDependencyName: string,
    extendedRepoPorts: string[],
  ): string => {
    const extendedRepoPortsString = mapExtendedRepoPorts(
      extendedRepoPorts,
      repoDependencyName,
    ).join(' & ');
    return `export type ${portRepoName} = ${extendedRepoPortsString};`;
  };

  if (methodNames.length === 0) {
    const finalResult = noMethodsRepoPortLangMapping(
      repoPortName,
      repoDependencyName,
      extendedRepoPorts,
    );
    const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
      classType: ClassTypes.RepoPorts,
      className: repoPortName,
    });

    return { output: finalResult, dependencies: parentDependencies };
  }

  const extendedRepoPortsString = mapExtendedRepoPorts(extendedRepoPorts, repoDependencyName).join(
    ', ',
  );

  const model = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDefinitionMethods,
    value: definitionMethods,
  });
  dependencies = [...dependencies, ...model.dependencies];
  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.RepoPorts,
    className: repoPortName,
  });

  const res =
    `export interface ${repoPortName} extends ${extendedRepoPortsString} {` + model.output + '}';
  return {
    output: res,
    dependencies: parentDependencies,
  };
};
