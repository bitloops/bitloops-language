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
import { BitloopsTargetGenerator } from '../../../src/target/index.js';
import { modelToTargetLanguage } from '../../../src/target/typescript/core/modelToTargetLanguage.js';

const feature = loadFeature('__tests__/target/core/targetGenerator.feature');

defineFeature(feature, (test) => {
  let targetLanguage;
  let intermediateAST;
  let formatterConfig;
  let setupData;
  let result;

  test('Generate successfully in target language', ({ given, and, when, then }) => {
    given(/^A valid intermediateAST (.*)$/, (arg0) => {
      intermediateAST = d(arg0);
    });

    and(/^target language is (.*)$/, (arg0) => {
      targetLanguage = d(arg0);
    });

    and(/^formatterConfig is (.*)$/, (arg0) => {
      formatterConfig = d(arg0);
    });

    and(/^setupData is (.*)$/, (arg0) => {
      setupData = d(arg0);
    });

    when('I generate to target language', () => {
      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage,
        setupData,
      });
    });

    then(/^I should get the correct target output (.*)$/, (output) => {
      expect(result).toEqual(d(output));
    });
  });
});
