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
import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';
import { decode } from 'bitloops-gherkin';

const feature = loadFeature(
  './__tests__/features/bitloopsLanguageToModel/modelFragments/domainRuleDeclaration.feature',
);

defineFeature(feature, (test) => {
  test.skip('Rule declaration is valid', ({ given, when, then }) => {
    let boundedContext: string;
    let module: string;
    let blString: string;
    let modelOutput: string;
    let result: any;
    given(/^Valid bounded context (.*), module (.*), rule (.*) strings$/, (arg0, arg1, arg2) => {
      boundedContext = decode(arg0);
      module = decode(arg1);
      blString = decode(arg2);
    });

    when('I generate the model', () => {
      result = parseBitloops(boundedContext, module, {}, blString);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = decode(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });
});
