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
import { VALID_DOMAIN_RULES } from './mocks/domain/rule.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';
import { DomainRuleBuilderDirector } from './builders/domain/rule.js';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsTargetGenerator } from '../../../../src/index.js';

describe('domain rule tests', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = 'TypeScript';

  VALID_DOMAIN_RULES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      const domainRule = new DomainRuleBuilderDirector().buildDomainRule({
        identifier: testCase.identifier,
        parameterList: testCase.parameterList,
        statements: testCase.statements || null,
        isBrokenIfCondition: testCase.isBrokenIfCondition,
        errorIdentifier: testCase.errorIdentifier,
      });
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());

      tree.insertChild(domainRule);

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
      if (result instanceof Error) {
        throw result;
      }
      expect(result[0].fileContent).toEqual(formattedOutput);
    });
  });
});
