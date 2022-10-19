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
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TEvaluatePrimitive } from '../../../../../types.js';

export const primitiveEvaluationToTargetLanguage = (
  variable: TEvaluatePrimitive,
  targetLanguage: string,
): string => {
  const argDependencyLangMapping: Record<string, (variable: TEvaluatePrimitive) => string> = {
    [SupportedLanguages.TypeScript]: (variable: TEvaluatePrimitive) => {
      switch (variable.type) {
        case 'string': {
          return `'${variable.value}'`;
        }
        case 'bool': {
          if (variable.value !== 'true' && variable.value !== 'false') {
            throw new Error(`Invalid boolean value: ${variable.value}`);
          }
          return variable.value;
        }
        case 'double':
        case 'float':
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
          // TODO remove number
          return `${+variable.value}`;
        }

        case 'void':
          return 'void';

        // 'bytes',
        // 'enum',
        // 'Timestamp',
        // 'Any',
        // 'Struct',
        // 'Map',
        // 'NullValue',
        // 'Duration',
        default: {
          throw new Error(`Invalid primitive type: ${variable.type}`);
        }
      }
    },
  };
  return argDependencyLangMapping[targetLanguage](variable);
};
