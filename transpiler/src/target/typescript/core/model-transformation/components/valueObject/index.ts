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
import { TValueObjects } from '../../../../../../types.js';
import { modelToTypescriptModel } from '../../modelToTsModel.js';

const transformValueObjectIntermediateAST = (valueObjects: TValueObjects): TValueObjects => {
  for (const valueObjectValues of Object.values(valueObjects)) {
    if (valueObjectValues.methods) {
      const updatedMethods = modelToTypescriptModel({
        type: BitloopsTypesMapping.TValueObjectMethods,
        value: valueObjectValues.methods,
      });
      valueObjectValues.methods = updatedMethods;
    }
    const updatedCreate = modelToTypescriptModel({
      type: BitloopsTypesMapping.TDomainCreateMethod,
      value: valueObjectValues.create,
    });
    valueObjectValues.create = updatedCreate;
  }

  return valueObjects;
};

export { transformValueObjectIntermediateAST };
