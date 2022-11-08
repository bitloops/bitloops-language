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

const feature = loadFeature('__tests__/target/typescript/core/errorEvaluation.feature');

defineFeature(feature, (test) => {
  test('Error Evaluation for all possible types', ({ given, and, when, then }) => {
    let errorEvaluationType;
    let result;
    let value;
    given(/^type is "(.*)"$/, (arg0) => {
      errorEvaluationType = arg0;
    });

    and(/^language is "(.*)"$/, (_arg0) => {});

    given(/^I have a errorEvaluation (.*)$/, (arg0) => {
      value = arg0;
    });

    when('I generate the code', () => {
      const regularEvaluationValue = JSON.parse(value);
      result = modelToTargetLanguage({
        type: errorEvaluationType,
        value: regularEvaluationValue,
      });
    });

    then(
      /^I should see the (.*) code with the corresponding dependencies (.*)$/,
      (output, dependencies) => {
        expect(result.output).toEqual(output);
        expect(result.dependencies).toEqual(JSON.parse(dependencies));
      },
    );
  });
});
