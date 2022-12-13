import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ConstDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/constDeclaration.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclaration.js';
import { ArgumentListDirector } from '../argumentList.js';
import { ExpressionBuilderDirector } from '../expression.js';

export class StatementBuilderDirector {
  buildConstDeclarationThisUseCaseExecute(identifier: string): ConstDeclarationNode {
    const expression = new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          'useCase',
        ),
        'execute',
      ),
      new ArgumentListDirector().buildArgumentListWithArgs([]),
    );
    return this.buildConstDeclaration(identifier, expression);
  }

  buildConstDeclarationWithAwaitThisUseCaseExecute(identifier: string): ConstDeclarationNode {
    const expression = new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(
          new ExpressionBuilderDirector().buildModifiedThisExpression('await this'),
          'useCase',
        ),
        'execute',
      ),
      new ArgumentListDirector().buildArgumentListWithArgs([]),
    );
    return this.buildConstDeclaration(identifier, expression);
  }

  buildConstDeclaration(identifier: string, expression: ExpressionNode): ConstDeclarationNode {
    return new ConstDeclarationNodeBuilder()
      .withIdentifier(new IdentifierNodeBuilder().withName(identifier).build())
      .withExpression(expression)
      .build();
  }
}
