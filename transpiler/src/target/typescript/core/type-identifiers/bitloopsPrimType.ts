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
  ArrayBitloopsPrimTypeObject,
  arrayPrimaryTypeKey,
  bitloopsBuiltInClasses,
  bitloopsPrimitives,
  TBitloopsPrimaryTypeValues,
  TBitloopsIdentifierObject,
  primitivesTypeKey,
  TBitloopsPrimitivesObject,
  buildInClassTypeKey,
  bitloopsIdentifiersTypeKey,
  TBitloopsBuiltInClassesObject,
} from '../../../../types.js';

export class BitloopsPrimTypeIdentifiers {
  static isArrayPrimType(
    primaryType: TBitloopsPrimaryTypeValues,
  ): primaryType is ArrayBitloopsPrimTypeObject {
    if (!primaryType) return false;
    if (typeof primaryType === 'string') return false;
    if (arrayPrimaryTypeKey in primaryType) return true;
    return false;
  }

  /**
   * Define a custom type guard to assert whether an unknown object is a Bitloops built in class.
   */
  static isBitloopsBuiltInClass = (
    type: TBitloopsPrimaryTypeValues,
  ): type is TBitloopsBuiltInClassesObject => {
    if (buildInClassTypeKey in type) {
      return bitloopsBuiltInClasses.includes(type[buildInClassTypeKey]);
    }
    return false;
  };

  static isBitloopsPrimitive(
    primaryType: TBitloopsPrimaryTypeValues,
  ): primaryType is TBitloopsPrimitivesObject {
    if (primitivesTypeKey in primaryType) {
      return bitloopsPrimitives.includes(primaryType[primitivesTypeKey]);
    }
    return false;
  }

  static isBitloopsIdentifierType(
    primaryType: TBitloopsPrimaryTypeValues,
  ): primaryType is TBitloopsIdentifierObject {
    if (bitloopsIdentifiersTypeKey in primaryType) {
      return typeof primaryType[bitloopsIdentifiersTypeKey] === 'string';
    }
    return false;
  }

  static isReadModelIdentifier(primaryType: string): boolean {
    return primaryType.endsWith('ReadModel');
  }

  static isDTOIdentifier(primaryType: string): boolean {
    return primaryType.endsWith('DTO');
  }
}
