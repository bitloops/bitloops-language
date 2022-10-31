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
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import {
  isDomainPrivateMethod,
  isDomainPublicMethod,
} from '../../../../../../helpers/typeGuards.js';
import { TDomainMethods } from '../../../../../../types.js';
import { modelToTypescriptModel } from '../../modelToTsModel.js';

const transformDomainMethodsIntermediateAST = (domainMethods: TDomainMethods): TDomainMethods => {
  for (let domainMethodsValue of Object.values(domainMethods)) {
    if (isDomainPublicMethod(domainMethodsValue)) {
      domainMethodsValue = modelToTypescriptModel({
        type: BitloopsTypesMapping.TDomainPublicMethod,
        value: domainMethodsValue,
      });
    } else if (isDomainPrivateMethod(domainMethodsValue)) {
      domainMethodsValue = modelToTypescriptModel({
        type: BitloopsTypesMapping.TDomainPrivateMethod,
        value: domainMethodsValue,
      });
    } else {
      throw new Error('Unsupported domain method');
    }
  }

  return domainMethods;
};

export { transformDomainMethodsIntermediateAST };
