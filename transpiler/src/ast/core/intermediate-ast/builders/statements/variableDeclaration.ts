import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { TypeAnnotationNode } from '../../nodes/TypeAnnotationNode.js';
import { VariableDeclarationNode } from '../../nodes/variableDeclaration.js';
import { IBuilder } from '../IBuilder.js';

export class VariableDeclarationNodeBuilder implements IBuilder<VariableDeclarationNode> {
  private variableDeclarationNode: VariableDeclarationNode;
  private identifierNode: IdentifierNode;
  private expressionNode: ExpressionNode;
  private typeAnnotationNode: TypeAnnotationNode;

  constructor(metadata?: TNodeMetadata) {
    this.variableDeclarationNode = new VariableDeclarationNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): VariableDeclarationNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(expressionNode: ExpressionNode): VariableDeclarationNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public withTypeAnnotation(
    typeAnnotationNode: TypeAnnotationNode,
  ): VariableDeclarationNodeBuilder {
    this.typeAnnotationNode = typeAnnotationNode;
    return this;
  }

  public build(): VariableDeclarationNode {
    this.variableDeclarationNode.addChild(this.identifierNode);
    this.variableDeclarationNode.addChild(this.expressionNode);

    if (this.typeAnnotationNode) {
      this.variableDeclarationNode.addChild(this.typeAnnotationNode);
    }

    this.variableDeclarationNode.buildObjectValue();

    return this.variableDeclarationNode;
  }
}
