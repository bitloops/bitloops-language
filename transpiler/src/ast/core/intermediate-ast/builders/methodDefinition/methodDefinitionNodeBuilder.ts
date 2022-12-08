import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { MethodDefinitionNode } from '../../nodes/method-definitions/MethodDefinitionNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { TypeAnnotationNode } from '../../nodes/TypeAnnotationNode.js';
import { IBuilder } from '../IBuilder.js';

export class MethodDefinitionNodeBuilder implements IBuilder<MethodDefinitionNode> {
  private methodDefinitionNode: MethodDefinitionNode;
  private identifier: IdentifierNode;
  private type: TypeAnnotationNode;
  private parameterList: ParameterListNode;

  constructor(metadata?: TNodeMetadata) {
    this.methodDefinitionNode = new MethodDefinitionNode(metadata);
  }

  withIdentifier(identifier: IdentifierNode): MethodDefinitionNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  withType(type: TypeAnnotationNode): MethodDefinitionNodeBuilder {
    this.type = type;
    return this;
  }

  withParameterList(parameterList: ParameterListNode): MethodDefinitionNodeBuilder {
    this.parameterList = parameterList;
    return this;
  }

  public build(): MethodDefinitionNode {
    this.methodDefinitionNode.addChild(this.identifier);
    this.methodDefinitionNode.addChild(this.type);
    this.methodDefinitionNode.addChild(this.parameterList);

    return this.methodDefinitionNode;
  }
}
