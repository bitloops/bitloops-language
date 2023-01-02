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
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { isIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Expression is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  generalExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validMethodCallTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validExpressionLiteralTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validExpressionIdentifierTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validMemberDotExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validAssignmentExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validArrayLiteralExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validAdditiveExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validMultiplicativeExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validRelationalExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validEqualityExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validLogicalAndExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validLogicalOrExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
  const intermediateParser = new IntermediateASTParser();

  validXorExpressionTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = testCase.expression;
      // const expectedNodeValues = getExpectedDTOOutput(testDTO.variables, testDTO.identifier);
      const value = resultTree.getCurrentNode().getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
