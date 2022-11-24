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
import {
  BitloopsIntermediateASTParser,
  BitloopsIntermediateASTParserError,
  BitloopsLanguageASTContext,
  BitloopsParser,
  BitloopsParserError,
} from '../../../src/index.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { TDTOIdentifier, TVariables } from '../../../src/types.js';
import { IntermediateASTTree } from '../../../src/refactoring-arch/intermediate-ast/IntermediateASTTree.js';

const testExamplesDTO = [
  {
    //description:
    inputBLString: 'DTO HelloWorldRequestDTO{ optional string[][] name; }',
    variables: [{ type: 'string', name: 'name', optional: true }], //new VariableBuilder().withType('string').withName('name').build()
    identifier: 'HelloWorldRequestDTO',
  },
];

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

test('DTO declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  testExamplesDTO.forEach((testDTO) => {
    const initialModelOutput = parser.parse([
      {
        boundedContext: BOUNDED_CONTEXT,
        module: MODULE,
        fileId: 'testFile.bl',
        fileContents: testDTO.inputBLString,
      },
    ]);

    if (!(initialModelOutput instanceof BitloopsParserError)) {
      const result = intermediateParser.parse(
        initialModelOutput as unknown as BitloopsLanguageASTContext,
      );
      if (!(result instanceof BitloopsIntermediateASTParserError)) {
        resultTree = result[BOUNDED_CONTEXT][MODULE];
      }
    }
    console.log({ resultTree });

    const expectedNodeValues = getExpectedDTOValues(testDTO.variables, testDTO.identifier);
    const actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TDTO);
    const value = actualNodes[0].getValue();

    expect(value).toMatchObject(expectedNodeValues);
    // expect(resultValue).toEqual(expectedDTOValue);
  });
});

// DTONodeBuilder.withIdentifier().withFieldList()
const getExpectedDTOValues = (_variables: TVariables, identifier: TDTOIdentifier) => {
  const dtoValue = {
    DTO: {
      DTOIdentifier: identifier,
      fieldList: [
        {
          field: {
            optional: true,
            identifier: 'name',
            arrayPrimaryType: {
              arrayPrimaryType: {
                primitiveType: 'string',
              },
            },
          },
        },
      ],
    },
  };

  return dtoValue;
};
