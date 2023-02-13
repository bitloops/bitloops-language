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

import { isIntermediateASTValidationErrors } from '../../../src/ast/core/guards/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { BitloopsParser, OriginalAST } from '../../../src/parser/index.js';
import { TArgumentList, TEvaluationValues } from '../../../src/types.js';
import { EvaluationBuilderDirector } from './builders/evaluationDirector.js';
import { validBuiltinClassEvaluations } from './mocks/builtinClassEvaluation.js';

const boundedContext = 'Hello World';
const module = 'core';

describe('Valid builtin class type', () => {
  validBuiltinClassEvaluations.forEach((mock) => {
    test(`${mock.description}`, () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext,
            module,
            fileId: mock.fileId,
            fileContents: mock.inputBLString,
          },
        ],
      });
      if (isParserErrors(initialModelOutput)) {
        throw new Error(initialModelOutput[0].message);
      }

      const intermediateParser = new IntermediateASTParser();
      const result = intermediateParser.parse(initialModelOutput as OriginalAST);
      if (isIntermediateASTValidationErrors(result)) {
        throw new Error(result[0].message);
      }
      const { core } = result;
      const resultTree = core[boundedContext].core;
      const expected = getExpected(mock.builtInIdentifier, mock.argumentList);
      const value = resultTree.getCurrentNode().getValue();
      expect(value).toMatchObject(expected);
    });
  });
});
const getExpected = (idName: string, args: TArgumentList): TEvaluationValues => {
  return new EvaluationBuilderDirector().buildBuiltInClassEvaluation(idName, args).evaluation;
};
