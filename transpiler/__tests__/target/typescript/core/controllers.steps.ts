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
// import { modelToTargetLanguage } from '../../../src/functions/modelToTargetLanguage/index.js';
// import { ControllerTypeOfDefinition, ISetupData } from '../../../src/types.js';
import { decode } from 'bitloops-gherkin';
// import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';
import { ISetupData, ControllerTypeOfDefinition } from '../../../../src/types.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

const feature = loadFeature('__tests__/target/typescript/core/controllers.feature');

defineFeature(feature, (test) => {
  let language;
  // let propsType;
  let result;
  let value;
  let serverType;
  let intermediateAST;
  const classType = ClassTypes.Controllers;
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;

  // TODO fix new lines expected in output & use bitloops-gherkin
  test('Controllers success to Typescript', ({ given, and, when, then }) => {
    given(/^type is "(.*)"$/, () => {
      // propsType = type;
    });

    and(/^language is "(.*)"$/, (lang) => {
      language = lang;
    });

    given(
      /^I have some controllers (.*) and (.*) of Controller in setup$/,
      (controllers, encodedServerType) => {
        value = decode(controllers);
        serverType = decode(encodedServerType);
        intermediateAST = {
          [boundedContext]: { [module]: { [classType]: JSON.parse(value) } },
        };
      },
    );

    when('I generate the code', () => {
      // const contextData = { boundedContext: 'hello', module: 'hello' };

      // TODO for all controllers
      const propsValue = JSON.parse(value);
      const controllerNames = Object.keys(propsValue);

      const setupData: ISetupData = {
        controllers: {
          [boundedContext]: {
            [module]: {},
          },
        },
      };

      for (const controllerName of controllerNames) {
        setupData.controllers[boundedContext][module][controllerName] = {
          type: ControllerTypeOfDefinition.REST,
          method: 'get',
          serverType: serverType,
          instances: [
            {
              url: '/',
              controllerInstance: 'helloController',
              dependencies: [],
            },
          ],
        };
      }

      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      const outputRes = decode(output);
      const formattedOutput = formatString(outputRes, formatterConfig);
      const expectedOutput = [
        {
          boundedContext,
          className: 'HelloWorldController', //TODO get from feature params
          module,
          classType,
          fileContent: formattedOutput,
        },
      ];

      expect(result).toMatchObject(expectedOutput);
    });
  });
});
