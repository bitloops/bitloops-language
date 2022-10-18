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
  BitloopsSetupParser,
  BitloopsLanguageSetupAST,
  BitloopsSetupParserError,
  BitloopsIntermediateSetupASTParser,
  BitloopsIntermediateSetupASTParserError,
} from '../../../../src/index.js';

import { BitloopsTargetGenerator } from '../../../../src/target/index.js';

import { ISetupData, TBitloopsTargetSetupContent } from '../../../../src/types.js';
import { BitloopsTargetGeneratorError } from '../../../../src/target/BitloopsTargetGeneratorError.js';

const feature = loadFeature('__tests__/target/typescript/setup/setup.feature');

defineFeature(feature, (test) => {
  let setupBl: string;
  let intermediateResult: ISetupData | BitloopsIntermediateSetupASTParserError;
  let result: TBitloopsTargetSetupContent | BitloopsTargetGeneratorError;

  test('Valid Setup Generation', ({ given, when, then }) => {
    given(/^Valid setup file contents are provider (.*)$/, (blString) => {
      setupBl = d(blString);
    });

    when('I generate the files', () => {
      const parser = new BitloopsSetupParser();
      const initialModelOutput = parser.parse(setupBl);
      const intermediateParser = new BitloopsIntermediateSetupASTParser();
      if (!(initialModelOutput instanceof BitloopsSetupParserError)) {
        intermediateResult = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageSetupAST,
        );
        const btg = new BitloopsTargetGenerator();
        result = btg.generateSetup({
          setupData: intermediateResult as ISetupData,
          intermediateAST: {},
          targetLanguage: 'typescript',
        });
      }
    });

    then(/^I should get (.*)$/, (output) => {
      const expectedOutput = d(output);
      expect(result).toEqual(expectedOutput);
    });
  });
});
