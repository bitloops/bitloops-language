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

import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { TVariables, TProps, TPropsIdentifier, TVariable } from '../../../src/types.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { isIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { errorCases, validMultiplePropsTestCases, validPropsTestCases } from './mocks/props.js';
import { PropsDeclarationBuilder } from './builders/propsDeclaration.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Props declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validPropsTestCases.forEach((testProps) => {
    test(`${testProps.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testProps.fileId,
            fileContents: testProps.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = getExpectedPropsOutput(
        { fields: testProps.variables },
        testProps.identifier,
      );
      const propsNodes = resultTree.getRootChildrenNodesByType(BitloopsTypesMapping.TProps);
      const value = propsNodes[0].getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Props declaration with multiple props is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validMultiplePropsTestCases.forEach((testProps) => {
    test(`${testProps.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testProps.fileId,
            fileContents: testProps.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = getExpectedPropsOutputMultipleProps([
        { variables: testProps.variables[0], identifier: testProps.identifier[0] },
        { variables: testProps.variables[1], identifier: testProps.identifier[1] },
      ]);
      const propsNodes = resultTree.getRootChildrenNodesByType(BitloopsTypesMapping.TProps);
      const values = propsNodes.map((node) => node.getValue());

      expect(values).toMatchObject(expectedNodeValues);
    });
  });
});

describe('Props declaration is invalid', () => {
  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();
  errorCases.forEach((testProps) => {
    test(`${testProps.description}`, () => {
      const res = function (): void {
        const initialModelOutput = parser.parse({
          core: [
            {
              boundedContext: BOUNDED_CONTEXT,
              module: MODULE,
              fileId: testProps.fileId,
              fileContents: testProps.inputBLString,
            },
          ],
        });

        if (!isParserErrors(initialModelOutput)) {
          intermediateParser.parse(initialModelOutput);
        }
      };

      expect(res).toThrow(TypeError);
    });
  });
});

const getExpectedPropsOutput = (variables: TVariables, identifier: TPropsIdentifier): TProps => {
  const propsValue = new PropsDeclarationBuilder()
    .withIdentifier(identifier)
    .withVariables(variables)
    .build();

  return propsValue;
};

type multipleProps = { variables: TVariable[]; identifier: TPropsIdentifier }[];

const getExpectedPropsOutputMultipleProps = (props: multipleProps) => {
  const resultProps = [];
  for (const { identifier, variables } of props) {
    const propsValue = new PropsDeclarationBuilder()
      .withIdentifier(identifier)
      .withVariables({ fields: variables })
      .build();
    resultProps.push(propsValue);
  }

  return resultProps;
};
