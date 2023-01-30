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
import { SupportedLanguages } from '../target/supportedLanguages.js';
import { TBitloopsPrimitives } from '../types.js';

export const bitloopsPrimitives: Record<string, TBitloopsPrimitives> = {
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
  void: 'void',
};

export const bitloopsTypeToLangMapping = {
  [SupportedLanguages.TypeScript]: (type: TBitloopsPrimitives): string => {
    switch (type) {
      case bitloopsPrimitives.string: {
        return 'string';
      }
      case bitloopsPrimitives.bool: {
        return 'boolean';
      }
      case bitloopsPrimitives.double:
      case bitloopsPrimitives.float:
      case bitloopsPrimitives.int32:
      case bitloopsPrimitives.int64:
      case bitloopsPrimitives.uint32:
      case bitloopsPrimitives.uint64:
      case bitloopsPrimitives.sint32:
      case bitloopsPrimitives.sint64:
      case bitloopsPrimitives.fixed32:
      case bitloopsPrimitives.fixed64:
      case bitloopsPrimitives.sfixed32:
      case bitloopsPrimitives.sfixed64: {
        return 'number';
      }
      case bitloopsPrimitives.bytes:
        return 'Uint8Array';
      case bitloopsPrimitives.regex: {
        return 'RegExp';
      }
      case bitloopsPrimitives.void: {
        return 'void';
      }
      default: {
        throw new Error(`Invalid primitive type: ${type}`);
      }
    }
  },
};
