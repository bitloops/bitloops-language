import { decode } from 'bitloops-gherkin';
import { defineFeature, loadFeature } from 'jest-cucumber';

import {
  BitloopsIntermediateASTParser,
  BitloopsParser,
  BitloopsParserError,
  BitloopsLanguageASTContext,
} from '../../../src/index.js';

const feature = loadFeature('./__tests__/ast/core/applicationError.feature');

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
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        res = intermediateParser.parse(initialModelOutput as unknown as BitloopsLanguageASTContext);
      }
    });

    then(/^I should get the right model (.*)$/, (arg0) => {
      const correctOutput = decode(arg0);
      expect(res).toEqual(JSON.parse(correctOutput));
    });
  });
  test('applicationError is invalid', ({ given, when, then }) => {
    given(/^An invalid application error string (.*)$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      res = function (): void {
        // parseBitloops(BOUNDED_CONTEXT, MODULE, {});
      };
    });

    then('I should get an error', () => {
      expect(res).toThrow(TypeError);
    });
  });
});
