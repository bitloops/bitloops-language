import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ConstDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/constDeclaration.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { ArgumentListDirector } from '../argumentList.js';
import { EvaluationBuilderDirector } from '../evaluation.js';
import { ExpressionBuilderDirector } from '../expression.js';

export class ConstDeclarationBuilderDirector {
  buildConstDeclaration(identifier: string, expression: ExpressionNode): ConstDeclarationNode {
    return new ConstDeclarationNodeBuilder()
      .withIdentifier(new IdentifierNodeBuilder().withName(identifier).build())
      .withExpression(expression)
      .build();
  }
  /**
   *  const {identifier} = [await]? this.useCase.execute();
   */
  buildConstDeclarationThisUseCaseExecute(
    identifier: string,
    options?: { await: boolean },
  ): ConstDeclarationNode {
    let thisNode;
    if (options?.await) {
      thisNode = new ExpressionBuilderDirector().buildModifiedThisExpression('await this');
    } else {
      thisNode = new ExpressionBuilderDirector().buildThisExpression();
    }

    const expression = new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(thisNode, 'useCase'),
        'execute',
      ),
      new ArgumentListDirector().buildArgumentListWithArgs([]),
    );
    return this.buildConstDeclaration(identifier, expression);
  }

  /**
   * With expression(identifier of props)
   */
  buildValueObjectConstDeclaration(
    identifier: string,
    valueObjectIdentifier: string,
    propsIdentifier: string,
  ): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildEvaluationExpression(
        new EvaluationBuilderDirector().buildValueObjectEvaluation(
          valueObjectIdentifier,
          new ExpressionBuilderDirector().buildIdentifierExpression(propsIdentifier),
        ),
      ),
    );
  }

  /**
   * With evaluation field lists
   */
  buildEntityEvaluationConstDeclaration(
    identifier: string,
    entityIdentifier: string,
  ): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildEvaluationExpression(
        new EvaluationBuilderDirector().buildEntityEvaluation(
          entityIdentifier,
          new EvaluationFieldListNodeBuilder().withEvaluationFields([]).build(),
        ),
      ),
    );
  }
}
