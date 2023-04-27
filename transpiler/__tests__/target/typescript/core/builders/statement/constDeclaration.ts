import { DTOIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DTO/DTOIdentifierNodeBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ConstDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/constDeclaration.js';
import { AnonymousFunctionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/AnonymousFunctionNode.js';
import { ArgumentNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';
import { BitloopsPrimaryTypeNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { EvaluationFieldNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { ArgumentListDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/argumentList.js';
import { EvaluationBuilderDirector } from '../evaluation.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';

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

  buildValueObjectConstDeclarationWithEvaluationFieldsAndIfError({
    identifier,
    valueObjectIdentifier,
    evaluationFields,
    ifErrorFunction,
  }: {
    identifier: string;
    valueObjectIdentifier: string;
    evaluationFields: EvaluationFieldNode[];
    ifErrorFunction: AnonymousFunctionNode;
  }): ConstDeclarationNode {
    return this.buildConstDeclaration(
      identifier,
      new ExpressionBuilderDirector().buildIfErrorExpressionNode(
        new EvaluationBuilderDirector().buildValueObjectEvaluationWithFieldListIfError(
          valueObjectIdentifier,
          new EvaluationFieldListNodeBuilder().withEvaluationFields(evaluationFields).build(),
          ifErrorFunction,
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

  buildIdentifierExpressionConstDeclaration(
    constDeclarationIdentifier: string,
    value: string,
    typeAnnotation?: BitloopsPrimaryTypeNode,
  ): ConstDeclarationNode {
    return this.buildConstDeclaration(
      constDeclarationIdentifier,
      new ExpressionBuilderDirector().buildIdentifierExpression(value),
      typeAnnotation,
    );
  }

  /**
   *  e.g. const identifier = this.repoPort.get();
   */
  buildConstDeclarationThisMethodCallExpression({
    constDeclarationIdentifier,
    thisIdentifier,
    methodCallIdentifier,
    executeArgs,
  }: {
    constDeclarationIdentifier: string;
    thisIdentifier: string;
    methodCallIdentifier: string;
    executeArgs?: ArgumentNode[];
  }): ConstDeclarationNode {
    const thisNode = new ExpressionBuilderDirector().buildThisExpression();

    const expression = new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(thisNode, thisIdentifier),
        methodCallIdentifier,
      ),
      new ArgumentListDirector().buildArgumentListWithArgs(executeArgs ?? []),
    );
    return this.buildConstDeclaration(constDeclarationIdentifier, expression);
  }
}
