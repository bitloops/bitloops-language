import { MethodDefinitionListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/methodDefinition/methodDefinitionListNodeBuilder.js';
import { ServicePortIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/service-port/ServicePortIdentifierNodeBuilder.js';
import { ServicePortNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/service-port/ServicePortNodeBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { MethodDefinitionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/method-definitions/MethodDefinitionNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { ServicePortNode } from '../../../../../src/ast/core/intermediate-ast/nodes/service-port/ServicePortNode.js';

export class ServicePortNodeBuilderDirector {
  private builder: ServicePortNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new ServicePortNodeBuilder(tree);
  }

  buildServicePort({
    packagePortName,
    methodDefinitions,
  }: {
    packagePortName: string;
    methodDefinitions: MethodDefinitionNode[];
  }): ServicePortNode {
    const identifierNode = new ServicePortIdentifierNodeBuilder().withName(packagePortName).build();
    const methodDefinitionListNode = new MethodDefinitionListNodeBuilder()
      .withMethodDefinitions(methodDefinitions)
      .build();
    return this.builder
      .withIdentifier(identifierNode)
      .withMethodDefinitions(methodDefinitionListNode)
      .build();
  }
}
