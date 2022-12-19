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
import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';

const feature = loadFeature('__tests__/target/typescript/core/returnOkErrorType.feature');

// TODO check with optional error too
defineFeature(feature, (test) => {
  let propsType;
  let result;
  let value;

  test('Return OK Error type success to Typescript', ({ given, and, when, then }) => {
    given(/^type is "(.*)"$/, (type) => {
      propsType = type;
    });

    given(/^I have a return type (.*)$/, (returnType) => {
      value = returnType;
    });

    when('I generate the code', () => {
      const propsValue = JSON.parse(value);
      result = modelToTargetLanguage({
        type: propsType,
        value: propsValue,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      expect(result.output).toEqual(output);
    });
  });

  test('Return OK Error type unsuccessful', ({ given, and, when, then }) => {
    given(/^type is "(.*)"$/, (type) => {
      propsType = type;
    });

    given(/^I have a return type (.*)$/, (returnType) => {
      value = returnType;
    });

    when('I generate the code', () => {
      const propsValue = JSON.parse(value);
      result = () => {
        modelToTargetLanguage({
          type: propsType,
          value: propsValue,
        });
      };
    });

    then(/^I should see the (.*)$/, (error) => {
      expect(result).toThrow(error);
    });
  });
});
