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
  ArrayBitloopsPrimType,
  bitloopsBuiltInClasses,
  bitloopsPrimitives,
  TBitloopsBuiltInClasses,
  TBitloopsPrimaryType,
  TBitloopsPrimitives,
} from '../../../../types.js';

export class BitloopsPrimTypeIdentifiers {
  static isArrayPrimType(primaryType: TBitloopsPrimaryType): primaryType is ArrayBitloopsPrimType {
    if (!primaryType) return false;
    if (typeof primaryType === 'string') return false;
    if ('arrayType' in primaryType) return true;
    return false;
  }

  /**
   * Define a custom type guard to assert whether an unknown object is a Bitloops build in class.
   */
  static isBitloopsBuiltInClass = (type: unknown): type is TBitloopsBuiltInClasses => {
    return typeof type === 'string' && bitloopsBuiltInClasses.includes(type as any);
  };

  static isBitloopsPrimitive(
    primaryType: TBitloopsPrimaryType,
  ): primaryType is TBitloopsPrimitives {
    if (typeof primaryType !== 'string') return false;
    return bitloopsPrimitives.includes(primaryType as any);
  }
}
