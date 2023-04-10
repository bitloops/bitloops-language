import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { ErrorIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ExtendsRepoPortsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ExtendsRepoPortNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { MethodDefinitionListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionListNodeBuilder.js';
import { MethodDefinitionNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionNodeBuilder.js';
import { ParameterIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ParameterNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { ReadModelIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/readModel/ReadModelIdentifierNodeBuilder.js';
import { RepoPortIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/repo-port/RepoPortIdentifierNodeBuilder.js';
import { RepoPortBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/repo-port/RepoPortNodeBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { ErrorIdentifiersNodeBuilderDirector } from '../../../../../src/ast/core/intermediate-ast/directors/ErrorIdentifiersNodeBuilderDirector.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { RepoPortNode } from '../../../../../src/ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';

export class RepoPortNodeBuilderDirector {
  private builder: RepoPortBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new RepoPortBuilder(tree);
  }

  buildAggregateRepoPortWithoutMethods(): RepoPortNode {
    return this.builder
      .withRepoPortIdentifierNode(
        new RepoPortIdentifierNodeBuilder().withName('TodoRepoPort').build(),
      )
      .withEntityIdentifier(new EntityIdentifierNodeBuilder().withName('TodoRootEntity').build())
      .withExtendsRepoPortNode(
        new ExtendsRepoPortsNodeBuilder()
          .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDWriteRepoPort').build()])
          .build(),
      )
      .build();
  }

  buildAggregateRepoPortWithMethodDefinitions(): RepoPortNode {
    return this.builder
      .withRepoPortIdentifierNode(
        new RepoPortIdentifierNodeBuilder().withName('TodoRepoPort').build(),
      )
      .withEntityIdentifier(new EntityIdentifierNodeBuilder().withName('TodoRootEntity').build())
      .withExtendsRepoPortNode(
        new ExtendsRepoPortsNodeBuilder()
          .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDWriteRepoPort').build()])
          .build(),
      )
      .withDefinitionMethodsNode(
        new MethodDefinitionListNodeBuilder()
          .withMethodDefinitions([
            new MethodDefinitionNodeBuilder()
              .withIdentifier(new IdentifierNodeBuilder().withName('updateTodoTitle').build())
              .withParameterList(
                new ParameterListNodeBuilder()
                  .withParameters([
                    new ParameterNodeBuilder()
                      .withIdentifier(
                        new ParameterIdentifierNodeBuilder().withIdentifier('id').build(),
                      )
                      .withType(
                        new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'),
                      )
                      .build(),
                    new ParameterNodeBuilder()
                      .withIdentifier(
                        new ParameterIdentifierNodeBuilder().withIdentifier('title').build(),
                      )
                      .withType(
                        new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('string'),
                      )
                      .build(),
                  ])
                  .build(),
              )
              .withType(
                new ReturnOkErrorTypeNodeBuilder()
                  .withOk(
                    new ReturnOkTypeNodeBuilder()
                      .withType(
                        new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('void'),
                      )
                      .build(),
                  )
                  .withErrors(
                    new ErrorIdentifiersNodeBuilder()
                      .withErrors([
                        new ErrorIdentifierNodeBuilder()
                          .withName(ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName)
                          .build(),
                      ])
                      .build(),
                  )
                  .build(),
              )
              .build(),
          ])
          .build(),
      )
      .build();
  }

  buildReadModelRepoPortWithMethodDefinitions(): RepoPortNode {
    return this.builder
      .withRepoPortIdentifierNode(
        new RepoPortIdentifierNodeBuilder().withName('TodoReadRepoPort').build(),
      )
      .withReadModelIdentifier(
        new ReadModelIdentifierNodeBuilder().withName('TodoReadModel').build(),
      )
      .withExtendsRepoPortNode(
        new ExtendsRepoPortsNodeBuilder()
          .withIdentifierList([new IdentifierNodeBuilder().withName('CRUDReadRepoPort').build()])
          .build(),
      )
      .withDefinitionMethodsNode(
        new MethodDefinitionListNodeBuilder()
          .withMethodDefinitions([
            new MethodDefinitionNodeBuilder()
              .withIdentifier(new IdentifierNodeBuilder().withName('getTodo').build())
              .withType(
                new ReturnOkErrorTypeNodeBuilder()
                  .withOk(
                    new ReturnOkTypeNodeBuilder()
                      .withType(
                        new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(
                          'TodoReadModel',
                        ),
                      )
                      .build(),
                  )
                  .withErrors(
                    new ErrorIdentifiersNodeBuilder()
                      .withErrors([
                        new ErrorIdentifierNodeBuilder()
                          .withName(ErrorIdentifiersNodeBuilderDirector.unexpectedRepoErrorName)
                          .build(),
                      ])
                      .build(),
                  )
                  .build(),
              )
              .build(),
          ])
          .build(),
      )
      .build();
  }
}
