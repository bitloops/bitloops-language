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
import { decode } from 'bitloops-gherkin';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';
// import { decode } from 'bitloops-gherkin';
// import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';
// import { ISetupData, ControllerTypeOfDefinition } from '../../../../src/types.js';
// import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
// import { ClassTypes } from '../../../../src/helpers/mappings.js';
// import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

const feature = loadFeature('./__tests__/target/typescript/core/domainErrors.feature');

defineFeature(feature, (test) => {
  let language: string;
  let value; // : any;
  const module = 'demo';
  const classType = ClassTypes.DomainErrors;
  const boundedContext = 'Hello world';
  let intermediateAST; // : any;
  let result; // : any;
  const formatterConfig = null;
  const domainImport = "import { Domain } from '@bitloops/bl-boilerplate-core';";

  test('DomainErrors with messages', ({ given, when, then }) => {
    given(/^language is "(.*)"$/, (arg0) => {
      language = arg0;
    });

    given(/^I have DomainErrors (.*)$/, (domainErrors) => {
      value = decode(domainErrors);
      intermediateAST = {
        [boundedContext]: { [module]: { [classType]: JSON.parse(value) } },
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
      const classNamesContent = JSON.parse(decode(output));
      const expectedOutput = [];
      for (const [className, content ] of Object.entries(classNamesContent)) {
        const formattedOutput = formatString((domainImport + content) as string, formatterConfig);
        expectedOutput.push({
          boundedContext,
          className,
          module,
          classType,
          fileContent: formattedOutput,
        });
      }
      expect(result).toEqual(expectedOutput);
    });
  });
});
