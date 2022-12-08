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
// import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

import { TBoundedContexts, TContextData } from './../../../../src/types.js';
import { TBitloopsOutputTargetContent } from '../../../../src/target/types.js';
const feature = loadFeature('./__tests__/target/typescript/core/repoPortDeclaration.feature');

defineFeature(feature, (test) => {
  let result: TBitloopsOutputTargetContent;
  let value;
  let bitloopsModel: TBoundedContexts;
  let contextData: TContextData;
  let intermediateAST;
  const repoPortsClassType = ClassTypes.RepoPort;
  const formatterConfig = null;
  let language;

  test('Repo ports success to Typescript', ({ given, when, then }) => {
    // given(/^type
    //   propsType = type;
    // });

    given(/^language is "(.*)"$/, (_lang) => {
      language = _lang;
    });

    given(/^I have some repo ports (.*), (.*), (.*)$/, (arg0, arg1, arg2) => {
      value = d(arg0);
      bitloopsModel = JSON.parse(d(arg1));
      contextData = JSON.parse(d(arg2));
    });

    when('I generate the code', () => {
      const propsValue = JSON.parse(value);
      const boundedContext = contextData.boundedContext;
      const module = contextData.module;

      const extraInfo = bitloopsModel[boundedContext][module];
      intermediateAST = {
        [boundedContext]: {
          [module]: {
            [repoPortsClassType]: propsValue,
            ...extraInfo,
          },
        },
      };
      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      output = formatString(d(output), formatterConfig);

      expect(result[0].fileContent).toEqual(output);
    });
  });
});
