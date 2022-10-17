import { defineFeature, loadFeature } from 'jest-cucumber';
// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/BitloopsParser.js';
import expectedModels from '../../../../src/examples/domainError.js';
// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/BitloopsParser.js';
import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';

const feature = loadFeature(
  './__tests__/features/bitloopsLanguageToModel/modelFragments/domainError.feature',
);
let example_count = 0;
let blString: string;
const BOUNDED_CONTEXT = 'Hello World';
let res: any;
const MODULE = 'core';

afterEach(() => {
  example_count++;
});
defineFeature(feature, (test) => {
  test('domainError is valid', ({ given, when, then }) => {
    given(/^A valid domain error string (.*)$/, (arg0) => {
      blString = arg0;
    });

    when('I generate the model', () => {
      res = parseBitloops(BOUNDED_CONTEXT, MODULE, {}, blString);
    });

    then('I should get the right model', () => {
      expect(res).toEqual(expectedModels[example_count]);
    });
  });
  test('domainError is invalid', ({ given, when, then }) => {
    given(/^An invalid domain error string (.*)$/, (arg0) => {
      blString = arg0;
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
