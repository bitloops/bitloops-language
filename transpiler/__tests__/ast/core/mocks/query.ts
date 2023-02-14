import { QueryNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/query/QueryNodeBuilder.js';
import { FieldListNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { FieldNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { OptionalBuilder } from '../../../../src/ast/core/intermediate-ast/builders/OptionalBuilder.js';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../../target/typescript/core/builders/bitloopsPrimaryTypeDirector.js';
import { QueryTopicNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/query/QueryTopicNodeBuilder.js';

export const validQueryTestCases = [
  {
    description: 'Query with fields',
    fileId: 'testFile.bl',
    inputBLString: 'Query GetCustomerByIdQuery { string id; }',
    queryDeclaration: new QueryNodeBuilder(new IntermediateASTTree(new IntermediateASTRootNode()))
      .withFieldList(
        new FieldListNodeBuilder()
          .withFields([
            new FieldNodeBuilder()
              .withName(new IdentifierNodeBuilder().withName('id').build())
              .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'))
              .withOptional(new OptionalBuilder().withOptional(false).build())
              .build(),
          ])
          .build(),
      )
      .withIdentifier(new IdentifierNodeBuilder().withName('GetCustomerByIdQuery').build())
      .withTopic(
        new QueryTopicNodeBuilder()
          .generateTopicName('GetCustomerByIdQuery', {
            boundedContextName: 'banking',
            moduleName: 'banking',
          })
          .build(),
      )
      .build(),
  },
];
