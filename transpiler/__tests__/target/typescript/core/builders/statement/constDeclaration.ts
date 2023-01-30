import { DTOIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ConstDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/constDeclaration.js';
import { ArgumentNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { BitloopsPrimaryTypeNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { EvaluationFieldNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { ArgumentListDirector } from '../argumentList.js';
import { EvaluationBuilderDirector } from '../evaluation.js';
import { ExpressionBuilderDirector } from '../expression.js';

export class ConstDeclarationBuilderDirector {
  buildConstDeclaration(
    identifier: string,
    expression: ExpressionNode,
    typeAnnotation?: BitloopsPrimaryTypeNode,
  ): ConstDeclarationNode {
    const node = new ConstDeclarationNodeBuilder()
      .withIdentifier(new IdentifierNodeBuilder().withName(identifier).build())
      .withExpression(expression);
    if (typeAnnotation) {
      node.withTypeAnnotation(typeAnnotation);
    }
    return node.build();
  }
  /**
   *  const {identifier} = [await]? this.useCase.execute();
   */
  buildConstDeclarationThisUseCaseExecute(
    identifier: string,
    options?: { await: boolean },
    executeArgs?: ArgumentNode[],
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
      new ArgumentListDirector().buildArgumentListWithArgs(executeArgs ?? []),
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
  buildValueObjectConstDeclarationWithEvaluationFields({
    identifier,
    valueObjectIdentifier,
    evaluationFields,
  }: {
    identifier: string;
    valueObjectIdentifier: string;
    evaluationFields: EvaluationFieldNode[];
  }): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildEvaluationExpression(
        new EvaluationBuilderDirector().buildValueObjectEvaluationWithFieldList(
          valueObjectIdentifier,
          new EvaluationFieldListNodeBuilder().withEvaluationFields(evaluationFields).build(),
        ),
      ),
    );
  }

  /**
   * With evaluation field lists
   */
  buildEntityEvaluationConstDeclaration({
    identifier,
    entityIdentifier,
    evaluationFields,
  }: {
    identifier: string;
    entityIdentifier: string;
    evaluationFields: EvaluationFieldNode[];
  }): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildEvaluationExpression(
        new EvaluationBuilderDirector().buildEntityEvaluation(
          entityIdentifier,
          new EvaluationFieldListNodeBuilder().withEvaluationFields(evaluationFields).build(),
        ),
      ),
    );
  }

  buildDTOEvaluationConstDeclaration(
    identifier: string,
    dtoIdentifier: string,
    evalFields: EvaluationFieldNode[],
    typeAnnotation?: BitloopsPrimaryTypeNode,
  ): ConstDeclarationNode {
    const dtoEvaluation = new EvaluationBuilderDirector().buildDTOEvaluation(
      new DTOIdentifierNodeBuilder().withName(dtoIdentifier).build(),
      new EvaluationFieldListNodeBuilder().withEvaluationFields(evalFields).build(),
    );
    const constDeclaration = this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildEvaluationExpression(dtoEvaluation),
      typeAnnotation,
    );
    return constDeclaration;
  }

  buildStructEvaluationConstDeclaration(
    identifier: string,
    structIdentifier: string,
    evaluationFieldNodes: EvaluationFieldNode[],
    typeAnnotation?: BitloopsPrimaryTypeNode,
  ): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildEvaluationExpression(
        new EvaluationBuilderDirector().buildStructEvaluation(
          structIdentifier,
          evaluationFieldNodes,
        ),
      ),
      typeAnnotation,
    );
  }

  buildIntegerExpressionConstDeclaration(
    identifier: string,
    value: number,
    typeAnnotation?: BitloopsPrimaryTypeNode,
  ): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildInt32LiteralExpression(value),
      typeAnnotation,
    );
  }

  buildStringExpressionConstDeclaration(
    identifier: string,
    value: string,
    typeAnnotation?: BitloopsPrimaryTypeNode,
  ): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildStringLiteralExpression(value),
      typeAnnotation,
    );
  }
}
