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
import {
  TTargetDependenciesTypeScript,
  TPrivateMethods,
  TPublicMethods,
} from '../../../../../types.js';
import { domainPublicMethod } from './domainPublicMethod.js';
import { domainPrivateMethod } from './index.js';

/**
 * Public & private methods
 */
export const domainMethods = (
  publicMethods: TPublicMethods,
  privateMethods: TPrivateMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  if (privateMethods) {
    const privateResult = domainPrivateMethods(privateMethods);
    result += privateResult.output;
    dependencies = [...dependencies, ...privateResult.dependencies];
  }

  if (publicMethods) {
    const publicResult = domainPublicMethods(publicMethods);
    result += publicResult.output;
    dependencies = [...dependencies, ...publicResult.dependencies];
  }

  return {
    output: result,
    dependencies,
  };
};

export const domainPrivateMethods = (
  domainPrivateMethods: TPrivateMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const method of domainPrivateMethods) {
    const model = domainPrivateMethod(method);
    result += model.output;
    dependencies = [...dependencies, ...model.dependencies];
  }
  return {
    output: result,
    dependencies,
  };
};

const domainPublicMethods = (
  domainPublicMethods: TPublicMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const method of domainPublicMethods) {
    const model = domainPublicMethod(method);
    result += model.output;
    dependencies = [...dependencies, ...model.dependencies];
  }
  return {
    output: result,
    dependencies,
  };
};
