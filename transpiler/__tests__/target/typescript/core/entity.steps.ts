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
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { TargetGenerator } from '../../../../src/target/index.js';
import { SupportedLanguages } from '../../../../src/target/supportedLanguages.js';
import { TTargetCoreFinalContent } from '../../../../src/target/types.js';
import { formatString } from '../../../../src/target/typescript-nest/core/codeFormatting.js';
import { isTargetGeneratorError } from '../../../../src/target/typescript-nest/guards/index.js';
import { VALID_ENTITY_TEST_CASES } from './mocks/domain/entity.js';

describe('Entity test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = SupportedLanguages.TypeScriptNest;

  VALID_ENTITY_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      let resultCore: TTargetCoreFinalContent[];

      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const entity = testCase.entity;
      const props = testCase.props;
      const valueObjects = testCase.valueObjects;

      tree.insertChild(entity);
      for (const prop of props) {
        tree.insertSibling(prop);
      }
      if (valueObjects && valueObjects.length > 0) {
        for (const vo of valueObjects) {
          tree.insertSibling(vo);
        }
      }

      const intermediateAST = {
        core: { [boundedContext]: { [module]: tree } },
      };

      const targetGenerator = new TargetGenerator();

      // when
      const result = targetGenerator.generate(intermediateAST, {
        formatterConfig,
        targetLanguage: language,
        // setupData: null,
      });

      if (!isTargetGeneratorError(result)) {
        resultCore = result.core;
      }

      //then
      const formattedOutput = formatString(testCase.output, formatterConfig);
      if (result instanceof Error) {
        throw result;
      }
      expect(resultCore[0].fileContent).toEqual(formattedOutput);
    });
  });
});
