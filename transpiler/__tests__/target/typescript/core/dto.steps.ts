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
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { DTONodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/DTO/DTONodeBuilder.js';
import { IntermediateASTTree } from '../../../../src/refactoring-arch/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/refactoring-arch/intermediate-ast/nodes/RootNode.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';
import { VALID_DTO_TEST_CASES, VALID_TWO_DTOS_TEST_CASES } from './mocks/dto.js';

describe('Valid DTO with fields to Typescript', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = ClassTypes.DTOs;
  const formatterConfig = null;
  const language = 'TypeScript';

  VALID_DTO_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const dtoNode = new DTONodeBuilder(tree)
        .withIdentifier(testCase.dtoIdentifierNode)
        .withVariables(testCase.fieldListNode)
        .build();

      const intermediateAST = {
        [boundedContext]: { [module]: tree },
      };

      // when
      const targetGenerator = new BitloopsTargetGenerator();
      const result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });

      //then
      const formattedOutput = formatString(testCase.output as string, formatterConfig);
      const expectedOutput = [
        {
          boundedContext,
          className: dtoNode.getClassName(),
          module,
          classType,
          fileContent: formattedOutput,
        },
      ];
      expect(result).toEqual(expectedOutput);
    });
  });
});

describe('Valid two DTOs with fields to Typescript', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = ClassTypes.DTOs;
  const formatterConfig = null;
  const language = 'TypeScript';

  VALID_TWO_DTOS_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const dtoNode = new DTONodeBuilder(tree)
        .withIdentifier(testCase.dtoIdentifierNode)
        .withVariables(testCase.fieldListNode)
        .build();
      const secondDTONode = new DTONodeBuilder(tree)
        .withIdentifier(testCase.secondDTOIdentifierNode)
        .withVariables(testCase.secondFieldListNode)
        .build();

      const intermediateAST = {
        [boundedContext]: { [module]: tree },
      };

      // when
      const targetGenerator = new BitloopsTargetGenerator();
      const result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });

      // then
      const formattedOutput = formatString(testCase.output as string, formatterConfig);
      const formattedSecondOutput = formatString(testCase.secondOutput as string, formatterConfig);
      const expectedOutput = [
        {
          boundedContext,
          className: dtoNode.getClassName(),
          module,
          classType,
          fileContent: formattedOutput,
        },
        {
          boundedContext,
          className: secondDTONode.getClassName(),
          module,
          classType,
          fileContent: formattedSecondOutput,
        },
      ];
      expect(result).toEqual(expectedOutput);
    });
  });
});
