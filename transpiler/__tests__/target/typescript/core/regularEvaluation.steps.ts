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

const feature = loadFeature('__tests__/target/typescript/core/regularEvaluation.feature');

defineFeature(feature, (test) => {
  let regularEvaluationType;
  let result;
  let value;

  test('Regular Evaluation for all possible types', ({ given, and, when, then }) => {
    given(/^type is "(.*)"$/, (type) => {
      regularEvaluationType = type;
    });

    and(/^language is "(.*)"$/, (_lang) => {});

    given(/^I have a regularEvaluation (.*)$/, (regularEvaluation) => {
      value = regularEvaluation;
    });

    when('I generate the code', () => {
      const regularEvaluationValue = JSON.parse(value);
      result = modelToTargetLanguage({
        type: regularEvaluationType,
        value: regularEvaluationValue,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      expect(result.output).toEqual(output);
    });
  });

  test('Invalid boolean value', ({ given, and, when, then }) => {
    given(/^type is "(.*)"$/, (type) => {
      regularEvaluationType = type;
    });

    and(/^language is "(.*)"$/, (_lang) => {});

    given(/^I have a (.*) with invalid (.*)$/, (regularEvaluation) => {
      value = regularEvaluation;
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    when('I generate the code', () => {});

    then(
      /^I should get an error saying that (.*) has invalid (.*)$/,
      (regularEvaluation, boolean) => {
        const regularEvaluationValue = JSON.parse(regularEvaluation);
        expect(() =>
          modelToTargetLanguage({
            type: regularEvaluationType,
            value: regularEvaluationValue,
          }),
        ).toThrowError(`Invalid boolean value: ${boolean}`);
      },
    );
  });
});
