import { StructEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/StructEvaluationBuilder.js';
import { NameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/NameBuilder.js';
import { EvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationNode.js';
import { EvaluationFieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { DomainEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import { DomainEvaluationPropsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationPropsNodeBuilder.js';
import { EntityEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EntityEvaluationBuilder.js';
import { EvaluationBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationBuilder.js';
import { EvaluationFieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldListNodeBuilder.js';
import { EvaluationFieldNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EvaluationFieldList/EvaluationFieldNodeBuilder.js';
import { DomainEvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { DomainEvaluationPropsNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluationProps.js';
import { EntityEvaluationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EntityEvaluation.js';
import { ExpressionBuilderDirector } from './expression.js';
import { DTOEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DTOEvaluationBuilder.js';
import { EvaluationFieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ErrorEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/ErrorEvaluationBuilder.js';
import { ArgumentListNode } from './../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { NameNode } from '../../../../../src/ast/core/intermediate-ast/nodes/NameNode.js';
import { ClassNameNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ClassNameBuilder.js';
import { BuiltinClassEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/BuiltinClassEvaluationBuilder.js';

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

  buildEvaluationFieldListWithOneVariableField(
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
