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
import { DTONodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/DTO/DTONodeBuilder.js';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { TargetGenerator } from '../../../../src/target/index.js';
import { VALID_DTO_TEST_CASES, VALID_TWO_DTOS_TEST_CASES } from './mocks/dto.js';
import { TTargetCoreFinalContent } from '../../../../src/target/types.js';
import { SupportedLanguages } from '../../../../src/target/supportedLanguages.js';
import { formatString } from '../../../../src/target/typescript-nest/core/codeFormatting.js';
import { isTargetGeneratorError } from '../../../../src/target/typescript-nest/guards/index.js';

describe('Valid DTO with fields to Typescript', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = ClassTypes.DTO;
  const formatterConfig = null;
  const language = SupportedLanguages.TypeScriptNest;

  VALID_DTO_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      let resultCore: TTargetCoreFinalContent[];

      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const dtoNode = new DTONodeBuilder(tree)
        .withIdentifier(testCase.dtoIdentifierNode)
        .withVariables(testCase.fieldListNode)
        .build();

      const intermediateAST = {
        core: { [boundedContext]: { [module]: tree } },
      };

      // when
      const targetGenerator = new TargetGenerator();
      const result = targetGenerator.generate(intermediateAST, {
        formatterConfig,
        targetLanguage: language,
        // setupData: null,
      });

      if (!isTargetGeneratorError(result)) {
        resultCore = result.core;
      }

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
      expect(resultCore).toEqual(expectedOutput);
    });
  });
});

describe('Valid two DTOs with fields to Typescript', () => {
  let resultCore: TTargetCoreFinalContent[];

  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = ClassTypes.DTO;
  const formatterConfig = null;
  const language = SupportedLanguages.TypeScriptNest;

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
        core: { [boundedContext]: { [module]: tree } },
      };

      // when
      const targetGenerator = new TargetGenerator();
      const result = targetGenerator.generate(intermediateAST, {
        formatterConfig,
        targetLanguage: language,
        // setupData: null,
      });

      if (!isTargetGeneratorError(result)) {
        resultCore = result.core;
      }

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
      expect(resultCore).toEqual(expectedOutput);
    });
  });
});
