import { decode } from 'bitloops-gherkin';
import { defineFeature, loadFeature } from 'jest-cucumber';
// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';
import {
  BitloopsIntermediateASTParser,
  BitloopsLanguageAST,
  BitloopsParser,
  BitloopsParserError,
} from '../../../src/index.js';

const feature = loadFeature(
  './__tests__/features/bitloopsLanguageToModel/modelFragments/applicationError.feature',
);
let blString: string;
const BOUNDED_CONTEXT = 'Hello World';
let res: any;
const MODULE = 'core';

defineFeature(feature, (test) => {
  test.only('applicationError is valid', ({ given, when, then }) => {
    given(/^A valid application error string (.*)$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      res = parseBitloops(BOUNDED_CONTEXT, MODULE, {}, blString);
    });

    then(/^I should get the right model (.*)$/, (arg0) => {
      const correctOutput = decode(arg0);
      expect(res).toEqual(JSON.parse(correctOutput));
      // expect(res).toEqual(expectedModels[example_count]);
    });
  });
  test('applicationError is invalid', ({ given, when, then }) => {
    given(/^An invalid application error string (.*)$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      res = function (): void {
        parseBitloops(BOUNDED_CONTEXT, MODULE, {}, blString);
      };
    });

    then('I should get an error', () => {
      expect(res).toThrow(TypeError);
    });
  });
});
