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
import { FOR_OF_STATEMENT_TEST_CASES } from './mocks/statements/for-of/forOfStatement.js';

describe('Valid forOf statement test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = SupportedLanguages.TypeScriptNest;

  FOR_OF_STATEMENT_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      let resultCore: TTargetCoreFinalContent[];

      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const input = testCase.forOfStatement;

      tree.insertChild(input);

      const intermediateAST = {
        core: { [boundedContext]: { [module]: tree } },
      };

      // when
      const targetGenerator = new TargetGenerator();
      const result = targetGenerator.generate(intermediateAST, {
        formatterConfig,
        targetLanguage: language,
      });

      if (!isTargetGeneratorError(result)) {
        resultCore = result.core;
      }

      //then
      const formattedOutput = formatString(testCase.output as string, formatterConfig);
      if (result instanceof Error) {
        throw result;
      }
      expect(resultCore[0].fileContent).toEqual(formattedOutput);
    });
  });
});
