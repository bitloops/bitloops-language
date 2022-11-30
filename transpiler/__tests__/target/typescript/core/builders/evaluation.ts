import { DomainEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import { DomainEvaluationPropsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationPropsNodeBuilder.js';
import { EntityEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EntityEvaluationBuilder.js';
import { EvaluationBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { NameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import { DomainEvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { DomainEvaluationPropsNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluationProps.js';
import { EntityEvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EntityEvaluation.js';
import { EvaluationFieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { EvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';
import { ExpressionBuilderDirector } from './expression.js';

export class EvaluationBuilderDirector {
  buildStructEvaluation(): EvaluationNode {
    throw new Error('not implemented');
    // const expressionNode = new ExpressionBuilder()
    //   .withExpression(this.buildIdentifier(name))
    //   .build();
    // return expressionNode;
  }

  buildEntityEvaluationWithFieldList(
    entityName: string,
    fieldName: string,
    fieldValue: string,
  ): EvaluationNode {
    const entityEvaluationNode =
      new EntityEvaluationBuilderDirector().buildEntityEvaluationWithFieldList(
        entityName,
        fieldName,
        fieldValue,
      );
    const evaluationNode = new EvaluationBuilder().withEvaluation(entityEvaluationNode).build();
    return evaluationNode;
  }
}

export class EntityEvaluationBuilderDirector {
  buildEntityEvaluationWithFieldList(
    entityName: string,
    fieldName: string,
    fieldValue: string,
  ): EntityEvaluationNode {
    const domainEvaluation =
      new DomainEvaluationBuilderDirector().buildDomainEvaluationWithFieldListProps(
        entityName,
        fieldName,
        fieldValue,
      );
    const entityEvaluationNode = new EntityEvaluationNodeBuilder()
      .withDomainEvaluation(domainEvaluation)
      .build();
    return entityEvaluationNode;
  }
}

export class DomainEvaluationBuilderDirector {
  buildDomainEvaluationWithFieldListProps(
    domainName: string,
    fieldName: string,
    fieldValue: string,
  ): DomainEvaluationNode {
    const nameNode = new NameNodeBuilder().withName(domainName).build();
    EvaluationFieldListNodeBuilder;
    const domainEvaluationPropsNode =
      new DomainEvaluationPropsBuilderDirector().buildDomainEvaluationPropsWithFieldList(
        fieldName,
        fieldValue,
      );
    const domainEvaluation = new DomainEvaluationNodeBuilder()
      .withName(nameNode)
      .withProps(domainEvaluationPropsNode)
      .build();
    return domainEvaluation;
  }
}

export class DomainEvaluationPropsBuilderDirector {
  buildDomainEvaluationPropsWithFieldList(
    fieldName: string,
    fieldValue: string,
  ): DomainEvaluationPropsNode {
    const evaluationFieldListNode =
      new EvaluationFieldListBuilerDirector().buildEvaluationFieldListWithOneStringField(
        fieldName,
        fieldValue,
      );
    const domainEvaluationPropsNode = new DomainEvaluationPropsNodeBuilder()
      .withEvaluationFieldList(evaluationFieldListNode)
      .build();
    return domainEvaluationPropsNode;
  }
}

export class EvaluationFieldListBuilerDirector {
  buildEvaluationFieldListWithOneStringField(
    fieldName: string,
    fieldValue: string,
  ): EvaluationFieldListNode {
    const nameNode = new NameNodeBuilder().withName(fieldName).build();
    const expressionNode = new ExpressionBuilderDirector().buildStringLiteralExpression(fieldValue);
    const evaluationFieldNode = new EvaluationFieldNodeBuilder()
      .withName(nameNode)
      .withExpression(expressionNode)
      .build();
    const evaluationFieldListNode = new EvaluationFieldListNodeBuilder()
      .withEvaluationFields([evaluationFieldNode])
      .build();
    return evaluationFieldListNode;
  }
}
