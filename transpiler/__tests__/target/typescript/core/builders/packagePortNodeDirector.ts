import { MethodDefinitionListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionListNodeBuilder.js';
import { PackagePortIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/package/packagePort/PackagePortIdentifierNodeBuilder.js';
import { PackagePortNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/package/packagePort/PackagePortNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { MethodDefinitionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/method-definitions/MethodDefinitionNode.js';
import { PackagePortNode } from '../../../../../src/ast/core/intermediate-ast/nodes/package/packagePort/PackagePortNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class PackagePortNodeDirector {
  private builder: PackagePortNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new PackagePortNodeBuilder(tree);
  }

  buildPortWithMethodDefinitions(
    packagePortName: string,
    methodDefinitions: MethodDefinitionNode[],
  ): PackagePortNode {
    return this.builder
      .withIdentifier(new PackagePortIdentifierNodeBuilder().withName(packagePortName).build())
      .withMethodDefinitions(
        new MethodDefinitionListNodeBuilder().withMethodDefinitions(methodDefinitions).build(),
      )
      .build();
  }
}
