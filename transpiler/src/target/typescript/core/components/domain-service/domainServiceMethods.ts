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
import { domainServicePrivateMethod } from './domainServicePrivateMethod.js';
import { domainServicePublicMethod } from './domainServicePublicMethod.js';

/**
 * Public & private methods
 */
export const domainServiceMethods = (
  publicMethods: TPublicMethods,
  privateMethods: TPrivateMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  if (privateMethods) {
    const privateResult = domainServicePrivateMethods(privateMethods);
    result += privateResult.output;
    dependencies = [...dependencies, ...privateResult.dependencies];
  }

  if (publicMethods) {
    const publicResult = domainServicePublicMethods(publicMethods);
    result += publicResult.output;
    dependencies = [...dependencies, ...publicResult.dependencies];
  }

  return {
    output: result,
    dependencies,
  };
};

export const domainServicePrivateMethods = (
  domainServicePrivateMethods: TPrivateMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const method of domainServicePrivateMethods) {
    const model = domainServicePrivateMethod(method);
    result += model.output;
    dependencies = [...dependencies, ...model.dependencies];
  }
  return {
    output: result,
    dependencies,
  };
};

const domainServicePublicMethods = (
  domainServicePublicMethods: TPublicMethods,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];

  for (const method of domainServicePublicMethods) {
    const model = domainServicePublicMethod(method);
    result += model.output;
    dependencies = [...dependencies, ...model.dependencies];
  }
  return {
    output: result,
    dependencies,
  };
};
