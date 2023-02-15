import { StructEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/StructEvaluationBuilder.js';
import { EvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';
import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { DTOEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DTOEvaluationBuilder.js';
import { ClassNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ClassNameBuilder.js';
import { BuiltinClassEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/BuiltinClassEvaluationBuilder.js';
import { ErrorEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/ErrorEvaluationBuilder.js';
import { ArgumentListNode } from './../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { EvaluationFieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { EntityEvaluationBuilderDirector } from './domainEvaluation/entityEvaluation.js';
import { ValueObjectEvaluationBuilderDirector } from './domainEvaluation/valueObjectEvaluation.js';
import { ExpressionNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { DTOIdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/DTO/DTOIdentifierNode.js';
import { ErrorIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { StructIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Struct/StructIdentifierNodeBuilder.js';
import { CorsOptionsEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/CorsOptionsEvaluationBuilder.js';
import { DomainEvaluationBuilderDirector } from './domainEvaluation/index.js';
import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { EntityConstructorEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EntityConstructorEvaluationNodeBuilder.js';

export class EvaluationBuilderDirector {
  buildStructEvaluation(identifier: string, evalFields: EvaluationFieldNode[]): EvaluationNode {
    const identifierNode = new StructIdentifierNodeBuilder().withName(identifier).build();
    const evalFieldList = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields(evalFields)
      .build();

    const structEvaluationNode = new StructEvaluationNodeBuilder()
      .withIdentifier(identifierNode)
      .withEvaluationFieldList(evalFieldList)
      .build();

    return new EvaluationBuilder().withEvaluation(structEvaluationNode).build();
  }

  buildCorsOptionsEvaluation(evalFields: EvaluationFieldNode[]): EvaluationNode {
    const evalFieldList = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields(evalFields)
      .build();

    const corsOptionsEvaluationNode = new CorsOptionsEvaluationNodeBuilder()
      .withEvaluationFieldList(evalFieldList)
      .build();

    return new EvaluationBuilder().withEvaluation(corsOptionsEvaluationNode).build();
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

  buildEntityEvaluationWithExpression(
    entityName: string,
    expressionNode: ExpressionNode,
  ): EvaluationNode {
    const entityEvaluationNode =
      new EntityEvaluationBuilderDirector().buildEntityEvaluationWithExpression(
        entityName,
        expressionNode,
      );
    const evaluationNode = new EvaluationBuilder().withEvaluation(entityEvaluationNode).build();
    return evaluationNode;
  }

  buildEntityConstructorEvaluationWithExpression(
    entityName: string,
    expressionNode: ExpressionNode,
  ): EvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithExpressionProps(
        new EntityIdentifierNodeBuilder().withName(entityName).build(),
        expressionNode,
      );
    const entityEvaluationNode = new EntityConstructorEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    const evaluationNode = new EvaluationBuilder().withEvaluation(entityEvaluationNode).build();
    return evaluationNode;
  }

  buildErrorEvaluation(
    identifier: string,
    argumentDependencies?: ArgumentListNode,
  ): EvaluationNode {
    const identifierNode = new ErrorIdentifierNodeBuilder().withName(identifier).build();

    const node = new ErrorEvaluationNodeBuilder().withIdentifier(identifierNode);
    if (argumentDependencies) {
      node.withArgumentsList(argumentDependencies);
    }
    const errorEvaluationNode = node.build();
    const evaluationNode = new EvaluationBuilder().withEvaluation(errorEvaluationNode).build();
    return evaluationNode;
  }

  buildDTOEvaluation(
    identifierNode: DTOIdentifierNode,
    evaluationFieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const evaluationNode = new DTOEvaluationNodeBuilder()
      .withIdentifier(identifierNode)
      .withEvaluationFieldList(evaluationFieldListNode)
      .build();

    return new EvaluationBuilder().withEvaluation(evaluationNode).build();
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

  buildValueObjectEvaluationWithFieldList(
    valueObjectName: string,
    fieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const valueObjectEvaluationNode =
      new ValueObjectEvaluationBuilderDirector().buildValueObjectEvaluationWithFieldList(
        valueObjectName,
        fieldListNode,
      );
    const evaluationNode = new EvaluationBuilder()
      .withEvaluation(valueObjectEvaluationNode)
      .build();
    return evaluationNode;
  }
}
