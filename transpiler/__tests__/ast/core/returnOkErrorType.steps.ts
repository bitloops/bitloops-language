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
import { d } from 'bitloops-gherkin';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { getTree } from '../../../../src/functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';
import { returnOkErrorType } from '../../../../src/functions/bitloopsLanguageToModel/bitloops-parser/core/bitloopsParserHelpers/returnOkErrorType.js';

const feature = loadFeature(
  './__tests__/features/bitloopsLanguageToModel/modelFragments/returnOkErrorType.feature',
);

defineFeature(feature, (test) => {
  test('Return OK Error type success', ({ given, when, then }) => {
    let blString;
    let modelOutput;
    let result;
    given(/^I have a return type (.*)$/, (arg0) => {
      blString = d(arg0);
    });

    when('I generate the model', () => {
      const subtree = getTree(blString);
      result = returnOkErrorType(subtree);
    });

    then(/^I should get the (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });
});
