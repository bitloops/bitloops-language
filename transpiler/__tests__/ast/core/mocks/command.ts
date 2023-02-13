import { CommandNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/command/CommandNodeBuilder.js';
import { FieldListNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { FieldNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { OptionalBuilder } from '../../../../src/ast/core/intermediate-ast/builders/OptionalBuilder.js';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../../target/typescript/core/builders/bitloopsPrimaryTypeDirector.js';

export const validCommandTestCases = [
  {
    description: 'Command with fields',
    fileId: 'testFile.bl',
    inputBLString: 'Command InsertPINCommand { string email; string pin; }',
    commandDeclaration: new CommandNodeBuilder(
      new IntermediateASTTree(new IntermediateASTRootNode()),
    )
      .withFieldList(
        new FieldListNodeBuilder()
          .withFields([
            new FieldNodeBuilder()
              .withName(new IdentifierNodeBuilder().withName('email').build())
              .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
              .withOptional(new OptionalBuilder().withOptional(false).build())
              .build(),
            new FieldNodeBuilder()
              .withName(new IdentifierNodeBuilder().withName('pin').build())
              .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
              .withOptional(new OptionalBuilder().withOptional(false).build())
              .build(),
          ])
          .build(),
      )
      .withIdentifier(new IdentifierNodeBuilder().withName('InsertPINCommand').build())
      .build(),
  },
];

// export const validMultipleCommandsTestCases = [
//   {
//     description: '2 DTOs with optional field containing array type',
//     fileId: 'testFile.bl',
//     inputBLString: 'DTO HelloWorldRequestDTO { string name; } DTO TodoRequestDTO { string todo; }',
//     variables: [
//       [
//         new FieldBuilderDirector().buildPrimitiveField({
//           name: 'name',
//           type: 'string',
//           isOptional: false,
//         }),
//       ],
//       [
//         new FieldBuilderDirector().buildPrimitiveField({
//           name: 'todo',
//           type: 'string',
//           isOptional: false,
//         }),
//       ],
//     ],
//     identifier: [
//       new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
//       new IdentifierBuilder().withDTOName('TodoRequestDTO').build(),
//     ],
//   },
// ];

// export const errorCases = [
//   {
//     description: 'DTO with error in parsing',
//     fileId: 'testFile.bl',
//     inputBLString: 'DTO HelloWorldRequestDTO{ string[][] 64; }',
//   },
// ];
