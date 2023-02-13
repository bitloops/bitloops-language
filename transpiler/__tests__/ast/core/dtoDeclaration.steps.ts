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
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { TDTOIdentifier, TVariables, TVariable } from '../../../src/types.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DTODeclarationBuilder } from './builders/dtoDeclaration.js';
import { errorCases, validDTOTestCases, validMultipleDTOSTestCases } from './mocks/dto.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { isIntermediateASTValidationErrors } from '../../../src/ast/core/guards/index.js';
import { ParserSyntacticError } from '../../../src/parser/core/types.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('DTO declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validDTOTestCases.forEach((testDTO) => {
    test(`${testDTO.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testDTO.fileId,
            fileContents: testDTO.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTValidationErrors(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = getExpectedDTOOutput(
        { fields: testDTO.variables },
        testDTO.identifier,
      );
      const dtoNodes = resultTree.getRootChildrenNodesByType(BitloopsTypesMapping.TDTO);
      const value = dtoNodes[0].getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

describe('DTO declaration with multiple dtos is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validMultipleDTOSTestCases.forEach((testDTO) => {
    test(`${testDTO.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testDTO.fileId,
            fileContents: testDTO.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTValidationErrors(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = getExpectedDTOOutputMultipleDTOS([
        { variables: testDTO.variables[0], identifier: testDTO.identifier[0] },
        { variables: testDTO.variables[1], identifier: testDTO.identifier[1] },
      ]);
      const dtoNodes = resultTree.getRootChildrenNodesByType(BitloopsTypesMapping.TDTO);
      const values = dtoNodes.map((node) => node.getValue());

      expect(values).toMatchObject(expectedNodeValues);
    });
  });
});

describe('DTO declaration is invalid', () => {
  const parser = new BitloopsParser();
  errorCases.forEach((testDTO) => {
    test(`${testDTO.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testDTO.fileId,
            fileContents: testDTO.inputBLString,
          },
        ],
      });

      expect(Array.isArray(initialModelOutput)).toBeTruthy();

      if (!isParserErrors(initialModelOutput)) {
        throw new Error('Parser should return errors');
      }
      initialModelOutput.forEach((error) => {
        expect(error).toBeInstanceOf(ParserSyntacticError);
      });
    });
  });
});

const getExpectedDTOOutput = (variables: TVariables, identifier: TDTOIdentifier) => {
  const dtoValue = new DTODeclarationBuilder()
    .withIdentifier(identifier)
    .withVariables(variables)
    .build();

  return dtoValue;
};

type multipleDTOS = { variables: TVariable[]; identifier: TDTOIdentifier }[];

const getExpectedDTOOutputMultipleDTOS = (dtos: multipleDTOS) => {
  const resultDTOS = [];
  for (const { identifier, variables } of dtos) {
    const dtoValue = new DTODeclarationBuilder()
      .withIdentifier(identifier)
      .withVariables({ fields: variables })
      .build();
    resultDTOS.push(dtoValue);
  }

  return resultDTOS;
};
