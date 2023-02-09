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
import { BitloopsParser } from '../../../../src/parser/core/index.js';
import { IntermediateASTParser } from '../../../../src/ast/core/index.js';
import { isIntermediateASTValidationErrors } from '../../../../src/ast/core/guards/index.js';
import { isParserErrors } from '../../../../src/parser/core/guards/index.js';
import { VALID_GRAPHQL_SERVER_CASES } from '../mocks/graphQLServerDeclaration/index.js';
import { IntermediateASTSetup } from '../../../../src/ast/core/types.js';
import { BitloopsTypesMapping } from '../../../../src/helpers/mappings.js';

const BOUNDED_CONTEXT = 'Hello world';
const MODULE = 'Demo';

describe('GraphQL Server is valid', () => {
  let setupResult: IntermediateASTSetup;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  VALID_GRAPHQL_SERVER_CASES.forEach((testGraphQLServer) => {
    test(`${testGraphQLServer.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: 'fileId',
            fileContents: '',
          },
        ],
        setup: [
          {
            fileContents: testGraphQLServer.inputBLString,
            fileId: testGraphQLServer.fileId,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const parseResult = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTValidationErrors(parseResult)) {
          const result = intermediateParser.complete(parseResult);
          setupResult = result.setup;
        }
      }
      const resultTree = setupResult[testGraphQLServer.fileId];
      const value = resultTree
        .getRootChildrenNodesByType(BitloopsTypesMapping.TGraphQLServerInstance)[0]
        .getValue();
      expect(value).toMatchObject(testGraphQLServer.graphQLServer);
    });
  });
});

// test('Multiple Valid Server Declarations', ({ given, when, then }) => {
//   let blString;
//   let modelOutput;
//   let result;

//   given(/^Valid Server Declarations (.*) string$/, (arg0) => {
//     blString = d(arg0);
//   });

//   when('I generate the model', () => {
//     console.log('blString', blString);
//     result = parseBitloops(blString);
//   });

//   then(/^I should get (.*)$/, (arg0) => {
//     modelOutput = decode(arg0);
//     // console.log('result', result);
//     // console.log('modelOutput', JSON.parse(modelOutput));
//     expect(result).toMatchObject(JSON.parse(modelOutput));
//   });
// });
