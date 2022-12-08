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
  TTargetDependenciesTypeScript,
  TRepoPort,
  TDependencyParentTypescript,
  repoPortKey,
} from '../../../../../../../types.js';
import { ClassTypes, TClassTypesValues } from '../../../../../../../helpers/mappings.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { deepClone } from '../../../../../../../utils/deepClone.js';
import { RepoPortTypeIdentifiers } from '../../../../type-identifiers/repoPort.js';

const REPO_PORT_APPLICATION_DEP: TDependencyParentTypescript = {
  type: 'absolute',
  default: false,
  value: 'Application',
  from: '@bitloops/bl-boilerplate-core',
};

export const mapPortIdentifier = (
  builtInRepoPort: string,
  repoDependencyName: string,
  domainIdModel: TTargetDependenciesTypeScript,
): TTargetDependenciesTypeScript => {
  const domainObjectDep = getChildDependencies(repoDependencyName);
  const { output: domainIdValue, dependencies: domainIdDep } = domainIdModel;
  const mapper = {
    CRUDWriteRepoPort: {
      value: `ICRUDWritePort<${repoDependencyName},${domainIdValue}>`,
      dependencies: [deepClone(REPO_PORT_APPLICATION_DEP), ...domainObjectDep, ...domainIdDep],
    },

    CRUDReadRepoPort: {
      value: `ICRUDReadPort<${repoDependencyName}>`,
      dependencies: [deepClone(REPO_PORT_APPLICATION_DEP), ...domainObjectDep],
    },
  };
  const value = mapper[builtInRepoPort];
  if (!value) {
    throw new Error(`Built in repo port ${builtInRepoPort} not found, unknown extended repo port`);
  }
  return { output: `Application.Repo.${value.value}`, dependencies: value.dependencies };
};

export const mapExtendedRepoPorts = (
  repoPorts: string[],
  repoDependencyName: string,
  domainIdValue: TTargetDependenciesTypeScript,
): TTargetDependenciesTypeScript[] => {
  return repoPorts.map((extendedRepoPort) =>
    mapPortIdentifier(extendedRepoPort, repoDependencyName, domainIdValue),
  );
};

export const findIfWriteOrReadRepoPort = (
  repoPortInfo: TRepoPort,
): { repoDependencyName: string; type: TClassTypesValues } => {
  let repoDependencyName;
  let type: TClassTypesValues;
  if (RepoPortTypeIdentifiers.isAggregateRepoPort(repoPortInfo)) {
    repoDependencyName = repoPortInfo[repoPortKey].entityIdentifier;
    type = ClassTypes.RootEntity;
  } else if (RepoPortTypeIdentifiers.isReadModelRepoPort(repoPortInfo)) {
    repoDependencyName = repoPortInfo[repoPortKey].readModelIdentifier;
    type = ClassTypes.ReadModel;
  }
  return {
    repoDependencyName,
    type,
  };
};
