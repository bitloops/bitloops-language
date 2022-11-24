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
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ClassTypes } from '../../../../src/helpers/mappings.js';
// import { DTOIdentifierNodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
// import { DTONodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/DTO/DTONodeBuilder.js';
// import { FieldListNodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
// import { FieldNodeBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
// import { IdentifierBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/IdentifierBuilder.js';
// import { OptionalBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/OptionalBuilder.js';
// import { IntermediateASTTree } from '../../../../src/refactoring-arch/intermediate-ast/IntermediateASTTree.js';
// import { IntermediateASTRootNode } from '../../../../src/refactoring-arch/intermediate-ast/nodes/RootNode.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';

const feature = loadFeature('__tests__/target/typescript/core/dto.feature');

// const optionalNode = new OptionalBuilder().withOptional(true).build();
// const identifierNode = new IdentifierBuilder().withName('todo').build();
// const typeNode = new TypeBuilder
// const fieldNode = new FieldNodeBuilder()
//   .withName(identifierNode)
//   .withOptional(optionalNode)
//   .withType()
//   .build();
// const fieldListNode = new FieldListNodeBuilder().withFields([fieldNode]).build();

// const tree = new IntermediateASTTree(new IntermediateASTRootNode());
// const dtoIdentifierNode = new DTOIdentifierNodeBuilder().withName('TodoDTO').build();
// const dtoNode = new DTONodeBuilder(tree)
//   .withIdentifier(dtoIdentifierNode)
//   .withVariables(fieldListNode)
//   .build();

defineFeature(feature, (test) => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const classType = ClassTypes.DTOs;
  const formatterConfig = null;
  let language;
  let result;
  let intermediateAST;

  test('DTO with fields to Typescript', ({ given, when, then }) => {
    given(/^language is "(.*)"$/, (lang) => {
      language = lang;
    });

    given(/^I have a dto (.*)$/, (dto) => {
      intermediateAST = {
        [boundedContext]: { [module]: { [classType]: JSON.parse(dto) } },
      };
    });

    when('I generate the code', () => {
      const targetGenerator = new BitloopsTargetGenerator();
      result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });
    });

    then(/^I should see the (.*) code$/, (output) => {
      const classNamesContent = JSON.parse(output);
      const expectedOutput = [];
      for (const [className, content] of Object.entries(classNamesContent)) {
        const formattedOutput = formatString(content as string, formatterConfig);
        expectedOutput.push({
          boundedContext,
          className,
          module,
          classType,
          fileContent: formattedOutput,
        });
      }
      expect(result).toEqual(expectedOutput);
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
});
