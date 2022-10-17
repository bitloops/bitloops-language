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

import { defineFeature, loadFeature } from 'jest-cucumber';
import {
  getClassesBLStrings,
  TBitloopsClassesResult,
} from '../../../src/functions/bitloopsLanguageToModel/getClassesBLStrings.js';

const feature = loadFeature(
  './__tests__/features/bitloopsLanguageToModel/getClassesBLStrings.feature',
);

defineFeature(feature, (test) => {
  test('Empty string sent', ({ given, when, then }) => {
    let result: TBitloopsClassesResult;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    given('I am sending an empty string', () => {});

    when('I call the function', () => {
      result = getClassesBLStrings('');
    });

    then('I should get an empty array "[]"', () => {
      expect(result).toEqual([]);
    });
  });

  test('No classes found in string', ({ given, when, then }) => {
    let result: TBitloopsClassesResult;
    let wholeString = '';
    given(/^I am sending a string (.*) that doesn't contain any Bitloops classes$/, (string) => {
      wholeString = string;
    });

    when('I call the function', () => {
      result = getClassesBLStrings(wholeString);
    });

    then('I should get an empty array "[]"', () => {
      expect(result).toEqual([]);
    });
  });

  test('Class found in string', ({ given, when, then }) => {
    let result: TBitloopsClassesResult;
    let wholeString: { input: string; output: string };
    given(/^I am sending a string that contains one Bitloops class$/, (docString) => {
      const docStringArray = JSON.parse(docString);
      wholeString = { input: docStringArray[0], output: docStringArray[1] };
    });

    when('I call the function', () => {
      result = getClassesBLStrings(wholeString.input);
    });

    then('I should get a populated array with the expected class', () => {
      expect(result).toEqual(JSON.parse(wholeString.output));
    });
  });

  test('Multiple classes found in string', ({ given, when, then }) => {
    let result: TBitloopsClassesResult;
    let wholeString: { input: string; output: string };
    given(/^I am sending a string that contains multiple Bitloops classes$/, (docString) => {
      const docStringArray = JSON.parse(docString);
      wholeString = { input: docStringArray[0], output: docStringArray[1] };
    });

    when('I call the function', () => {
      result = getClassesBLStrings(wholeString.input);
    });

    then('I should get a populated array with the expected classes', () => {
      expect(result).toEqual(JSON.parse(wholeString.output));
    });
  });
});
