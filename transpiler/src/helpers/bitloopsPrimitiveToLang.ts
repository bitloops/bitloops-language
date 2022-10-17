/**
 *  Bitloops Language CLI
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
import { SupportedLanguages } from './supportedLanguages.js';

const BITLOOPS_PRIMITIVES = {
  string: 'string',
  bool: 'bool',
  double: 'double',
  float: 'float',
  int32: 'int32',
  int64: 'int64',
  uint32: 'uint32',
  uint64: 'uint64',
  sint32: 'sint32',
  sint64: 'sint64',
  fixed32: 'fixed32',
  fixed64: 'fixed64',
  sfixed32: 'sfixed32',
  sfixed64: 'sfixed64',
  bytes: 'bytes',
  regex: 'regex',
  Void: 'Void',
};

export const bitloopsTypeToLangMapping = {
  [SupportedLanguages.TypeScript]: (type: unknown): string => {
    switch (type) {
      case BITLOOPS_PRIMITIVES.string: {
        return 'string';
      }
      case BITLOOPS_PRIMITIVES.bool: {
        return 'boolean';
      }
      case BITLOOPS_PRIMITIVES.double:
      case BITLOOPS_PRIMITIVES.float:
      case BITLOOPS_PRIMITIVES.int32:
      case BITLOOPS_PRIMITIVES.int64:
      case BITLOOPS_PRIMITIVES.uint32:
      case BITLOOPS_PRIMITIVES.uint64:
      case BITLOOPS_PRIMITIVES.sint32:
      case BITLOOPS_PRIMITIVES.sint64:
      case BITLOOPS_PRIMITIVES.fixed32:
      case BITLOOPS_PRIMITIVES.fixed64:
      case BITLOOPS_PRIMITIVES.sfixed32:
      case BITLOOPS_PRIMITIVES.sfixed64: {
        return 'number';
      }
      case BITLOOPS_PRIMITIVES.bytes:
        return 'Uint8Array';

      // 'bytes',
      // 'enum',
      // 'Timestamp',
      // 'Any',
      // 'Struct',
      // 'Map',
      // 'NullValue',
      // 'Duration',
      case BITLOOPS_PRIMITIVES.regex: {
        return 'RegExp';
      }
      case BITLOOPS_PRIMITIVES.Void: {
        return 'void';
      }
      default: {
        throw new Error(`Invalid primitive type: ${type}`);
      }
    }
  },
};
