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
import { ClassTypes } from '../../../../src/helpers/mappings.js';
import { DTOIdentifierNodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { DTONodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/DTO/DTONodeBuilder.js';
import { FieldListNodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { IntermediateASTTree } from '../../../../src/refactoring-arch/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/refactoring-arch/intermediate-ast/nodes/RootNode.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';
import { FieldBuilderDirector } from './field.builder.js';

const validDTOTestCases = [
  {
    description: 'DTO with optional field and primitive type',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildOptionalPrimitiveField('todo', 'string')])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('TodoDTO').build(),
    output: 'export interface TodoDTO { todo?: string; }',
  },
  {
    description: 'DTO with required field and primitive type',
    fieldListNode: new FieldListNodeBuilder()
      .withFields([new FieldBuilderDirector().buildRequiredPrimitiveField('name', 'string')])
      .build(),
    dtoIdentifierNode: new DTOIdentifierNodeBuilder().withName('HelloDTO').build(),
    output: 'export interface HelloDTO { name: string; }',
  },
];

describe('Valid DTO with fields to Typescript', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = ClassTypes.DTOs;
  const formatterConfig = null;
  const language = 'TypeScript';
  let result;
  let intermediateAST;

  validDTOTestCases.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const dtoNode = new DTONodeBuilder(tree)
        .withIdentifier(testCase.dtoIdentifierNode)
        .withVariables(testCase.fieldListNode)
        .build();

      intermediateAST = {
        [boundedContext]: { [module]: tree },
      };

      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });

      const formattedOutput = formatString(testCase.output as string, formatterConfig);
      const expectedOutput = [
        {
          boundedContext,
          className: dtoNode.getClassName(),
          module,
          classType,
          fileContent: formattedOutput,
        },
      ];
      expect(result).toEqual(expectedOutput);
    });
  });
});

// test('DTO with no fields to Typescript', ({ given, when, then }) => {
//   given(/^language is "(.*)"$/, (lang) => {
//     language = lang;
//   });

//   given(/^I have a dto (.*)$/, (dto) => {
//     intermediateAST = {
//       [boundedContext]: { [module]: { [classType]: JSON.parse(dto) } },
//     };
//   });

//   when('I generate the code', () => {
//     const targetGenerator = new BitloopsTargetGenerator();
//     result = () => {
//       targetGenerator.generate({
//         intermediateAST,
//         formatterConfig,
//         targetLanguage: language,
//         setupData: null,
//       });
//     };
//   });

//   then(/^I should see the (.*) output$/, (error) => {
//     expect(result).toThrow(error);
//   });
// });

// test('DTO with fields not formatted as array to Typescript', ({ given, when, then }) => {
//   given(/^language is "(.*)"$/, (lang) => {
//     language = lang;
//   });

//   given(/^I have a dto (.*)$/, (dto) => {
//     intermediateAST = {
//       [boundedContext]: { [module]: { [classType]: JSON.parse(dto) } },
//     };
//   });

//   when('I generate the code', () => {
//     const targetGenerator = new BitloopsTargetGenerator();
//     result = () => {
//       targetGenerator.generate({
//         intermediateAST,
//         formatterConfig,
//         targetLanguage: language,
//         setupData: null,
//       });
//     };
//   });

//   then(/^I should see the (.*) output$/, (error) => {
//     expect(result).toThrow(error);
//   });
// });
// });
