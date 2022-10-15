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
import {
  BitloopsIntermediateSetupASTParser,
  BitloopsLanguageSetupAST,
  BitloopsSetupParser,
  BitloopsSetupParserError,
} from '../../../../src/index.js';

const feature = loadFeature('__tests__/ast/setup/visitor/routerDefinition.feature');

defineFeature(feature, (test) => {
  test('Valid Router Definitions', ({ given, when, then }) => {
    let blString;
    let modelOutput;
    let result;

    given(/^A valid Router Definition (.*) string$/, (arg0) => {
      blString = d(arg0);
      // console.log('blString', blString);
    });

    when('I generate the model', () => {
      const parser = new BitloopsSetupParser();
      const initialModelOutput = parser.parse(blString);
      const intermediateParser = new BitloopsIntermediateSetupASTParser();
      if (!(initialModelOutput instanceof BitloopsSetupParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageSetupAST,
        );
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toMatchObject(JSON.parse(modelOutput));
    });
  });

  test('Invalid Router Definitions', ({ given, then }) => {
    let blString;
    let initialModelOutput;
    let intermediateParser;

    given(/^An invalid Router Definition (.*) string$/, (arg0) => {
      blString = d(arg0);
      const parser = new BitloopsSetupParser();
      initialModelOutput = parser.parse(blString);
      intermediateParser = new BitloopsIntermediateSetupASTParser();
    });

    then(/^I should get an (.*) error when I generate the model$/, (arg0) => {
      const errorMessage = d(arg0);
      expect(() =>
        intermediateParser.parse(initialModelOutput as unknown as BitloopsLanguageSetupAST),
      ).toThrow(errorMessage);
    });
  });
});
