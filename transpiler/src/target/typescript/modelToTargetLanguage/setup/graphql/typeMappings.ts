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
const mapBitloopsPrimitiveToGraphQL = (type: string, optional?: boolean): string => {
  // TODO how we define arrays and objects
  let result = '';

  switch (type) {
    case 'string': {
      result = 'String';
      break;
    }
    case 'bool': {
      result = 'Boolean';
      break;
    }
    case 'double':
    case 'float': {
      result = 'Float';
      break;
    }
    case 'int32':
    case 'int64':
    case 'uint32':
    case 'uint64':
    case 'sint32':
    case 'sint64':
    case 'fixed32':
    case 'fixed64':
    case 'sfixed32':
    case 'sfixed64': {
      result = 'Int';
      break;
    }
    // 'bytes',
    // 'enum',
    // 'Timestamp',
    // 'Any',
    // 'Struct',
    // 'Map',
    // 'NullValue',
    // 'Duration',
    default: {
      throw new Error(`Invalid primitive type: ${type}`);
    }
  }
  return result + (optional ? '' : '!');
};
export { mapBitloopsPrimitiveToGraphQL };
