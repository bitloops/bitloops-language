import { DomainCreateNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Domain/DomainCreateBuilder.js';
import { DomainCreateNode } from '../../../../../src/ast/core/intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { ParameterBuilderDirector } from './parameterDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from './returnOkErrorTypeBuilderDirector.js';
import { StatementListBuilderDirector } from './statement/statementListDirector.js';

export class DomainCreateBuilderDirector {
  private builder: DomainCreateNodeBuilder;
  constructor() {
    this.builder = new DomainCreateNodeBuilder();
  }

  buildCreateEntityWithNoError({
    entityName,
    entityPropsName,
    entityPropsIdentifierType,
  }: {
    entityName: string;
    entityPropsName: string;
    entityPropsIdentifierType: string;
  }): DomainCreateNode {
    return this.builder
      .withStatements(
        new StatementListBuilderDirector().buildReturnOkStatementEntityEvaluation(
          entityName,
          entityPropsName,
        ),
      )
      .withReturnType(
        new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypeBitloopsIdentifier(entityName),
      )
      .withParameter(
        new ParameterBuilderDirector().buildIdentifierParameter(
          entityPropsName,
          entityPropsIdentifierType,
        ),
      )
      .build();
  }

  buildCreateWithThisAssignmentExpression(thisIdentifierName: string): DomainCreateNode {
    return this.builder
      .withStatements(
        new StatementListBuilderDirector().buildThisAssignmentExpression(thisIdentifierName),
      )
      .withReturnType(new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypePrimitiveType('void'))
      .withParameter(new ParameterBuilderDirector().buildIdentifierParameter('some', 'SomeProps'))
      .build();
  }

  buildCreateWithThisPropsAssignmentExpression(thisIdentifierName: string): DomainCreateNode {
    return this.builder
      .withStatements(
        new StatementListBuilderDirector().buildThisPropsAssignmentExpression(thisIdentifierName),
      )
      .withReturnType(new ReturnOkErrorTypeBuilderDirector().buildReturnOkTypePrimitiveType('void'))
      .withParameter(new ParameterBuilderDirector().buildIdentifierParameter('some', 'SomeProps'))
      .build();
  }
}
