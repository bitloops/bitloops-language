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
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { ISetupData } from '../../../../src/types.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

const feature = loadFeature('__tests__/target/typescript/core/valueObjects.feature');

defineFeature(feature, (test) => {
  let language;
  let result;
  let value;
  let intermediateAST;
  let props;
  const valueObjectClassType = ClassTypes.ValueObjects;
  const propsClassType = ClassTypes.Props;

  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;

  test('Value Object success to Typescript', ({ given, when, then }) => {
    given(/^language is "(.*)"$/, (arg0) => {
      language = arg0;
    });

    given(/^I have some value objects (.*) and props (.*)$/, (valueObject, inputProps) => {
      value = d(valueObject);
      props = d(inputProps);
      intermediateAST = {
        [boundedContext]: {
          [module]: {
            [valueObjectClassType]: JSON.parse(value),
            [propsClassType]: JSON.parse(props),
          },
        },
      };
    });

    when('I generate the code', () => {
      const setupData: ISetupData = {
        controllers: {
          [boundedContext]: {
            [module]: {},
          },
        },
      };
      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData,
      });
    });

    then(/^I should see the output VOs (.*) and outputProps (.*)$/, (outputVOs, outputProps) => {
      const classNamesContent = JSON.parse(d(outputVOs));

      const expectedOutput = [];
      for (const [className, content] of Object.entries(classNamesContent)) {
        const formattedOutput = formatString(content as string, formatterConfig);
        expectedOutput.push({
          boundedContext,
          className,
          module,
          classType: valueObjectClassType,
          fileContent: formattedOutput,
        });
      }
      // add props to the expected result too
      const propsContent = formatString(d(outputProps), formatterConfig);
      const propsName = Object.keys(JSON.parse(props))[0];
      expectedOutput.push({
        boundedContext,
        className: propsName,
        module,
        classType: propsClassType,
        fileContent: propsContent,
      });

      expect(result).toEqual(expectedOutput);
    });
  });
});
