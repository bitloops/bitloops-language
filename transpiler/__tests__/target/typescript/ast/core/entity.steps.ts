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
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsTypesMapping } from '../../../../../src/helpers/mappings.js';
import { IntermediateModelToASTTargetTransformer } from '../../../../../src/target/typescript/ast/index.js';
import { ENTITY_TEST_CASES } from './mocks/entity.js';
import { IntermediateAST } from '../../../../../src/ast/core/types.js';

describe('Valid Entity', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';

  ENTITY_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const entityNode = testCase.entity;
      tree.insertChild(entityNode);

      const intermediateModel = {
        core: { [boundedContext]: { [module]: tree } },
      };

      // when
      const targetModelTransformer = new IntermediateModelToASTTargetTransformer();
      const result: IntermediateAST = targetModelTransformer.transform(intermediateModel);

      //then
      expect(result).not.toBeInstanceOf(Error);
      const entityNodes = result.core[boundedContext][module].getRootChildrenNodesByType(
        BitloopsTypesMapping.TEntity,
      );
      expect(entityNodes.length).toBe(1);
      const value = entityNodes[0].getValue();
      const expectedValue = testCase.expectedOutput.getValue();
      expect(value).toEqual(expectedValue);
    });
  });
});
