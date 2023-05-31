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
import { DomainRuleBuilderDirector } from './builders/domain/rule.js';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { TargetGenerator } from '../../../../src/target/index.js';
import { TTargetCoreFinalContent } from '../../../../src/target/types.js';
import { SupportedLanguages } from '../../../../src/target/supportedLanguages.js';
import { isTargetGeneratorError } from '../../../../src/target/typescript-nest/guards/index.js';
import { formatString } from '../../../../src/target/typescript-nest/core/codeFormatting.js';

describe('domain rule tests', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = SupportedLanguages.TypeScriptNest;

  VALID_DOMAIN_RULES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      let resultCore: TTargetCoreFinalContent[];

      const domainRule = new DomainRuleBuilderDirector().buildDomainRule({
        identifier: testCase.identifier,
        parameterList: testCase.parameterList,
        statements: testCase.statements || null,
        isBrokenIfCondition: testCase.isBrokenIfCondition,
        errorIdentifier: testCase.errorIdentifier,
        errorArguments: testCase.errorArguments,
      });
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());

      tree.insertChild(domainRule);

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
      if (result instanceof Error) {
        throw result;
      }
      expect(resultCore[0].fileContent).toEqual(formattedOutput);
    });
  });
});
