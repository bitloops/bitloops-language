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
import { BitloopsTargetGenerator } from '../../../src/target/index.js';
import { formatString } from '../../../src/target/typescript/core/codeFormatting.js';

const feature = loadFeature('__tests__/target/core/applicationErrors.feature');

defineFeature(feature, (test) => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = 'ApplicationErrors';
  const formatterConfig = null;
  let language;
  let result;
  let intermediateAST;

  test('ApplicationErrors with messages', ({ given, when, then }) => {
    given(/^language is "(.*)"$/, (lang) => {
      language = lang;
    });

    given(/^I have ApplicationErrors (.*)$/, (applicationErrors) => {
      intermediateAST = {
        [boundedContext]: { [module]: { [classType]: JSON.parse(applicationErrors) } },
      };
    });

    when('I generate the code', () => {
      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      const formattedOutput = formatString(output, formatterConfig);
      const expectedOutput = [
        {
          boundedContext,
          className: 'InvalidName', //TODO get from feature params
          module,
          classType,
          fileContent: formattedOutput,
        },
      ];

      console.log({ result });
      console.log({ expectedOutput });

      expect(result).toEqual(expectedOutput);
    });
  });
});
