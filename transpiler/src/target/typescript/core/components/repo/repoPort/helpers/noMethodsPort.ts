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
  repoPortKey,
} from '../../../../../../../types.js';
import { ClassTypes } from '../../../../../../../helpers/mappings.js';
import { getParentDependencies } from '../../../../dependencies.js';
import { mapExtendedRepoPorts } from './mappers.js';

export const noMethodsRepoPort = (
  repoPortName: string,
  repoDependencyName: string,
  repoPortInfo: TRepoPort,
  domainIdValue: TTargetDependenciesTypeScript,
): TTargetDependenciesTypeScript => {
  const { extendedRepoPorts } = repoPortInfo[repoPortKey];
  let dependencies = [];
  const extendedRepoPortsRes = mapExtendedRepoPorts(
    extendedRepoPorts,
    repoDependencyName,
    domainIdValue,
  );
  const extendedRepoPortsString = extendedRepoPortsRes.map((x) => x.output).join(' & ');
  dependencies = [...dependencies, ...extendedRepoPortsRes.flatMap((x) => x.dependencies)];

  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.RepoPort,
    className: repoPortName,
  });
  return {
    output: `export type ${repoPortName} = ${extendedRepoPortsString};`,
    dependencies: parentDependencies,
  };
};
