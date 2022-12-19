import { EntityDeclarationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityDeclarationBuilder.js';
import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { EntityValuesNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityValuesBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainCreateNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { EntityDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Entity/EntityDeclarationNode.js';
import { PrivateMethodDeclarationListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/methods/PublicMethodDeclarationListNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class EntityBuilderDirector {
  buildEntity({
    entityName,
    createMethod,
    publicMethods,
    privateMethods,
  }: {
    entityName: string;
    createMethod: DomainCreateNode;
    publicMethods: PublicMethodDeclarationListNode;
    privateMethods: PrivateMethodDeclarationListNode;
  }): EntityDeclarationNode {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    const entityIdentifierNode = new EntityIdentifierNodeBuilder().withName(entityName).build();
    const entityValuesNode = new EntityValuesNodeBuilder()
      .withCreate(createMethod)
      .withPrivateMethods(privateMethods)
      .withPublicMethods(publicMethods)
      .build();
    return new EntityDeclarationNodeBuilder(tree)
      .withIdentifier(entityIdentifierNode)
      .withValues(entityValuesNode)
      .build();
  }
}
