import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { ExtendsRepoPortsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ExtendsRepoPortNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { RepoPortIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/repo-port/RepoPortIdentifierNodeBuilder.js';
import { RepoPortBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/repo-port/RepoPortNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { RepoPortNode } from '../../../../../src/ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

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
}
