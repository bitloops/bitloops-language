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
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTParserError } from '../../../src/ast/core/types.js';

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

        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
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
        result = intermediateParser.parse(initialModelOutput);

        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
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
        result = intermediateParser.parse(initialModelOutput);
        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test('Identifier expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^A valid identifier (.*) string$/, (arg0) => {
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
        result = intermediateParser.parse(initialModelOutput);
        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
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
        result = intermediateParser.parse(initialModelOutput);

        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test('Assignment expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let result;

    given(/^A valid assignment expression (.*) string$/, (arg0) => {
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
        result = intermediateParser.parse(initialModelOutput);

        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });

  test('Array Literal expression', ({ given, when, then }) => {
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
      }
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(result).toEqual(JSON.parse(modelOutput));
    });
  });
  test('Additive Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^An additive expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(initialModelOutput as any);

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });

  test('Multiplicative Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^A multiplicative expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(initialModelOutput as any);

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });
  test('Relational Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^A relational expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(initialModelOutput as any);

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });
  test('Equality Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^An equality expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(
        initialModelOutput as unknown as BitloopsLanguageASTContext,
      );

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });
  test('Logical And Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^A logical and expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(
        initialModelOutput as unknown as BitloopsLanguageASTContext,
      );

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });
  test('Logical Or Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^A logical or expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(
        initialModelOutput as unknown as BitloopsLanguageASTContext,
      );

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });
  test('Logical Xor Expression', ({ given, when, then }) => {
    const boundedContext = 'Hello World';
    const module = 'core';
    let blString;
    let modelOutput;
    let actualNodes;
    let result;
    let resultTree: IntermediateASTTree;

    given(/^A logical xor expression (.*) string$/, (arg0) => {
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
      result = intermediateParser.parse(
        initialModelOutput as unknown as BitloopsLanguageASTContext,
      );

      if (result instanceof IntermediateASTParserError) {
        throw result;
      }
      resultTree = result[boundedContext][module];
      actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TExpression);
    });

    then(/^I should get (.*)$/, (arg0) => {
      modelOutput = d(arg0);
      expect(actualNodes[0].getValue()).toMatchObject(JSON.parse(modelOutput));
    });
  });
});
