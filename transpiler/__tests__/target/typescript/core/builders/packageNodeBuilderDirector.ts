import { MethodDefinitionListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionListNodeBuilder.js';
import { PackageNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/package/PackageNodeBuilder.js';
import { PackagePortIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/package/packagePort/PackagePortIdentifierNodeBuilder.js';
import { PackagePortNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/package/packagePort/PackagePortNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { MethodDefinitionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/method-definitions/MethodDefinitionNode.js';
import { PackageNode } from '../../../../../src/ast/core/intermediate-ast/nodes/package/PackageNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class PackageNodeBuilderDirector {
  private builder: PackageNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new PackageNodeBuilder(tree);
  }

  buildPackageNode({
    packagePortName,
    methodDefinitions,
  }: {
    packagePortName: string;
    methodDefinitions: MethodDefinitionNode[];
  }): PackageNode {
    const identifierNode = new PackagePortIdentifierNodeBuilder().withName(packagePortName).build();
    const methodDefinitionListNode = new MethodDefinitionListNodeBuilder()
      .withMethodDefinitions(methodDefinitions)
      .build();
    const packagePortNode = new PackagePortNodeBuilder(null)
      .withIdentifier(identifierNode)
      .withMethodDefinitions(methodDefinitionListNode)
      .build();
    return this.builder.withPort(packagePortNode).build();
  }
}
