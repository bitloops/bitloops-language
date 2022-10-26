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
import { decode } from 'bitloops-gherkin';
import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';

const feature = loadFeature('__tests__/target/typescript/core/packages.feature');

defineFeature(feature, (test) => {
  let packagesType;
  let result;
  let value;
  test('Valid Packages Without Adapters', ({ given, and, when, then }) => {
    given(/^type is "(.*)"$/, (type) => {
      packagesType = type;
    });

    and(/^language is "(.*)"$/, (_lang) => {});

    given(/^I have a packages (.*)$/, (packages) => {
      value = decode(packages);
    });

    when('I generate the code', () => {
      result = modelToTargetLanguage({
        type: packagesType,
        value: JSON.parse(value),
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      expect(result.output).toEqual(decode(output));
    });
  });
});
