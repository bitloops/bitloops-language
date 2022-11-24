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
import { decode, d } from 'bitloops-gherkin';

import {
  BitloopsIntermediateASTParser,
  BitloopsLanguageASTContext,
  BitloopsParser,
  BitloopsParserError,
} from '../../../src/index.js';

const feature = loadFeature('__tests__/ast/core/expression.feature');

defineFeature(feature, (test) => {
  test('Expression is valid', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^A valid expression (.*) string$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext,
          module,
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageASTContext,
        );
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test('Method call valid', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^A valid method call (.*) string$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext,
          module,
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageASTContext,
        );
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test('Literal is valid', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^A valid literal (.*) string$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext,
          module,
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageASTContext,
        );
        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
        console.log({ result });
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test('Member dot expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^A valid dot expression (.*) string$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext,
          module,
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageASTContext,
        );
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test.only('Array Literal expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^An array literal expression (.*) string$/, (arg0) => {
      blString = decode(arg0);
    });

    when('I generate the model', () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext,
          module,
          fileId: 'testFile.bl',
          fileContents: blString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageASTContext,
        );

        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
        console.log({ result });
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });
});
