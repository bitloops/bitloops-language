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

import { BitloopsIntermediateASTParser, BitloopsParser } from '../../../src/index.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import {
  validAdditiveExpressionTestCases,
  validArrayLiteralExpressionTestCases,
  validAssignmentExpressionTestCases,
  validEqualityExpressionTestCases,
  validExpressionIdentifierTestCases,
  validExpressionLiteralTestCases,
  validLogicalAndExpressionTestCases,
  validLogicalOrExpressionTestCases,
  validMemberDotExpressionTestCases,
  validMultiplicativeExpressionTestCases,
  validRelationalExpressionTestCases,
  validXorExpressionTestCases,
  generalExpressionTestCases,
  validMethodCallTestCases,
} from './mocks/expression.js';
import { isBitloopsParserError } from '../../../src/parser/core/guards/index.js';
import { isBitloopsIntermediateASTError } from '../../../src/ast/core/guards/index.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Expression is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  generalExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Method call invocation', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validMethodCallTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Literal is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validExpressionLiteralTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Identifier is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validExpressionIdentifierTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Member dot expression test cases', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validMemberDotExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Assignment expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validAssignmentExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Array literal expression test cases', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validArrayLiteralExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Additive expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validAdditiveExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Multiplicative Expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validMultiplicativeExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Relational Expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validRelationalExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
describe('Equality expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validEqualityExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
describe('Logical And Expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validLogicalAndExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
describe('Logical Or Expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validLogicalOrExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Logical XOR Expression', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validXorExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
