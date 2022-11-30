import { StructEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/StructEvaluationBuilder.js';
import { NameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import { EvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';
import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { DTOEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DTOEvaluationBuilder.js';
import { NameNode } from '../../../../../src/ast/core/intermediate-ast/nodes/NameNode.js';
import { ClassNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ClassNameBuilder.js';
import { BuiltinClassEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/BuiltinClassEvaluationBuilder.js';
import { ErrorEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/ErrorEvaluationBuilder.js';
import { ArgumentListNode } from './../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { EvaluationFieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { EntityEvaluationBuilderDirector } from './domainEvaluation/entityEvaluation.js';
import { ValueObjectEvaluationBuilderDirector } from './domainEvaluation/valueObjectEvaluation.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';

export class EvaluationBuilderDirector {
  buildStructEvaluation(identifier: string, evalFields: EvaluationFieldNode[]): EvaluationNode {
    const nameNode = new NameNodeBuilder().withName(identifier).build();
    const evalFieldList = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields(evalFields)
      .build();

    const structEvaluationNode = new StructEvaluationNodeBuilder()
      .withName(nameNode)
      .withEvaluationFieldList(evalFieldList)
      .build();

    return new EvaluationBuilder().withEvaluation(structEvaluationNode).build();
  }

  buildEntityEvaluation(
    entityName: string,
    fieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const entityEvaluationNode =
      new EntityEvaluationBuilderDirector().buildEntityEvaluationWithFieldList(
        entityName,
        fieldListNode,
      );
    const evaluationNode = new EvaluationBuilder().withEvaluation(entityEvaluationNode).build();
    return evaluationNode;
  }

  buildErrorEvaluation(
    identifier: string,
    argumentDependencies?: ArgumentListNode,
  ): EvaluationNode {
    const nameNode = new NameNodeBuilder().withName(identifier).build();

    const node = new ErrorEvaluationNodeBuilder().withName(nameNode);
    if (argumentDependencies) {
      node.withArgumentsList(argumentDependencies);
    }
    const errorEvaluationNode = node.build();
    const evaluationNode = new EvaluationBuilder().withEvaluation(errorEvaluationNode).build();
    return evaluationNode;
  }

  buildDTOEvaluation(
    nameNode: NameNode,
    evaluationFieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const evaluationNode = new DTOEvaluationNodeBuilder()
      .withName(nameNode)
      .withEvaluationFieldList(evaluationFieldListNode)
      .build();

    return evaluationNode;
  }

  buildBuiltInClassEvaluation(
    className: string,
    argumentListNode: ArgumentListNode,
  ): EvaluationNode {
    const classNameNode = new ClassNameNodeBuilder().withClassName(className).build();
    const builtinClassNode = new BuiltinClassEvaluationNodeBuilder()
      .withClassName(classNameNode)
      .withArguments(argumentListNode)
      .build();

    const evaluationNode = new EvaluationBuilder().withEvaluation(builtinClassNode).build();
    return evaluationNode;
  }

  buildValueObjectEvaluation(
    valueObjectName: string,
    expressionNode: ExpressionNode,
  ): EvaluationNode {
    const valueObjectEvaluationNode =
      new ValueObjectEvaluationBuilderDirector().buildValueObjectEvaluationWithExpression(
        valueObjectName,
        expressionNode,
      );
    const evaluationNode = new EvaluationBuilder()
      .withEvaluation(valueObjectEvaluationNode)
      .build();
    return evaluationNode;
  }
}
