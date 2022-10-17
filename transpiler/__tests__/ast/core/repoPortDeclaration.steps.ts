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
import { d } from 'bitloops-gherkin';
import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';

const feature = loadFeature(
  './__tests__/features/bitloopsLanguageToModel/modelFragments/repoPortDeclaration.feature',
);

defineFeature(feature, (test) => {
  let boundedContext: string;
  let module: string;
  let blString: string;
  let useCases: any = {};
  let modelOutput: string;
  let result: any;
  test('Repo port declaration is valid', ({ given, when, then }) => {
    given(
      /^Valid bounded context (.*), module (.*), Port declaration (.*) strings$/,
      (arg0, arg1, arg2) => {
        boundedContext = d(arg0);
        module = d(arg1);
        blString = d(arg2);
      },
    );

    when('I generate the model', () => {
      // TODO fix test when useCase is ready
      useCases = [];
      result = parseBitloops(boundedContext, module, useCases, blString);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });
});
