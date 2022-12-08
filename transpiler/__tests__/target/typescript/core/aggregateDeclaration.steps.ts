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
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

const feature = loadFeature('./__tests__/target/typescript/core/aggregateDeclaration.feature');

defineFeature(feature, (test) => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const rootEntitiesClassType = ClassTypes.RootEntity;
  const propsClassType = ClassTypes.Props;
  const formatterConfig = null;
  let valueProps;
  let language;
  let result;
  let intermediateAST;

  test('Aggregates are valid', ({ given, when, then }) => {
    given(/^language is "(.*)"$/, (lang) => {
      language = lang;
    });

    given(/^I have aggregates (.*) and props (.*)$/, (aggregates, props) => {
      const rootEntities = JSON.parse(d(aggregates));
      valueProps = JSON.parse(d(props));

      intermediateAST = {
        [boundedContext]: {
          [module]: {
            [rootEntitiesClassType]: rootEntities,
            [propsClassType]: valueProps,
          },
        },
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

    then(
      /^I should see the outputAggregates (.*) and outputProps (.*)$/,
      (outputAggregates, outputProps) => {
        const classNamesContent = JSON.parse(d(outputAggregates));
        const expectedOutput = [];
        for (const [className, content] of Object.entries(classNamesContent)) {
          const formattedOutput = formatString(content as string, formatterConfig);
          expectedOutput.push({
            boundedContext,
            className,
            module,
            classType: rootEntitiesClassType,
            fileContent: formattedOutput,
          });
        }
        const propsContent = formatString(d(outputProps), formatterConfig);
        const propsName = Object.keys(valueProps)[0];
        expectedOutput.push({
          boundedContext,
          className: propsName,
          module,
          classType: propsClassType,
          fileContent: propsContent,
        });

        expect(result).toEqual(expectedOutput);
      },
    );
  });
});
