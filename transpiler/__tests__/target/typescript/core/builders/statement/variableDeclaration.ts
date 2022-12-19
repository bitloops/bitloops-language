import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { VariableDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/variableDeclaration.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { TypeAnnotationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/TypeAnnotationNode.js';

export class VariableDeclarationBuilderDirector {
  buildVarDeclaration(
    identifier: string,
    expression: ExpressionNode,
    typeAnnotation: TypeAnnotationNode,
  ): ConstDeclarationNode {
    const node = new VariableDeclarationNodeBuilder(null)
      .withIdentifier(new IdentifierNodeBuilder().withName(identifier).build())
      .withExpression(expression)
      .withTypeAnnotation(typeAnnotation);
    return node.build();
  }
}
