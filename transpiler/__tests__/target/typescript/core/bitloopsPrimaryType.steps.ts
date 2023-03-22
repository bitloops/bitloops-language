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
import { BitloopsTypesMapping } from '../../../../src/helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';
import { VALID_PRIMARY_TYPE_TEST_CASES } from './mocks/bitloopsPrimaryType.js';

describe('Valid bitloops primary type test cases', () => {
  VALID_PRIMARY_TYPE_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const input = testCase.bitloopsPrimaryType;

      // when
      const result = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: input.getValue(),
      });

      //then
      expect(result.output).toEqual(testCase.output);
    });
  });
});
