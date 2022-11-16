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
import { bitloopsPrimitives } from '../../../src/helpers/bitloopsPrimitiveToLang.js';
import {
  BitloopsIntermediateASTParser,
  BitloopsLanguageASTContext,
  BitloopsParser,
  BitloopsParserError,
} from '../../../src/index.js';
import { DTOBuilder } from '../../../src/refactoring-arch/intermediate-ast/builders/DTO.js';
import { VariableBuilderDirector } from '../../../src/refactoring-arch/intermediate-ast/builders/VariableBuilder.js';
import { DTONode } from '../../../src/refactoring-arch/intermediate-ast/nodes/DTONode.js';
import { DTOIdentifierNode } from '../../../src/refactoring-arch/intermediate-ast/nodes/DTOIdentifierNode.js';
import { IntermediateASTRootNode } from '../../../src/refactoring-arch/intermediate-ast/nodes/RootNode.js';
import { FieldListNode } from '../../../src/refactoring-arch/intermediate-ast/nodes/FieldListNode.js';
import { ClassTypes } from '../../../src/helpers/mappings.js';

const testExamplesDTO = [
  {
    inputBLString: 'DTO HelloWorldRequestDTO{ optional string name; }',
    variables: [
      new VariableBuilderDirector().buildOptionalVariable(bitloopsPrimitives.string, 'name'),
    ],
    identifier: 'HelloWorldRequestDTO',
  },
];

const expectedDTONode = (): DTONode => {
  const rootNode = new IntermediateASTRootNode();
  const dtoNode = new DTONode();
  dtoNode.setClassType(ClassTypes.DTOs);
  rootNode.addChild(dtoNode);

  const identifierNode = new DTOIdentifierNode();
  identifierNode.setClassType(ClassTypes.DTOs);
  const fieldListNode = new FieldListNode();
  fieldListNode.setClassType(ClassTypes.DTOs);

  dtoNode.addChild(identifierNode);
  dtoNode.addChild(fieldListNode);
  return dtoNode;
};

// const expectedOutputTree = {
//   'Hello World': {
//     core: {
//       DTOs: {
//         HelloWorldRequestDTO: { fields: [{ optional: true, type: 'string', name: 'name' }] },
//       },
//     },
//   },
// };

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

test('DTO declaration is valid', () => {
  let resultTree: any;

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
      resultTree = intermediateParser.parse(
        initialModelOutput as unknown as BitloopsLanguageASTContext,
      );
    }
    const expectedDTOValue = new DTOBuilder()
      .withIdentifier(testDTO.identifier)
      .withVariables(testDTO.variables)
      .build();

    const expectedNodes = expectedDTONode();
    const actualNodes = resultTree.getDTOS();

    expect(resultTree).toEqual(expectedOutputTree);
    expect(resultValue).toEqual(expectedDTOValue);
  });
});

// const buildTree = (identifierName: string) => {
//   const tree = new IntermediateASTTree(new IntermediateASTRootNode());
//   const dtoNode = new DTONode();
//   const identifierNode = new DTOIdentifierNode().buildDTOIdentifier(identifierName);
//   tree.insertChild(dtoNode);
//   tree.insertChild(identifierNode);
// };
