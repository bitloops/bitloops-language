import { ConstDeclarationNode } from '../../nodes/statements/ConstDeclarationNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { TypeAnnotationNode } from '../../nodes/TypeAnnotationNode.js';
import { IBuilder } from '../IBuilder.js';

export class ConstDeclarationNodeBuilder implements IBuilder<ConstDeclarationNode> {
  private constDeclarationNode: ConstDeclarationNode;
  private identifierNode: IdentifierNode;
  private expressionNode: ExpressionNode;
  private typeAnnotationNode: TypeAnnotationNode;

  constructor(metadata?: TNodeMetadata) {
    this.constDeclarationNode = new ConstDeclarationNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): ConstDeclarationNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(expressionNode: ExpressionNode): ConstDeclarationNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public withTypeAnnotation(typeAnnotationNode: TypeAnnotationNode): ConstDeclarationNodeBuilder {
    this.typeAnnotationNode = typeAnnotationNode;
    return this;
  }

  public build(): ConstDeclarationNode {
    this.constDeclarationNode.addChild(this.identifierNode);
    this.constDeclarationNode.addChild(this.expressionNode);

    if (this.typeAnnotationNode) {
      this.constDeclarationNode.addChild(this.typeAnnotationNode);
    }

    this.constDeclarationNode.buildObjectValue();

    return this.constDeclarationNode;
  }
}
