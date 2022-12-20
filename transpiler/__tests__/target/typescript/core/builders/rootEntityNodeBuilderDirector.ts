import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { EntityValuesNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityValuesBuilder.js';
import { RootEntityDeclarationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/RootEntity/RootEntityDeclarationBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainCreateNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { RootEntityDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class RootEntityNodeBuilderDirector {
  buildRootEntityNoMethods({
    entityName,
    createMethod,
  }: {
    entityName: string;
    createMethod: DomainCreateNode;
  }): RootEntityDeclarationNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const rootEntityIdentifierNode = new EntityIdentifierNodeBuilder().withName(entityName).build();
    const rootEntityValuesNode = new EntityValuesNodeBuilder().withCreate(createMethod).build();
    return new RootEntityDeclarationNodeBuilder(tree)
      .withIdentifier(rootEntityIdentifierNode)
      .withValues(rootEntityValuesNode)
      .build();
  }
}
