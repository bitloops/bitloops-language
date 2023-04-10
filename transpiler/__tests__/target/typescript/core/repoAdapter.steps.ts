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
import {
  VALID_MULTIPLE_REPO_ADAPTER_DEFINITIONS,
  VALID_SINGLE_REPO_ADAPTER_DEFINITIONS,
} from './mocks/repoAdapter/index.js';

describe('Valid repo adapter definition test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = SupportedLanguages.TypeScriptNest;

  VALID_SINGLE_REPO_ADAPTER_DEFINITIONS.forEach((testCase) => {
    let resultCore: TTargetCoreFinalContent[];

    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const repoAdapterNode = testCase.repoAdapter;
      const repoPortNode = testCase.repoPort;
      const rootEntityNode = testCase['rootEntity'];
      const propsNode = testCase.props;
      const readModelNode = testCase['readModel'];
      const valueObjectNode = testCase['valueObject'];

      tree.insertChild(repoPortNode);
      if (rootEntityNode) {
        tree.insertSibling(rootEntityNode);
      } else if (readModelNode) {
        tree.insertSibling(readModelNode);
      } else {
        throw new Error('ReadModel or RootEntity is missing from repo adapter test');
      }
      if (valueObjectNode) {
        tree.insertSibling(valueObjectNode);
      }
      tree.insertSibling(propsNode);
      tree.insertSibling(repoAdapterNode);

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

      expect(resultCore[3].fileContent).toEqual(formattedOutput);
    });
  });

  VALID_MULTIPLE_REPO_ADAPTER_DEFINITIONS.forEach((testCase) => {
    let resultCore: TTargetCoreFinalContent[];

    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const repoAdapterNodes = testCase.repoAdapters;
      const repoPortNodes = testCase.repoPorts;
      const rootEntityNode = testCase['rootEntity'];
      const propsNode = testCase.props;
      const readModelNode = testCase['readModel'];
      const valueObjectNode = testCase['valueObject'];

      if (rootEntityNode) {
        tree.insertChild(rootEntityNode);
        if (readModelNode) {
          tree.insertSibling(readModelNode);
        } else {
          throw new Error('ReadModel is missing from repo adapter test');
        }
      } else {
        throw new Error('RootEntity is missing from repo adapter test');
      }
      if (valueObjectNode) {
        tree.insertSibling(valueObjectNode);
      }
      for (const propNode of propsNode) {
        tree.insertSibling(propNode);
      }
      for (const repoPortNode of repoPortNodes) {
        tree.insertSibling(repoPortNode);
      }

      for (const repoAdapterNode of repoAdapterNodes) {
        tree.insertSibling(repoAdapterNode);
      }

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
      let adapterIndex = 7;
      for (const output of testCase.outputs) {
        const formattedOutput = formatString(output as string, formatterConfig);
        if (result instanceof Error) {
          throw result;
        }

        expect(resultCore[adapterIndex].fileContent).toEqual(formattedOutput);
        adapterIndex++;
      }
    });
  });
});
