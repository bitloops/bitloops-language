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
import { CommandEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/CommandEvaluationNodeBuilder.js';
import { QueryEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/QueryEvaluationNodeBuilder.js';
import { IntegrationEventEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/IntegrationEventEvaluationNodeBuilder.js';
import { IntegrationEventIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/integration-event/IntegrationEventIdentifierNodeBuilder.js';
import { DomainEvaluationPropsNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationPropsNodeBuilder.js';
import { DomainEvaluationBuilderDirector } from './domainEvaluation/index.js';
import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { EntityConstructorEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/EntityConstructorEvaluationNodeBuilder.js';
import { StandardVOEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/StandardVOEvaluationNodeBuilder.js';
import { IdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { DomainServiceEvaluationBuilderDirector } from './domainServiceEvaluationBuilderDirector.js';
import { ReadModelEvaluationBuilderDirector } from './domainEvaluation/readModelEvaluation.js';
import { DomainEventIdentifierNode } from '../../../../../src/ast/core/intermediate-ast/nodes/DomainEvent/DomainEventIdentifierNode.js';
import { DomainEventEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/DomainEventEvaluationNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PackageMethodNameBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/PackageMethodNameBuilder.js';
import { PackageEvaluationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/expressions/evaluation/PackageEvaluationNodeBuilder.js';

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

  buildReadModelEvaluation(
    readModelName: string,
    fieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const readModelEvaluationNode =
      new ReadModelEvaluationBuilderDirector().buildReadModelEvaluationWithFieldList(
        readModelName,
        fieldListNode,
      );
    const evaluationNode = new EvaluationBuilder().withEvaluation(readModelEvaluationNode).build();
    return evaluationNode;
  }

  buildIntegrationEventEvaluation(
    integrationEventName: string,
    fieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const identifier = new IntegrationEventIdentifierNodeBuilder()
      .withName(integrationEventName)
      .build();

    const props = new DomainEvaluationPropsNodeBuilder()
      .withEvaluationFieldList(fieldListNode)
      .build();
    const entityEvaluationNode = new IntegrationEventEvaluationNodeBuilder()
      .withIdentifier(identifier)
      .withPropsInput(props)
      .build();
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

  buildCommandEvaluation(
    identifierNode: IdentifierNode,
    evaluationFieldListNode?: EvaluationFieldListNode,
  ): EvaluationNode {
    const evaluationNode = new CommandEvaluationNodeBuilder().withIdentifier(identifierNode);

    if (evaluationFieldListNode) {
      evaluationNode.withEvaluationFieldList(evaluationFieldListNode);
    }

    return new EvaluationBuilder().withEvaluation(evaluationNode.build()).build();
  }

  buildQueryEvaluation(
    identifierNode: IdentifierNode,
    evaluationFieldListNode?: EvaluationFieldListNode,
  ): EvaluationNode {
    const evaluationNode = new QueryEvaluationNodeBuilder().withIdentifier(identifierNode);
    if (evaluationFieldListNode) {
      evaluationNode.withEvaluationFieldList(evaluationFieldListNode);
    }

    return new EvaluationBuilder().withEvaluation(evaluationNode.build()).build();
  }

  buildDomainEventEvaluation(
    identifierNode: DomainEventIdentifierNode,
    evaluationFieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const evaluationNode = new DomainEventEvaluationNodeBuilder()
      .withIdentifier(identifierNode)
      .withEvaluationFieldList(evaluationFieldListNode)
      .build();
    return new EvaluationBuilder().withEvaluation(evaluationNode).build();
  }

  buildStandardVOEvaluation(
    identifierNode: IdentifierNode,
    evaluationFieldListNode: EvaluationFieldListNode,
  ): EvaluationNode {
    const evaluationNode = new StandardVOEvaluationNodeBuilder()
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

  buildDomainServiceEvaluation(
    domainServiceName: string,
    argumentList: ArgumentListNode,
  ): EvaluationNode {
    const domainServiceEvaluationNode =
      new DomainServiceEvaluationBuilderDirector().buildDomainServiceEvaluationWithArgumentList(
        domainServiceName,
        argumentList,
      );
    const evaluationNode = new EvaluationBuilder()
      .withEvaluation(domainServiceEvaluationNode)
      .build();
    return evaluationNode;
  }

  buildPackageEvaluation(
    packageIdentifier: string,
    methodName: string,
    argumentList: ArgumentListNode,
  ): EvaluationNode {
    const identifier = new IdentifierNodeBuilder().withName(packageIdentifier).build();
    const methodNameNode = new PackageMethodNameBuilder(null).withName(methodName).build();
    return new EvaluationBuilder()
      .withEvaluation(
        new PackageEvaluationNodeBuilder()
          .withPackageIdentifier(identifier)
          .withMethodName(methodNameNode)
          .withArgumentsList(argumentList)
          .build(),
      )
      .build();
  }
}
