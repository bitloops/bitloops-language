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
  TStandardValueType,
  TBitloopsPrimitives,
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

  static isBitloopsValueObjectIdentifier(
    primaryType: TBitloopsPrimaryTypeValues,
  ): primaryType is TBitloopsIdentifierObject {
    if (bitloopsIdentifiersTypeKey in primaryType) {
      return (
        typeof primaryType[bitloopsIdentifiersTypeKey] === 'string' &&
        primaryType[bitloopsIdentifiersTypeKey].endsWith('VO')
      );
    }
    return false;
  }

  static builtInClassToPrimitiveType = (
    type: TBitloopsBuiltInClassesObject,
  ): TBitloopsPrimitives => {
    const builtInClass = type[buildInClassTypeKey];
    switch (builtInClass) {
      case 'UUIDv4':
        return 'string';
      default:
        return 'string';
    }
  };

  static standardVOToPrimitiveType = (
    type: TStandardValueType,
  ): { type?: string; primitive: any } => {
    const standardVOType = type.standardValueType.standardVOType;
    switch (standardVOType) {
      case 'Currency':
        return {
          type: 'Domain.StandardVO.Currency.Value',
          primitive: {
            currencyCode: 'string',
          },
        };
      default:
        throw new Error('Unknown standard value object type');
    }
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

  static isStandardValueType(
    primaryType: TBitloopsPrimaryTypeValues,
  ): primaryType is TStandardValueType {
    if ('standardValueType' in primaryType) {
      return true;
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
